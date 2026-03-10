import type { Metadata } from "next";
import { ProductsList } from "@/components/products";

export const metadata: Metadata = {
    title: "プロダクト一覧",
    description: "howlrs.netが開発・提供するWebアプリ、デスクトップアプリ、APIサービスの一覧です。",
    alternates: { canonical: "/products" },
};

export default function Page() {
    return (
        <ProductsList />
    );
};