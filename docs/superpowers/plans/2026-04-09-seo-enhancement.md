# SEO Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize the my-portal site for branded search queries (寺島和宏, howlrs, howlrs & rejoin LLC., product names) with structured data, improved metadata, OG images, semantic HTML, and infrastructure tweaks.

**Architecture:** All changes are static-first. JSON-LD and metadata are output from Server Components at build time. Dynamic parts (`use client`) are limited to existing interactive components (header-nav, footer-nav, contact form, dark mode). OG images use `opengraph-image.tsx` (ImageResponse) for build-time generation.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Ant Design 6, schema.org JSON-LD

**Issue:** #19

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `src/app/layout.tsx` | Add Person + Organization JSON-LD, preconnect hints, update metadata |
| Modify | `src/app/page.tsx` | Update metadata with target keywords |
| Modify | `src/app/products/page.tsx` | Update metadata with target keywords |
| Modify | `src/app/articles/page.tsx` | Update metadata with target keywords |
| Modify | `src/app/articles/[slug]/page.tsx` | Semantic HTML (`<article>`, `<time>`), improve description |
| Modify | `src/app/contact/page.tsx` | Update metadata |
| Modify | `src/app/policy/page.tsx` | Update metadata |
| Modify | `src/app/sitemap.tsx` | Use actual file mtime for lastModified |
| Modify | `next.config.ts` | Add `poweredByHeader: false` |
| Modify | `common/product-items.ts` | Add `featureList` field per product |
| Create | `src/app/products/opengraph-image.tsx` | OG image for /products |
| Create | `src/app/articles/opengraph-image.tsx` | OG image for /articles |
| Create | `src/app/contact/opengraph-image.tsx` | OG image for /contact |
| Create | `src/app/policy/opengraph-image.tsx` | OG image for /policy |

---

### Task 1: Person + Organization Structured Data

**Files:**
- Modify: `src/app/layout.tsx:52-64`

- [ ] **Step 1: Update JSON-LD in layout.tsx**

Replace the existing `jsonLd` object (lines 52-64) with a combined schema including WebSite, Person, and Organization:

```typescript
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
    sameAs: [
      "https://github.com/howlrs",
    ],
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
    sameAs: [
      "https://github.com/howlrs",
    ],
  },
];
```

Also update the `dangerouslySetInnerHTML` to handle the array:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

This already works since `JSON.stringify` handles arrays.

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add Person + Organization structured data for branded search"
```

---

### Task 2: Update Metadata With Target Keywords

**Files:**
- Modify: `src/app/layout.tsx:23-49`
- Modify: `src/app/page.tsx:5-9`
- Modify: `src/app/products/page.tsx:6-9`
- Modify: `src/app/articles/page.tsx:10-13`
- Modify: `src/app/articles/[slug]/page.tsx:42-51`
- Modify: `src/app/contact/page.tsx:6-9`
- Modify: `src/app/policy/page.tsx:9-13`

- [ ] **Step 1: Update root layout metadata**

In `src/app/layout.tsx`, update `siteDescription` (line 25):

```typescript
const siteDescription = "howlrs & rejoin LLC. — ソフトウェアエンジニア 寺島和宏が開発・運営するプロダクト紹介サイトです。";
```

- [ ] **Step 2: Update home page metadata**

In `src/app/page.tsx`, update metadata (lines 5-9):

```typescript
export const metadata: Metadata = {
  title: "ホーム",
  description:
    "ソフトウェアエンジニア 寺島和宏 (howlrs) が開発するプロダクト一覧。Webアプリ、デスクトップアプリ、APIなど多様なツールを紹介しています。",
  alternates: { canonical: "/" },
};
```

- [ ] **Step 3: Update products page metadata**

In `src/app/products/page.tsx`, update metadata (lines 6-9):

```typescript
export const metadata: Metadata = {
  title: "プロダクト一覧",
  description:
    "howlrs & rejoin LLC. が開発・提供するWebアプリ、デスクトップアプリ、APIサービスの一覧です。Orbit Bola、ANTOKI、QRで管理、JLPT学習アプリなど。",
  alternates: { canonical: "/products" },
};
```

- [ ] **Step 4: Update articles page metadata**

In `src/app/articles/page.tsx`, update metadata (lines 10-13):

```typescript
export const metadata: Metadata = {
  title: "ブログ記事一覧",
  description:
    "ソフトウェアエンジニア 寺島和宏 (howlrs) の開発ブログ。プロダクト紹介や技術情報を掲載しています。",
  alternates: { canonical: "/articles" },
};
```

- [ ] **Step 5: Update article slug description generation**

In `src/app/articles/[slug]/page.tsx`, update `generateMetadata` return (around line 48):

```typescript
return {
  title: postMeta.title,
  description: `${postMeta.title} — howlrs.net 開発ブログ`,
  alternates: { canonical: `/articles/${slug}` },
};
```

- [ ] **Step 6: Update contact page metadata**

In `src/app/contact/page.tsx`, update metadata:

```typescript
export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "howlrs & rejoin LLC. / ソフトウェアエンジニア 寺島和宏へのお問い合わせはこちらからどうぞ。",
  alternates: { canonical: "/contact" },
};
```

- [ ] **Step 7: Update policy page metadata**

In `src/app/policy/page.tsx`, update metadata:

```typescript
export const metadata: Metadata = {
  title: "特定商取引法に基づく表記・利用規約",
  description:
    "howlrs & rejoin LLC. の特定商取引法に基づく表記および利用規約・プライバシーポリシーを掲載しています。",
  alternates: { canonical: "/policy" },
};
```

- [ ] **Step 8: Run build to verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 9: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/products/page.tsx src/app/articles/page.tsx src/app/articles/\\[slug\\]/page.tsx src/app/contact/page.tsx src/app/policy/page.tsx
git commit -m "feat(seo): embed target keywords in metadata across all pages"
```

