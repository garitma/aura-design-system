import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { Accordion } from "radix-ui";
import {
  HamburgerMenuIcon,
  ChevronDownIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

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
        <Accordion.Root type="single" collapsible className="md:hidden">
          <Accordion.Item
            value={`menu`}
            key={`menu`}
            className="overflow-hidden"
          >
            <Accordion.Trigger
              className="group flex flex-1 cursor-default items-center gap-1 p-1 leading-none w-full h6 hover:bg-black3 border border-b-1 border-black-3 border-x-0 border-t-0 px-2
            "
            >
              <ChevronDownIcon
                className="group-data-[state=open]:rotate-180 transition duration-300"
                aria-hidden
              />
              Menu
              
            </Accordion.Trigger>
            <Accordion.Content className="px-2 py-1 bg-black-2">
              {menu && (
                <ul>
                  {menu.data.tabs.map((tab, index) => (
                    <li key={index}>
                      <PrismicNextLink
                        className="font-medium"
                        field={tab.tab_item}
                      >
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
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <aside className="md:w-[250px] md:h-full hide-small pad">
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
