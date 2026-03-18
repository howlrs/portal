import type { Metadata } from "next";
import { ProductsList } from "../components/products";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "ホーム",
  description: "howlrs.netが提供するプロダクト一覧です。Webアプリ、デスクトップアプリ、APIなど多様なツールを紹介しています。",
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
