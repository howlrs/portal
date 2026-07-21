export type ConfidenceMedia = {
  type: "image" | "video";
  path: string;
  alt: string;
  caption: string;
};

export type ConfidenceCase = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  challenge: string[];
  contributions: string[];
  technologies: string[];
  media: ConfidenceMedia[];
};

const image = (path: string, alt: string, caption: string): ConfidenceMedia => ({
  type: "image",
  path,
  alt,
  caption,
});

export const confidenceCases: ConfidenceCase[] = [
  {
    slug: "jra",
    client: "JRA",
    title: "イベント運用を支えるアプリ・管理画面・API",
    summary: "利用者向けアプリと運用者向け管理画面を横断し、イベント運営の業務フローをシステム化した事例です。",
    challenge: ["スマートフォンアプリと管理画面の業務を一つの運用フローでつなぐ", "イベント、抽選、クーポン、告知などの状態を安全に扱う"],
    contributions: ["Flutterアプリの画面・導線設計", "イベント管理画面の検索・作成・公開フロー", "API・認証・エラー状態を含む運用設計", "AWS・テスト・リリースを含む継続改善"],
    technologies: ["Flutter", "Laravel", "Next.js", "AWS", "ECS / Fargate", "E2Eテスト"],
    media: [
      image("jra/manage-event-landing.png", "JRAイベント管理画面のトップ", "運用者向け管理画面の全体構成"),
      image("jra/manage-event-form.png", "JRAイベント作成画面", "イベント作成・公開フロー"),
      image("jra/manage-event-list.png", "JRAイベント一覧画面", "検索・状態管理を行うイベント一覧"),
      image("jra/app-home.png", "JRAイベントアプリのホーム画面", "利用者向けアプリのホーム"),
      image("jra/app-ticket.png", "JRAイベントアプリのチケット画面", "チケット・参加導線"),
      image("jra/app-lottery.png", "JRAイベントアプリの抽選確認画面", "抽選フローの確認画面"),
    ],
  },
  {
    slug: "milize-ai-video",
    client: "MILIZE AI Video",
    title: "生成AI動画を企業案件で扱う制作・レビュー工程",
    summary: "完パケ動画だけでなく、カット・テイク・プロンプト・レビューを分解して管理した生成AI動画制作の事例です。",
    challenge: ["生成AIの偶然性を企業向けの品質管理に組み込む", "差し替え可能な素材単位で制作・レビューを進める"],
    contributions: ["カット単位の動画生成と選定", "プロンプト・生成条件・採用テイクの管理", "Tipsスライドによる企画・表現の整理", "レビュー観点とQCチェックの設計"],
    technologies: ["生成AI動画", "Veo", "プロンプト設計", "動画編集", "QC / レビュー設計"],
    media: [
      { type: "video", path: "milize/milize-final-package.mp4", alt: "MILIZE AI Video 完パケ動画", caption: "完パケ動画（利用可能なローカル版）" },
      ...["01.png", "01_01.png", "01_02.png", "02.png", "02_01.png", "02_02.png", "02_03.png", "03.png", "03_01.png", "03_02.png", "03_03.png", "03_04.png", "04.png", "04_01.png", "04_02.png", "04_03.png", "04_04.png"].map((file, index) => image(`milize/tips/${file}`, `MILIZE AI Video Tips ${index + 1}`, `Tipsスライド ${index + 1}`)),
    ],
  },
  {
    slug: "taisei-weather",
    client: "大成建設関連",
    title: "建設・インフラ現場向け気象観測ダッシュボード",
    summary: "現在値、履歴、グラフ、帳票、IoT連携、Alertまでを一つのWEBアプリとして整理した事例です。",
    challenge: ["現場で必要な気象データを現在値・履歴・帳票へつなぐ", "将来のIoT/API連携を見据えて画面とデータ取得を分離する"],
    contributions: ["モニタ・日報・月報・グラフ画面", "CSV・PDF・印刷を含む帳票導線", "IoT収集・保存・API連携の設計", "Alert条件・通知・運用要件の整理"],
    technologies: ["Next.js", "TypeScript", "Docker", "WebSocket", "IoT連携", "Web Push"],
    media: [image("taisei/weather-wireframe-overview.png", "気象データWEBの15画面概要", "モニタ・履歴・グラフ・設定・通知の全体像")],
  },
];
