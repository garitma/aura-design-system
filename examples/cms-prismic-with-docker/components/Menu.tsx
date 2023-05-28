import {
  useState,
  useRef,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
} from "react";
import Button from "@aura-design/system/button";
import { useRouter } from "next/router";
import * as prismicH from "@prismicio/helpers";
import { ChevronDownIcon } from "@aura-design/system/icons";
import { Content } from "@prismicio/client";

import useClickOutside from "@/hooks/useClickOutside";
import Link, { LinkProps } from "@/components/Link";

type MenuProps = {
  onClose: () => void;
  isMobile?: boolean;
  menuTabs: any;
};

export default function Menu({ onClose, isMobile, menuTabs }: MenuProps) {
  const [indexActive, setIndexActive] = useState(null);
  const router = useRouter();

  return (
    <>
      {menuTabs.map(
        (
          item: {
            menuTab: {
              data: {
                slices: any[];
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                link: JSX.IntrinsicAttributes & LinkProps;
              };
              id: any;
            };
          },
          index: SetStateAction<null>
        ) => {
          const [isOpen, setIsOpen] = useState<boolean>(false);
          const hasChilds = item.menuTab.data?.slices?.length > 0;

          const ref = useRef(null);
          useClickOutside(ref, () => setIsOpen(false));

          const handleOnLink = (item: {
            menuTab?: {
              data: {
                slices: any[];
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                link: JSX.IntrinsicAttributes & LinkProps;
              };
              id: any;
            };
            link?: any;
          }) => {
            if (item.link) {
              setIsOpen(false);
              router.push(item.link);
              if (isMobile) onClose();
            } else {
              setIsOpen(!isOpen);
              setIndexActive(index);
            }
          };

          return (
            <li key={`${item.menuTab.id}_${index}`} ref={ref}>
              {hasChilds ? (
                <ul>
                  <li>
                    <Button
                      mode="link"
                      onClick={() => handleOnLink(item)}
                      onMouseOver={() => {
                        if (isMobile) return;

                        setIsOpen(true);
                        setIndexActive(index);
                      }}
                      isFluid={isMobile}
                    >
                      <span className="wall-pad">
                        {item.menuTab.data.title}
                      </span>
                      <ChevronDownIcon />
                    </Button>
                  </li>
                  <ul
                    className={`submenu white ${isMobile ? "" : "pin"} ${
                      isOpen && indexActive === index ? "" : "hidden"
                    }`}
                  >
                    {item.menuTab.data?.slices.map((slice, index) => (
                      <li key={slice.id} className="halo column">
                        {slice.items.map(
                          (
                            item: {
                              subSectionLink: JSX.IntrinsicAttributes &
                                LinkProps;
                              id: any;
                              subSectionTitle:
                                | string
                                | number
                                | boolean
                                | ReactFragment
                                | ReactPortal
                                | ReactElement<
                                    any,
                                    string | JSXElementConstructor<any>
                                  >
                                | null
                                | undefined;
                            },
                            index: any
                          ) => {
                            return (
                              <Link
                                {...item?.subSectionLink}
                                key={`${item.id}_${index}`}
                                passHref
                              >
                                <a
                                  className={`button-link fluid righttxt`}
                                  onClick={onClose}
                                >
                                  {item.subSectionTitle}
                                </a>
                              </Link>
                            );
                          }
                        )}
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <Link {...item.menuTab?.data?.link} passHref>
                  <Button
                    mode="link"
                    onClick={onClose}
                    isFluid={isMobile}
                    onMouseOver={() => {
                      if (isMobile) return;

                      setIsOpen(false), setIndexActive(null);
                    }}
                  >
                    {item.menuTab?.data?.title}
                  </Button>
                </Link>
              )}
            </li>
          );
        }
      )}
    </>
  );
}
