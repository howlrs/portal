import type { Metadata } from "next";
import { ProductsList } from "../components/products";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    absolute:
      "HOWLRS｜ソフトウェアエンジニア 寺島和宏のプロダクトポートフォリオ",
  },
  description:
    "ソフトウェアエンジニア 寺島和宏 (howlrs) が開発するプロダクト一覧。Webアプリ、デスクトップアプリ、APIなど多様なツールを紹介しています。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[]} />
      <ProductsList />
    </>
  );
}