---

### Task 3: OG Images for Sub-pages

**Files:**
- Create: `src/app/products/opengraph-image.tsx`
- Create: `src/app/articles/opengraph-image.tsx`
- Create: `src/app/contact/opengraph-image.tsx`
- Create: `src/app/policy/opengraph-image.tsx`

All OG images share the same design pattern as the existing root `opengraph-image.tsx` — gradient background with page title and howlrs.net branding.

- [ ] **Step 1: Create products OG image**

Create `src/app/products/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "howlrs.net プロダクト一覧";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: 28, color: "#8080a0", letterSpacing: "4px" }}>
            PRODUCTS
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #6366f1, transparent)",
            }}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            プロダクト一覧
          </div>
          <div style={{ fontSize: 24, color: "#a0a0c0", marginTop: 8 }}>
            howlrs & rejoin LLC.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Create articles OG image**

Create `src/app/articles/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "howlrs.net ブログ記事一覧";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: 28, color: "#8080a0", letterSpacing: "4px" }}>
            ARTICLES
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #6366f1, transparent)",
            }}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            ブログ記事一覧
          </div>
          <div style={{ fontSize: 24, color: "#a0a0c0", marginTop: 8 }}>
            howlrs.net
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Create contact OG image**

Create `src/app/contact/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "howlrs.net お問い合わせ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: 28, color: "#8080a0", letterSpacing: "4px" }}>
            CONTACT
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #6366f1, transparent)",
            }}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            お問い合わせ
          </div>
          <div style={{ fontSize: 24, color: "#a0a0c0", marginTop: 8 }}>
            howlrs & rejoin LLC.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 4: Create policy OG image**

Create `src/app/policy/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "howlrs.net 特定商取引法に基づく表記・利用規約";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: 28, color: "#8080a0", letterSpacing: "4px" }}>
            POLICY
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #6366f1, transparent)",
            }}
          />
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            特定商取引法に基づく表記
          </div>
          <div style={{ fontSize: 24, color: "#a0a0c0", marginTop: 8 }}>
            howlrs & rejoin LLC.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 5: Run build to verify OG images generate**

Run: `npm run build`
Expected: Build succeeds, OG image routes appear in build output.

- [ ] **Step 6: Commit**

```bash
git add src/app/products/opengraph-image.tsx src/app/articles/opengraph-image.tsx src/app/contact/opengraph-image.tsx src/app/policy/opengraph-image.tsx
git commit -m "feat(seo): add OG images for products, articles, contact, policy pages"
```

---

### Task 4: Semantic HTML Improvements

**Files:**
- Modify: `src/app/articles/[slug]/page.tsx:97-114`

- [ ] **Step 1: Wrap blog post in `<article>` and use `<time>`**

In `src/app/articles/[slug]/page.tsx`, replace the return JSX (lines 97-114):

From:
```tsx
<h1>{postMeta.title}</h1>
<small>公開日: {postMeta.date}</small>
<Typography style={{ padding: '2rem 0' }}>
    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
</Typography>
```

To:
```tsx
<article>
    <h1>{postMeta.title}</h1>
    <time dateTime={postMeta.date}>公開日: {postMeta.date}</time>
    <Typography style={{ padding: '2rem 0' }}>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Typography>
</article>
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/articles/\\[slug\\]/page.tsx
git commit -m "feat(seo): add semantic HTML (article, time) to blog posts"
```

---

### Task 5: Sitemap lastModified Improvement

**Files:**
- Modify: `src/app/sitemap.tsx`

- [ ] **Step 1: Use actual file mtime for articles**

Replace the entire `src/app/sitemap.tsx` content:

```typescript
import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const blogDirectory = path.join(process.cwd(), "articles");

async function getBlogPostsUrls() {
  const fileNames = fs.readdirSync(blogDirectory);
  const urls: MetadataRoute.Sitemap = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(blogDirectory, fileName);
    const stat = fs.statSync(filePath);
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`,
      lastModified: stat.mtime.toISOString(),
      priority: 0.6,
      changeFrequency: "monthly",
    };
  });
  return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostsUrls = await getBlogPostsUrls();

  const sitemapItems: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL as string,
      changeFrequency: "monthly",
      priority: 1.0,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/policy`,
      changeFrequency: "monthly",
      priority: 0.2,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.2,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date().toISOString(),
    },
    ...blogPostsUrls,
  ];

  return sitemapItems;
}
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.tsx
git commit -m "feat(seo): use actual file mtime for article sitemap entries"
```

