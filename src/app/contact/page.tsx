import type { Metadata } from "next";
import { Contact } from '../../components/contact';

export const metadata: Metadata = {
    title: "お問い合わせ",
    description: "howlrs.netへのお問い合わせはこちらからどうぞ。",
    alternates: { canonical: "/contact" },
};

export default async function Page() {
    return (
        <div>
            <Contact />
        </div>
    );
};
