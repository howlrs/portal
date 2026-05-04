#!/usr/bin/env python3
"""百人一首暗記アプリのスクリーンショットを撮影"""
from playwright.sync_api import sync_playwright
from pathlib import Path

OUT_DIR = Path(__file__).parent.parent / "public" / "images" / "blog" / "hyakunin-isshu"
OUT_DIR.mkdir(parents=True, exist_ok=True)

BASE = "https://hyakunin.howlrs.net"

shots = [
    # (path, output_filename, viewport_width, viewport_height, description)
    ("/", "top.png", 1280, 800, "トップページ (Hero + 一覧)"),
    ("/poems/87-murasameno/", "poem-detail.png", 1280, 1600, "詳細ページ (情景 + 解説)"),
    ("/quiz/", "quiz.png", 1280, 900, "クイズページ"),
    ("/", "top-mobile.png", 414, 800, "モバイル トップ"),
    ("/poems/9-hananoirowa/", "poem-detail-mobile.png", 414, 1400, "モバイル 詳細"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for path, fname, w, h, desc in shots:
        ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2)
        page = ctx.new_page()
        url = BASE + path
        print(f"[shoot] {desc} {url} ({w}x{h})")
        page.goto(url, wait_until="networkidle", timeout=30000)
        # 画像読み込みのためもう少し待つ
        page.wait_for_timeout(1500)
        out_path = OUT_DIR / fname
        page.screenshot(path=str(out_path), full_page=False)
        print(f"  saved -> {out_path} ({out_path.stat().st_size // 1024}KB)")
        ctx.close()
    browser.close()

print("\nDone.")
