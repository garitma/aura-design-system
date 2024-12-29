import { useState, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Button from "@aura-design/system/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Separator from "@aura-design/system/separator";
import useClickOutside from "@/hooks/useClickOutside";

type MenuProps = {
  menu: Content.NavigationDocument;
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

        const handleOnClose = () => {
          if (onClose) {
            onClose();
          }
          setIsOpen(false);
          setIndexActive(null);
        };

        const classNameConnectTab: string[] = ["hover:underline"];

        const classNameConnectDropDown: string[] = [
          "mod",
          "no-border",
          "absolute",
          "left-0",
          "right-0",
          "p-1",
        ];

        if (!isMobile && "w-20") {
          classNameConnectDropDown.push("w-20");
        }

        if (!isActive) {
          classNameConnectDropDown.push("hidden");
        }

        if (isActive) {
          classNameConnectTab.push("underline");
        }

        if (!hasChilds) {
          return (
            <li key={item.id} ref={ref}>
              <PrismicNextLink
                field={item.primary.link}
                passHref
                legacyBehavior
                onMouseOver={() => {
                  if (isMobile) return;
                  setIsOpen(true);
                  setIndexActive(index);
                }}
              >
                <Button
                  label={item.primary.label || ""}
                  mode="menu"
                  // @ts-ignore: Not recomend access direct to target
                  target={item.primary.link?.target ? "_blank" : "_self"}
                  onClick={() => {
                    if (!isMobile) return;
                    setIsOpen(isActive ? !isOpen : true);
                    setIndexActive(index);
                    if (!hasChilds && onClose) {
                      handleOnClose();
                    }
                  }}
                  className={classNameConnectTab.join(" ")}
                  isFluid={isMobile}
                />
              </PrismicNextLink>
            </li>
          );
        }

        return (
          <li
            key={item.id}
            className="item"
            ref={ref}
            onMouseOver={() => {
              if (isMobile) return;
              setIsOpen(true);
              setIndexActive(index);
            }}
          >
            <Button
              label={item.primary.label || ""}
              mode="menu"
              onClick={() => {
                if (!isMobile) return;
                setIsOpen(isActive ? !isOpen : true);
                setIndexActive(index);
                if (!hasChilds && onClose) {
                  handleOnClose();
                }
              }}
              className={classNameConnectTab.join(" ")}
              isFluid={isMobile}
            >
              {hasChilds ? <ChevronDownIcon className="ml-0.5" /> : null}
            </Button>
            {hasChilds ? (
              <ul className={classNameConnectDropDown.join(" ")}>
                {item.items.map((sub_item, index) => (
                  <li
                    key={`${item.id}-${index}`}
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
                          // @ts-ignore: Not recomend access direct to target
                          target={sub_item.child_link?.target ? "_blank" : "_self"}
                          className="truncate"
                          onClick={handleOnClose}
                          isFluid
                        />
                      </PrismicNextLink>
                    ) : null}
                    <Separator className="m0" />
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
