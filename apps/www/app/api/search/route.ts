import { source } from '@/utils/source';
import { createFromSource } from 'fumadocs-core/search/server';
import {
  COMPONENT_CATALOG_URL,
  componentMirrorKeys,
  filterComponentCatalogDuplicates,
  omitComponentCatalogDuplicates,
  type StructuredSearchData,
} from '@/utils/search-index';

const mirrorKeys = componentMirrorKeys(
  source.getPages().map((page) => ({
    url: page.url,
    title: page.data.title,
    description: page.data.description,
  })),
);

async function readStructuredData(page: {
  data: {
    structuredData?: StructuredSearchData | (() => Promise<StructuredSearchData>);
    load?: () => Promise<{ structuredData: StructuredSearchData }>;
  };
}): Promise<StructuredSearchData> {
  const { structuredData } = page.data;

  if (typeof structuredData === 'function') return structuredData();
  if (structuredData) return structuredData;
  if (typeof page.data.load === 'function') {
    return (await page.data.load()).structuredData;
  }

  throw new Error(
    'Cannot find structured data from page, please define the page to index function.',
  );
}

const server = createFromSource(source, {
  language: 'english',
  async buildIndex(page) {
    const structuredData = await readStructuredData(page);
    const index = {
      title: page.data.title ?? page.url,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData,
    };

    if (page.url !== COMPONENT_CATALOG_URL) return index;

    return {
      ...index,
      structuredData: omitComponentCatalogDuplicates(structuredData, mirrorKeys),
    };
  },
});

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query') ?? '';
  const response = await server.GET(request);
  if (!query) return response;

  const results: unknown = await response.json();
  if (!Array.isArray(results)) return Response.json(results);

  return Response.json(
    filterComponentCatalogDuplicates(results, query, mirrorKeys),
  );
}

