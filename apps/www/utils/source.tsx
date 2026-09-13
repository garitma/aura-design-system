import { docs } from "@/.source";
import {
  createGetUrl,
  type InferPageType,
  llms,
  loader,
} from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { statusBadgesPlugin } from "fumadocs-core/source/status-badges";

function StatusBadge({ status }: { status: string }) {
  if (status === "new") {
    return (
      <span
        className="ms-0.5 inline-block size-0.5 shrink-0 self-center rounded-full bg-accent-9"
        title="New this week"
        aria-label="New this week"
      />
    );
  }

  return (
    <span
      data-status={status}
      className="ms-0.5 inline-block shrink-0 self-center rounded-full bg-accent-3 px-0.5 text-xs font-medium text-accent-11 capitalize"
    >
      {status}
    </span>
  );
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [
    lucideIconsPlugin(),
    statusBadgesPlugin({
      renderBadge: (status) => <StatusBadge status={status} />,
    }),
  ],
});

export const docsContentRoute = "/llms.mdx/docs";

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText("processed")}`,
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  return docsLlms.page(page);
}
