import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider, theme } from "antd";
import "./globals.css";
import HeaderNav from "@/components/header-nav";
import FooterNav from "@/components/footer-nav";
import AntdDarkProvider from "@/components/antd-dark-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://product.howlrs.net";
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "howlrs.net Products";
const siteDescription = `${siteTitle} - howlrs.netで公開されているプロダクトを紹介しています。`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: baseUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteTitle,
  url: baseUrl,
  description: siteDescription,
  inLanguage: "ja",
  publisher: {
    "@type": "Organization",
    name: "howlrs.net",
    url: "https://howlrs.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdDarkProvider>
          <HeaderNav />
          <main id="main" className="main">
            {children}
          </main>

          <footer id="footer" className="footer">
            <FooterNav />
          </footer>
        </AntdDarkProvider>
      </body>
    </html>
  );
}
