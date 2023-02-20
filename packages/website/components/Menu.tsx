import { useState, useRef } from "react";
import Button from "@aura-design/system/button";
import Separator from "@aura-design/system/separator";
import { GitHubLogoIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

import useClickOutside from "@/hooks/useClickOutside";
import Link from "@/components/Link";

type MenuProps = {
  onClose: any;
  isMobile?: boolean;
  menuTabs: any;
};

export default function Menu({ onClose, isMobile, menuTabs }: MenuProps) {
  const [indexActive, setIndexActive] = useState(null);
  const router = useRouter();

  return (
    <>
      {menuTabs.map((item, index) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasChilds = item.menuTab.data?.slices?.length > 0;

        const ref = useRef(null);
        useClickOutside(ref, () => setIsOpen(false));

        const handleOnLink = (item) => {
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
                    {item.menuTab.data.title}

                    {/* <Icon sprite="arrowDown" /> */}
                  </Button>
                </li>
                <ul
                  className={`submenu white ${isMobile ? "" : "pin"} ${
                    isOpen && indexActive === index ? "" : "hidden"
                  }`}
                >
                  {item.menuTab.data?.slices.map((slice, index) => (
                    <ul key={slice.id} className="halo column">
                      {slice.items.map((item, index) => {
                        return (
                          <li key={`${item.id}_${index}`}>
                            <Link
                              {...item?.subSectionLink}
                              field={item.subSectionLink}
                              passHref
                            >
                              <a
                                className={`button-link fluid righttxt`}
                                onClick={onClose}
                              >
                                <span className="wall-pad">
                                  {item.subSectionTitle}
                                </span>
                                <ExternalLinkIcon className="icon"/>
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
                <Button
                  mode="link"
                  target={item.menuTab?.data?.link?.target}
                  onClick={onClose}
                  isFluid={isMobile}
                  onMouseOver={() => {
                    if (isMobile) return;

                    setIsOpen(false), setIndexActive(null);
                  }}
                >
                  <span className="wall-pad">{item.menuTab?.data?.title}</span>
                  {item.menuTab?.data?.link?.target && <ExternalLinkIcon className="icon" />}
                </Button>
              </Link>
            )}
          </li>
        );
      })}
      <li>
        <Separator isVertical={!isMobile} />
      </li>
      <li>
        <Button
          mode="link"
          href="https://github.com/garitma/aura-design-system"
          target="_blank"
          rel="noopener"
        >
          <GitHubLogoIcon className="icon"/>

          <span className="hide-large wall-pad">Github</span>
        </Button>
      </li>
    </>
  );
}
