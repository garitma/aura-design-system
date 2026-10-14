export const COMPONENT_CATALOG_URL = "/docs/components";

export interface StructuredHeading {
  id: string;
  content: string;
}

export interface StructuredContent {
  heading: string | undefined;
  content: string;
}

export interface StructuredSearchData {
  headings: StructuredHeading[];
  contents: StructuredContent[];
}

export interface ComponentMirrorKeys {
  titles: ReadonlySet<string>;
  descriptions: ReadonlySet<string>;
}

export interface CatalogSearchHit {
  url: string;
  type: string;
  content: string;
}

export function normalizeSearchText(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function stripSearchMarks(content: string) {
  return content.replace(/<\/?mark>/gi, "");
}

export interface SearchTextPart {
  content: string;
  highlight: boolean;
}

export function splitSearchMarks(content: string): SearchTextPart[] {
  if (!content.includes("<mark>")) {
    return [{ content, highlight: false }];
  }

  const parts: SearchTextPart[] = [];
  const pattern = /<mark>([\s\S]*?)<\/mark>/g;
  let last = 0;

  for (const match of content.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) {
      parts.push({ content: content.slice(last, index), highlight: false });
    }
    const highlighted = match[1] ?? "";
    if (highlighted.length > 0) {
      parts.push({ content: highlighted, highlight: true });
    }
    last = index + match[0].length;
  }

  if (last < content.length) {
    parts.push({ content: content.slice(last), highlight: false });
  }

  return parts.length > 0 ? parts : [{ content, highlight: false }];
}

export function componentMirrorKeys(
  pages: Array<{ url: string; title?: string; description?: string }>,
): ComponentMirrorKeys {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const prefix = `${COMPONENT_CATALOG_URL}/`;

  for (const page of pages) {
    if (!page.url.startsWith(prefix)) continue;
    if (page.title) titles.add(normalizeSearchText(page.title));
    if (page.description) descriptions.add(normalizeSearchText(page.description));
  }

  return { titles, descriptions };
}

export function omitComponentCatalogDuplicates(
  data: StructuredSearchData,
  keys: ComponentMirrorKeys,
): StructuredSearchData {
  const droppedHeadingIds = new Set(
    data.headings
      .filter((heading) => keys.titles.has(normalizeSearchText(heading.content)))
      .map((heading) => heading.id),
  );

  return {
    headings: data.headings.filter((heading) => !droppedHeadingIds.has(heading.id)),
    contents: data.contents.filter((item) => {
      if (item.heading && droppedHeadingIds.has(item.heading)) return false;
      return !keys.descriptions.has(normalizeSearchText(item.content));
    }),
  };
}

function isCatalogMirrorHit(result: CatalogSearchHit, keys: ComponentMirrorKeys) {
  if (!result.url.startsWith(`${COMPONENT_CATALOG_URL}#`)) return false;
  const plain = normalizeSearchText(stripSearchMarks(result.content));
  return keys.titles.has(plain) || keys.descriptions.has(plain);
}

export function filterComponentCatalogDuplicates<T extends CatalogSearchHit>(
  results: T[],
  query: string,
  keys: ComponentMirrorKeys,
): T[] {
  const kept = results.filter((result) => !isCatalogMirrorHit(result, keys));
  const catalogHasDetail = kept.some(
    (result) =>
      result.url.startsWith(`${COMPONENT_CATALOG_URL}#`) ||
      (result.url === COMPONENT_CATALOG_URL && result.type !== "page"),
  );

  if (catalogHasDetail) return kept;

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return kept.filter((result) => {
    if (result.type !== "page" || result.url !== COMPONENT_CATALOG_URL) return true;
    const title = stripSearchMarks(result.content).toLowerCase();
    return terms.some((term) => title.includes(term));
  });
}
