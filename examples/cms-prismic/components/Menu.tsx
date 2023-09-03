import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import * as prismic from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Button from "@aura-design/system/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import useClickOutside from "@/hooks/useClickOutside";

type MenuProps = {
  menu: prismic.Content.NavigationDocument;
  isMobile?: boolean;
  onClose?: () => void;
};

const Menu = ({ menu, isMobile, onClose }: MenuProps) => {
  const [indexActive, setIndexActive] = useState<number | null>(null);

  return (
    <>
      {menu.data.slices.map((item, index) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasChilds = item.items?.length > 0;
        const isActive = isOpen && indexActive === index;
        const ref = useRef(null);
        useClickOutside(ref, () => (isMobile ? {} : setIsOpen(false)));

        return (
          <li key={item.id} className="item" ref={ref}>
            <Button
              label={item.primary.label}
              mode="menu"
              onMouseOver={() => {
                if (isMobile) return;
                setIsOpen(true);
                setIndexActive(index);
              }}
              onClick={() => {
                if (!isMobile) return;
                setIsOpen(isActive ? !isOpen : true);
                setIndexActive(index);
                if (!hasChilds && onClose) {
                  onClose();
                }
              }}
              className={isActive ? "underline" : null}
              isFluid={isMobile}
            >
              {hasChilds ? <ChevronDownIcon className="ml-0.5" /> : null}
            </Button>
            {hasChilds ? (
              <ul
                className={`absolute mod p-1 md:w-20 left-0 right-0 ${
                  isActive ? "" : "hidden"
                }`}
              >
                {item.items.map((sub_item) => (
                  <li
                    key={JSON.stringify(sub_item)}
                    className="hover:bg-accents-1"
                  >
                    {sub_item.child_label ? (
                      <PrismicNextLink
                        field={sub_item.child_link}
                        passHref
                        legacyBehavior
                      >
                        <Button
                          label={sub_item.child_label}
                          mode="menu"
                          className="truncate"
                          onClick={onClose}
                        />
                      </PrismicNextLink>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </>
  );
};

export default Menu;
