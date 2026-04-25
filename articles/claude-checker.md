---
title: 'Claude Checker — Claude Code セッションをかんばんで監視するローカルダッシュボード'
date: '2026-04-26'
description: 'WSL/Linux で動く Claude Code を 1 画面で見渡せる Rust 製シングルバイナリ。inotify と SSE で並列セッションの状態を即時可視化し、応答が必要なときだけブラウザのタブで気付かせます。'
---

## Claude Checker とは

複数の Claude Code セッションを並行して走らせていると、「どのセッションが応答待ちで止まっているのか」「どれが裏で動き続けているのか」が分からなくなります。 **[Claude Checker](https://github.com/howlrs/claude-checker)** は、その課題に対して **ブラウザのローカルかんばん** という形で答えを出すツールです。

`~/.claude/` を `inotify` で監視し、SSE で接続したブラウザに状態を流し込みます。ポーリングもログインも要りません。`./start.sh` を叩けば `http://localhost:8081` が立ち上がり、その瞬間からすべてのセッションが見えます。

ソフトウェアエンジニアの寺島和宏 (howlrs) が、自分自身の作業を救済するために作ったツールです。

![Claude Checker のメイン画面。左ペインに応答待ち件数のバナーと並列セッション一覧、右ペインに選択中セッションの TODO/DOING/DONE かんばん。](/images/blog/claude-checker/overview.png)

## 解決したかった問題

Claude Code は CLI なので、複数セッションを起動するとそれぞれが独立したターミナルタブに散らばります。並列で 5 本、10 本と増えてくると次のような状況がすぐに発生します。

- どのセッションが「ユーザーの返答待ち」で止まっているか分からない
- どれが裏で長時間ツールを実行していて、まだ終わっていないのか分からない
- ターミナルタブを 1 本ずつ覗かないと状況が掴めない

集中して作業しているときに、応答待ちのセッションを見逃して 30 分放置してしまう。これが Claude Checker が生まれたきっかけでした。

## 4 つのステータスで状態を整理する

Claude Checker はすべてのセッションを次の 4 つのステータスに分類します。

| ステータス | 何を意味するか |
|-----------|---------------|
| `needs_permission` | 権限承認待ち、または `tool_use` が 60 秒以上止まっている |
| `running` | ツール実行中、TodoWrite 進行中、または直近 5 秒以内に動きがあった |
| `waiting_for_user` | アシスタントが応答を返し終えてユーザー入力を待っている |
| `idle` | 上記いずれにも該当しない (6 時間以上動きがないセッションを含む) |

優先順位は **`needs_permission` > `running` > `waiting_for_user` > `idle`**。応答待ちが先頭に並ぶので、画面を一瞥するだけで「次に手を打つべきセッション」が分かります。

![左ペインのセッションリスト。応答待ちセッションが赤いバナーとともに最上段に並び、その下に実行中、idle と続く。](/images/blog/claude-checker/status-list.png)

左ペイン上部の赤いバナーは「人間待ち 4 件」のようなカウンタになっており、別ウィンドウで作業中でも気付けるよう設計されています。タブのタイトルにも `(4) Claude Checker` のように件数が表示され、favicon にも赤いドットが点きます。離席中のブラウザタブからでも状況が分かる仕掛けです。

## 進捗は TODO/DOING/DONE のかんばんで

セッションを選択すると、右ペインに **TodoWrite の中身** がかんばん形式で表示されます。Claude Code の TodoWrite ツールが書き込む `~/.claude/todos/<session>.json` を読み取り、`pending`/`in_progress`/`completed` をそれぞれの列にマッピングします。

![選択中セッションのかんばんビュー。TODO・DOING 列は空、DONE 列に取り消し線つきの完了タスクが 10 件並ぶ。](/images/blog/claude-checker/kanban.png)

TodoWrite を呼んでいないセッションでも、JSONL の最新 `tool_use` をフォールバックとして拾い、それも無ければアシスタントメッセージ内の `✅ / 🔄 / [x] / [ ]` といった進捗マークをスクレイプして表示します。3 段階のフォールバックがあるので「何もせずとも進捗が見える」ことを優先しています。

## 設計上のこだわり

### シングルバイナリで完結する

Rust + axum で書かれており、静的アセットは `include_dir` でバイナリに埋め込まれています。`cargo build --release` で吐き出される実行ファイル 1 つで動き、ランタイム依存は `~/.claude/` だけ。docker も Node.js も Python ランタイムも要りません。

### 127.0.0.1 にしか bind しない

ローカル監視ツールはセキュリティ事故と紙一重なので、Claude Checker は **0.0.0.0 への bind を起動時点で拒否**します。さらに `Host` ヘッダの allowlist を `localhost` / `127.0.0.1` のみに制限し、DNS リバインディング攻撃に耐えるようにしてあります。CSP は `default-src 'self'` で固め、DOM 挿入はすべて `textContent`。Claude Code の生ログを扱うので、ここは妥協していません。

### ポーリングしない

ファイル監視には `notify` クレート (内部的に inotify) を使い、変化があったときだけ更新が走ります。クライアント側も SSE 接続でサーバープッシュを受け取るだけ。CPU は基本ゼロ、メモリも 280 セッションを抱えて 76MB 程度に収まります。

### A11y と運用配慮

色だけでなくアイコンとテキストの三重符号化でステータスを表現しているので、色覚特性に依存しません。`j/k/Enter` のキーボード操作にも対応。設計判断はすべて [`docs/design.md`](https://github.com/howlrs/claude-checker/blob/main/docs/design.md) に残してあります。

## 動作環境

`dirs::home_dir()` でパスを解決しているので、Linux / WSL2 / macOS / Windows のいずれでも同じバイナリが動きます。WSL2 で Claude Code を使っている場合は WSL 内側で起動するのが正解です (Windows 側で起動した Claude Code セッションは `C:\Users\<user>\.claude\` に書かれるため)。

## 使ってみる

```bash
git clone https://github.com/howlrs/claude-checker.git
cd claude-checker
./start.sh
# → http://localhost:8081
```

`start.sh` はソースが新しくなっていればリビルドし、それから `exec` でバイナリを起動します。

`cargo run --release -- --port 8081` でも構いません。環境変数 `CC_PORT` / `CC_HOST` / `CC_LOG_LEVEL` で挙動を変えられます。

## まとめ

Claude Code を複数並列で動かすようになって、「どこで何が止まっているか」が常にうっすら不安だった方は、この 1 画面でかなり救われるはずです。MIT ライセンスで GitHub に公開しています。

- リポジトリ: [github.com/howlrs/claude-checker](https://github.com/howlrs/claude-checker)
- ライセンス: MIT
- 作者: 寺島和宏 (howlrs)
