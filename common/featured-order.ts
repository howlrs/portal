/**
 * HOME / products / articles の 3 箇所で「上部に積極露出する」プロダクトの順序定義。
 *
 * 回遊率向上のため、ユーザーに積極的に触れさせたい 6 件を以下の順で固定。
 * 残りのプロダクトは元の配列順を維持する。
 *
 * - HOME: HomeFeatured で 6 件をカード表示 (FEATURED_PRODUCTS in home-featured.tsx)
 * - products: ProductsList で 6 件を先頭、その他を元順で続ける (sortByFeatured を使用)
 * - articles: 6 件の関連記事を Featured セクションで先頭、その下に通常一覧 (重複は articles 一覧で除外)
 *
 * 名前は productItems.name の前方一致で判定する (name フォーマット変更時はここを更新)。
 */
export const FEATURED_SLUGS_ORDERED = [
    'synapsegit',       // SynapseGit
    'pixels',           // ピクセルズ
    'hyakunin-isshu',   // 百人一首暗記
    'orbit-bola',       // Orbit Bola!!
    'antoki',           // ANTOKI
    'generic-camera',   // Generic Camera
] as const;

export type FeaturedSlug = typeof FEATURED_SLUGS_ORDERED[number];

/**
 * productItems の name を slug 相当へ正規化する補助。
 * (商品名は表示名で、slug は articleSlug と同じものを共有している前提)
 *
 * 6 件以外はそのまま元順で返すので、未マッチ時は -1 を返して末尾保持される。
 */
export function getFeaturedRank(name: string): number {
    if (name.startsWith('SynapseGit')) return FEATURED_SLUGS_ORDERED.indexOf('synapsegit');
    if (name.startsWith('ピクセルズ')) return FEATURED_SLUGS_ORDERED.indexOf('pixels');
    if (name.startsWith('百人一首暗記')) return FEATURED_SLUGS_ORDERED.indexOf('hyakunin-isshu');
    if (name.startsWith('Orbit Bola')) return FEATURED_SLUGS_ORDERED.indexOf('orbit-bola');
    if (name.startsWith('ANTOKI')) return FEATURED_SLUGS_ORDERED.indexOf('antoki');
    if (name.startsWith('Generic Camera')) return FEATURED_SLUGS_ORDERED.indexOf('generic-camera');
    return -1;
}

/**
 * 配列を「Featured 6 件 (固定順) → その他 (元順)」に並び替える。
 * 元配列は変更しない (immutable)。
 */
export function sortByFeatured<T extends { name: string }>(items: readonly T[]): T[] {
    const featured: T[] = new Array(FEATURED_SLUGS_ORDERED.length);
    const rest: T[] = [];
    for (const item of items) {
        const rank = getFeaturedRank(item.name);
        if (rank >= 0) {
            featured[rank] = item;
        } else {
            rest.push(item);
        }
    }
    // featured 配列に欠損があれば飛ばす (名前変更などで未マッチになった場合の保険)
    return [...featured.filter((x): x is T => Boolean(x)), ...rest];
}
