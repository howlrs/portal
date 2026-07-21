"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./confidence.module.css";

export default function ConfidenceUnlock() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");
    if (!queryToken) return;

    // Remove the token from the visible URL and browser history immediately.
    window.history.replaceState({}, "", window.location.pathname);
    setPending(true);
    void fetch("/api/confidence/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: queryToken }),
    }).then((response) => {
      if (response.ok) {
        router.refresh();
      } else {
        setError("招待URLのトークンが正しくありません。");
        setPending(false);
      }
    }).catch(() => {
      setError("認証に失敗しました。もう一度お試しください。");
      setPending(false);
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/confidence/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (response.ok) {
      router.refresh();
    } else {
      setError("トークンが正しくありません。");
      setPending(false);
    }
  }

  return (
    <form className={styles.unlock} onSubmit={handleSubmit}>
      <label htmlFor="confidence-token">営業用トークン</label>
      <div className={styles.unlockRow}>
        <input id="confidence-token" type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" required />
        <button type="submit" disabled={pending}>{pending ? "確認中…" : "実績を見る"}</button>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  );
}
