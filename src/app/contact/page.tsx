import type { Metadata } from "next";
import { Contact } from '../../components/contact';
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
    title: "お問い合わせ",
    description: "howlrs.netへのお問い合わせはこちらからどうぞ。",
    alternates: { canonical: "/contact" },
};

export default async function Page() {
    return (
        <div>
            <BreadcrumbJsonLd items={[{ name: "お問い合わせ", href: "/contact" }]} />
            <Contact />
        </div>
    );
};
