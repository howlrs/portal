import type { Metadata } from "next";
import { ProductsList } from "@/components/products";
import { productItems } from "../../../common/product-items";
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
    title: "プロダクト一覧",
    description: "howlrs.netが開発・提供するWebアプリ、デスクトップアプリ、APIサービスの一覧です。",
    alternates: { canonical: "/products" },
};

export default function Page() {
    const softwareJsonLd = productItems.map((item) => ({
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
        author: {
            "@type": "Organization",
            name: "howlrs.net",
            url: "https://howlrs.net",
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