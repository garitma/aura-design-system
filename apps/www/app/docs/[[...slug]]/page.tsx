import { getPageImage, getPageMarkdownUrl, source } from "@/utils/source";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { DocsPage } from "@/components/layout/page";
import { DocsPageActions } from "@/components/DocsPageActions";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/Badge";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

function parseFrontmatter(raw: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = raw.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const yamlContent = match[1];
  const attributes: Record<string, any> = {};

  const lines = yamlContent.split("\n");
  let inLinks = false;
  const links: Record<string, string> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed === "links:" || trimmed.match(/^links:\s*$/)) {
      inLinks = true;
      continue;
    }

    if (inLinks && trimmed.match(/^\w+:/) && !line.startsWith("  ")) {
      inLinks = false;
    }

    if (inLinks) {
      const nestedMatch = line.match(/^\s+(\w+):\s*(.+)$/);
      if (nestedMatch) {
        const [, key, value] = nestedMatch;
        links[key] = value.replace(/^["']|["']$/g, "");
      }
    } else {
      const keyValueMatch = trimmed.match(/^(\w+):\s*(.+)$/);
      if (keyValueMatch) {
        const [, key, value] = keyValueMatch;
        attributes[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  if (Object.keys(links).length > 0) {
    attributes.links = links;
  }

  return attributes;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const raw = await page.data.getText("raw");
  const attributes = parseFrontmatter(raw);
  const links = attributes.links || {};
  const markdownUrl = getPageMarkdownUrl(page).url;
  const githubUrl = `https://github.com/somosgented/aura-design-system/blob/canary/apps/www/content/docs/${page.path}`;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      article={{
        className:
          "flex min-w-0 max-w-[860px] flex-col gap-1 pt-2 px-1.5 md:px-3 md:mx-auto",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-1">
        {page.data.description}
      </DocsDescription>
      <DocsPageActions markdownUrl={markdownUrl} githubUrl={githubUrl} />
      {links ? (
        <div className="flex items-center gap-1 mb-1">
          {links?.doc && (
            <Badge variant="secondary" className="rounded-full" asChild>
              <a href={links.doc} target="_blank" rel="noreferrer">
                Docs <ArrowTopRightIcon className="icon" />
              </a>
            </Badge>
          )}
          {links?.api && (
            <Badge variant="secondary" className="rounded-full" asChild>
              <a href={links.api} target="_blank" rel="noreferrer">
                API Reference <ArrowTopRightIcon className="icon" />
              </a>
            </Badge>
          )}
        </div>
      ) : null}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: `${page.data.title} - Aura Design System`,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}

