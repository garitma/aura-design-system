import { source } from '@/utils/source';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const pages = source.getPages();
    
    // Get main pages and component pages
    const quickLinks = pages
      .filter((page) => {
        // Include main pages and component pages
        const slugs = page.slugs;
        return (
          slugs.length === 1 || // Main pages like index, installation, etc.
          (slugs.length === 2 && slugs[0] === 'components') // Component pages
        );
      })
      .map((page) => ({
        value: page.url,
        label: page.data.title,
        url: page.url,
        description: page.data.description,
      }))
      .slice(0, 10); // Limit to 10 quick links

    return NextResponse.json(quickLinks);
  } catch (error) {
    console.error('Error fetching quick links:', error);
    return NextResponse.json([], { status: 500 });
  }
}

