import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

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
        <aside className="md:w-[250px] md:h-full pad">
          {menu && (
            <ul>
              {menu.data.tabs.map((tab, index) => (
                <li key={index}>
                  <PrismicNextLink className="font-medium" field={tab.tab_item}>
                    {tab.tab_item.text}
                  </PrismicNextLink>
                  {tab.sub_tab_item.length > 0 && (
                    <ul className="mt-1 px-0.5 last-of-type:mb-0 mb-8">
                      {tab.sub_tab_item.map((subTab) => {
                        return (
                          <li key={subTab.key}>
                            <PrismicNextLink
                              field={subTab}
                              className="relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left "
                            >
                              {subTab.text}
                            </PrismicNextLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </aside>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