---

### Task 6: Infrastructure Tweaks (poweredByHeader + preconnect)

**Files:**
- Modify: `next.config.ts:3`
- Modify: `src/app/layout.tsx:73`

- [ ] **Step 1: Add poweredByHeader: false to next.config.ts**

After line 3 (`reactStrictMode: true,`), add:

```typescript
  poweredByHeader: false,
```

- [ ] **Step 2: Add preconnect hints in layout.tsx**

In `src/app/layout.tsx`, inside `<head>` before the GA Script tags (line 73), add:

```tsx
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts src/app/layout.tsx
git commit -m "feat(seo): add poweredByHeader:false and preconnect hints"
```

---

### Task 7: SoftwareApplication Schema Enhancement

**Files:**
- Modify: `common/product-items.ts`
- Modify: `src/app/products/page.tsx:13-31`

- [ ] **Step 1: Add featureList to product-items.ts**

In `common/product-items.ts`, update the Item type import and add `featureList` to each product. First, update the import (line 1):

This requires updating the `Item` interface in `common/products.tsx` to include an optional `featureList`. However, since `product-items.ts` uses `Omit<Item, 'image'>`, we add `featureList` directly to each item.

Add `featureList` to the `Omit<Item, 'image'>` type by changing line 1 of `product-items.ts`:

```typescript
import { Item } from './products';
```

And in `common/products.tsx`, add `featureList` to the `Item` interface:

```typescript
export interface Item {
    name: string;
    url: string;
    image: StaticImageData;
    icon_url: string;
    description: string;
    featureList?: string[];
};
```

Then add `featureList` to each product in `product-items.ts`. Example for the first 4:

```typescript
{
    name: 'Orbit Bola!! | 宇宙状況認識API',
    url: 'https://orbit-bola.com/',
    icon_url: '/icons/orbit-bola.ico',
    description: '...',
    featureList: ['TLE/OMM軌道データ正規化', 'AI衝突警告トリアージ', '宇宙保険リスク評価', 'REST API'],
},
{
    name: 'ANTOKI | MBTI地域マッチング掲示板',
    url: 'https://mbti.antoki.net/',
    icon_url: '/icons/antoki.ico',
    description: '...',
    featureList: ['MBTI性格診断', '地域マッチング', '匿名掲示板', '相性分析'],
},
{
    name: 'QRで管理 | 店舗管理QRソリューション',
    url: 'https://stores-qr.howlrs.net/',
    icon_url: '/icons/stores-qr.ico',
    description: '...',
    featureList: ['QRコード商品管理', '在庫管理', '注文管理', 'モバイル閲覧'],
},
{
    name: 'Lottery | 抽選ルーレットシステム',
    url: 'https://lottery.howlrs.net/',
    icon_url: '/icons/lottery.svg',
    description: '...',
    featureList: ['ルーレットアニメーション', 'イベント作成', '景品管理', '抽選実行'],
},
```

(Continue for all 16 products with relevant features)

- [ ] **Step 2: Update JSON-LD in products/page.tsx**

In `src/app/products/page.tsx`, update the `softwareJsonLd` map (lines 13-31) to include `featureList`:

```typescript
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
    ...(item.featureList && { featureList: item.featureList.join(", ") }),
    author: {
        "@type": "Person",
        name: "寺島和宏",
        alternateName: "terashima kazuhiro",
        url: "https://howlrs.net",
    },
}));
```

Note: `author` changed from Organization to Person for better personal branding.

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add common/products.tsx common/product-items.ts src/app/products/page.tsx
git commit -m "feat(seo): enhance SoftwareApplication schema with featureList and author"
```

---

### Task 8: Final Verification and Deploy

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds with all pages statically generated.

- [ ] **Step 3: Verify locally**

Run: `npm run start`
Then verify:
- View source of `/` — check for Person, Organization, WebSite JSON-LD
- View source of `/products` — check SoftwareApplication with featureList
- Check `/articles/<slug>` — verify `<article>` and `<time>` tags
- Check response headers — no `X-Powered-By`

- [ ] **Step 4: Deploy to Vercel**

Run: `git push origin master`
Vercel auto-deploys from master.

- [ ] **Step 5: Post-deploy verification**

After deploy completes:
- Check https://product.howlrs.net with Google Rich Results Test
- Verify OG images with https://opengraph.xyz or similar
- Check response headers for no X-Powered-By

- [ ] **Step 6: Close issue**

```bash
gh issue close 19 --comment "SEO強化完了: Person/Org構造化データ, メタデータ最適化, OG Image全ページ, セマンティックHTML, sitemap改善, preconnect追加"
```
