import Button from "@aura-design/system/button";

import Link from "@/components/Link";

const MenuAside = ({ secondMenuTabs }) => {
  return (
    <>
      {secondMenuTabs.map((item, index) => {
        const hasChilds = item.menuTab.data?.slices?.length > 0;

        const handleOnLink = (item) => {};

        return (
          <li key={`${item.menuTab.id}_${index}`}>
            {hasChilds ? (
              <ul>
                <li>
              
                    <b>{item.menuTab.data.title}</b>
          
                </li>
                <ul>
                  {item.menuTab.data?.slices.map((slice, index) => (
                    <ul key={slice.id}>
                      {slice.items.map((item, index) => {
                        return (
                          <li key={`${item.id}_${index}`}>
                            <Link
                              {...item?.subSectionLink}
                              field={item.subSectionLink}
                              passHref
                            >
                              <a className={`button-link fluid righttxt`}>
                                <span className="wall-pad">
                                  {item.subSectionTitle}
                                </span>
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </ul>
              </ul>
            ) : (
              <Link
                {...item.menuTab?.data?.link}
                field={item.menuTab?.data?.link}
                passHref
              >
                <Button mode="link" target={item.menuTab?.data?.link?.target}>
                  <span className="wall-pad">{item.menuTab?.data?.title}</span>
                </Button>
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

export default MenuAside;
