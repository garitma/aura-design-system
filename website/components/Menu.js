import { useState, useRef } from "react";
import Button from "aura-design/button";
import Icon from "aura-design/icon";
import { useRouter } from "next/router";
import * as prismicH from "@prismicio/helpers";

import useClickOutside from "@hooks/useClickOutside";
import Link from "@components/Link";

export default function Menu({ onClose, isMobile, menuTabs }) {
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
                    <Icon sprite="arrowDown" />
                  </Button>
                </li>
                <ul
                  className={`submenu white ${isMobile ? "" : "pin"} ${
                    isOpen && indexActive === index ? "" : "hidden"
                  }`}
                >
                  {item.menuTab.data?.slices.map((slice, index) => (
                    <li key={slice.id} className="halo column">
                      {/* {slice.primary.sectionTitle.length > 0 && (
                        <span className="wall-pad fluid">
                          {prismicH.asText(slice.primary.title)}
                        </span>
                      )} */}
                      {slice.items.map((item, index) => {
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
                      })}
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
      })}
    </>
  );
}
