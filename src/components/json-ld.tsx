import React from "react";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Renders a JSON-LD structured data script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://product.howlrs.net";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

/**
 * Generates BreadcrumbList JSON-LD schema.
 * Always includes "ホーム" as the first item.
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [
    { name: "ホーム", href: "/" },
    ...items,
  ];

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}
