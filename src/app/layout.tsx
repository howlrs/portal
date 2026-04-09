import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider, theme } from "antd";
import "./globals.css";
import HeaderNav from "@/components/header-nav";
import FooterNav from "@/components/footer-nav";
import AntdDarkProvider from "@/components/antd-dark-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-WGDZ62HC6E";

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
const siteDescription = "howlrs & rejoin LLC. — ソフトウェアエンジニア 寺島和宏が開発・運営するプロダクト紹介サイトです。";

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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: baseUrl,
    description: siteDescription,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: "howlrs & rejoin LLC.",
      url: "https://howlrs.net",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "寺島和宏",
    alternateName: "terashima kazuhiro",
    jobTitle: "ソフトウェアエンジニア",
    url: "https://howlrs.net",
    sameAs: ["https://github.com/howlrs"],
    worksFor: {
      "@type": "Organization",
      name: "howlrs & rejoin LLC.",
      url: "https://howlrs.net",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "howlrs & rejoin LLC.",
    url: "https://howlrs.net",
    founder: {
      "@type": "Person",
      name: "寺島和宏",
      alternateName: "terashima kazuhiro",
    },
    sameAs: ["https://github.com/howlrs"],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <AntdDarkProvider>
            <HeaderNav />
            <main id="main" className="main">
              {children}
            </main>

            <footer id="footer" className="footer">
              <FooterNav />
            </footer>
          </AntdDarkProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
