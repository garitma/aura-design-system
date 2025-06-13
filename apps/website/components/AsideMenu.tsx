import { PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";

import AccordionList from "@/components/ui/AccordionList";

type AsideMenuProps = {
  menu: Content.NavigationDocument;
};

const AsideMenu = ({ menu }: AsideMenuProps) => {
  return (
    <>
      <AccordionList
        className="md:hidden"
        type="multiple"
        items={[
          {
            title: "Menu",
            value: "menu",
            content: (
              <>
                {menu && (
                  <ul>
                    {menu.data.tabs.map((tab, index) => (
                      <li key={index} className="relative pb-1">
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
              </>
            ),
          },
        ]}
      />

      <aside className="md:w-[250px] md:h-full hide-small pad">
        {menu && (
          <ul className="top-1 sticky">
            {menu.data.tabs.map((tab, index) => (
              <li key={index} className="relative pb-1">
                <PrismicNextLink className="font-medium" field={tab.tab_item}>
                  {tab.tab_item.text}
                </PrismicNextLink>
                {tab.sub_tab_item.length > 0 && (
                  <ul className="mt-1 px-0.5">
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
    </>
  );
};

export default AsideMenu;
