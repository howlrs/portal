import type { Metadata } from "next";
import ConfidenceUnlock from "@/components/confidence-unlock";
import styles from "@/components/confidence.module.css";
import { confidenceCases } from "@/data/confidence";
import { isConfidenceUnlocked } from "@/lib/confidence-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Confidence実績", robots: { index: false, follow: false } };

export default async function ConfidencePage() {
  const unlocked = await isConfidenceUnlocked();
  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Confidence — Private Case Studies</p>
        <h1 className={styles.title}>実案件で、課題を解決する。</h1>
        <p className={styles.lead}>営業・打ち合わせ向けに、プロダクト開発だけでは伝わりにくい実案件での設計力、実装力、運用改善力をまとめています。</p>
      </div>
      {!unlocked ? <><ConfidenceUnlock /><p className={styles.lockedNote}>この領域は公開ポートフォリオとは分離された営業用資料です。共有されたトークンで閲覧できます。</p></> : (
        <div className={styles.cases}>
          {confidenceCases.map((item) => <article className={styles.case} key={item.slug}>
            <header className={styles.caseHeader}><p className={styles.client}>{item.client}</p><h2 className={styles.caseTitle}>{item.title}</h2><p className={styles.summary}>{item.summary}</p></header>
            <div className={styles.body}>
              <div className={styles.details}>
                <div><h3>課題</h3><ul>{item.challenge.map((text) => <li key={text}>{text}</li>)}</ul></div>
                <div><h3>担当・対応</h3><ul>{item.contributions.map((text) => <li key={text}>{text}</li>)}</ul></div>
                <div><h3>技術・領域</h3><div className={styles.tags}>{item.technologies.map((text) => <span className={styles.tag} key={text}>{text}</span>)}</div></div>
              </div>
              <div className={styles.mediaGrid}>{item.media.map((media) => <figure className={styles.media} key={media.path}>{media.type === "video" ? <video controls preload="metadata" src={`/api/confidence/media/${media.path}`} /> : <img src={`/api/confidence/media/${media.path}`} alt={media.alt} loading="lazy" />}<figcaption>{media.caption}</figcaption></figure>)}</div>
            </div>
          </article>)}
        </div>
      )}
    </section>
  );
}
