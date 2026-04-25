import type { Metadata } from "next";
import { ProductsList } from "@/components/products";
import { productItems } from "../../../common/product-items";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://product.howlrs.net";

export const metadata: Metadata = {
    title: "プロダクト一覧",
    description:
        "寺島和宏 (howlrs) が開発・提供するWebアプリ、デスクトップアプリ、APIサービスの一覧です。Orbit Bola、ANTOKI、QRで管理、JLPT学習アプリなど。",
    alternates: { canonical: "/products" },
};

export default function Page() {
    const softwareJsonLd = productItems
        .filter((item) => !item.archived)
        .map((item) => ({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: item.name,
            url: item.url,
            description: item.description,
            applicationCategory: "WebApplication",
            operatingSystem: "All",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
            },
            ...(item.featureList && { featureList: item.featureList.join(", ") }),
            author: {
                "@type": "Person",
                name: "寺島和宏",
                alternateName: ["terashima kazuhiro", "howlrs"],
                url: BASE_URL,
            },
        }));

    return (
        <>
            <BreadcrumbJsonLd
                items={[{ name: "プロダクト一覧", href: "/products" }]}
            />
            <JsonLd data={softwareJsonLd} />
            <ProductsList />
        </>
    );
};