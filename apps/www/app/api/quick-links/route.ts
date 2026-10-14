import { source } from '@/utils/source';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  try {
    const pages = source.getPages();
    
    const quickLinks = pages
      .filter((page) => {
        const slugs = page.slugs;
        return (
          slugs.length === 1 ||
          (slugs.length === 2 && (slugs[0] === "components" || slugs[0] === "utils"))
        );
      })
      .map((page) => ({
        value: page.url,
        label: page.data.title,
        url: page.url,
        description: page.data.description,
      }))
      .slice(0, 10);

    return NextResponse.json(quickLinks);
  } catch (error) {
    console.error('Error fetching quick links:', error);
    return NextResponse.json([], { status: 500 });
  }
}

