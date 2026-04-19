import type { Metadata } from "next";
import HomeHero from "@/components/home-hero";
import HomeFeatured from "@/components/home-featured";
import HomeRecentArticles from "@/components/home-recent-articles";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    absolute:
      "HOWLRS｜ソフトウェアエンジニア 寺島和宏のプロダクトポートフォリオ",
  },
  description:
    "寺島和宏 (howlrs) が開発・運営する Web アプリ、デスクトップアプリ、API、AI ツールのポートフォリオ。ANTOKI (MBTI 地域マッチング)、Orbit Bola!! (宇宙状況認識 API)、QRで管理 (店舗管理) など 16 プロダクトを紹介。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[]} />
      <HomeHero />
      <HomeFeatured />
      <HomeRecentArticles />
    </>
  );
}
