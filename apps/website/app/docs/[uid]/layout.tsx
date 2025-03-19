import { createClient } from "@/prismicio";

import AsideMenu from "@/components/AsideMenu";

type DocsLayoutType = {
  children: React.ReactNode;
};

export default async function DocsLayout({ children }: DocsLayoutType) {
  const client = createClient();
  const menu = await client
    .getByUID("navigation", "docs-menu")
    .catch(() => null);

  return (
    <div className="smush h-full">
      <div className="md:flex flex-row gap-1 h-full">
        {menu && <AsideMenu menu={menu} />}
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
