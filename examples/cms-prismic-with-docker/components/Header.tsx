import { useState } from "react";
import Button from "@aura-design/system/button";
import { CloseIcon, MenuIcon } from "@aura-design/system/icons";
import { PrismicNextImage } from "@prismicio/next";
import { Content } from "@prismicio/client";

import Link from "@/components/Link";
import Menu from "@/components/Menu";

export type MenuProps = Content.MenuDocumentData;

const Header = ({ menu }: { menu: { data: MenuProps } }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item ">
            <Link href="/">
              <a className="halo">
                {menu.data?.logo?.url ? (
                  <PrismicNextImage field={menu.data.logo} />
                ) : null}
              </a>
            </Link>
          </li>
          <li></li>
          <li className="hide-large">
            <Button mode="link" onClick={() => setIsOpen(true)}>
              <MenuIcon />
            </Button>
          </li>
          <li className="hide-small hide-medium">
            <ul className="nav-list">
              {menu?.data?.menuTabs ? (
                <Menu
                  onClose={() => setIsOpen(false)}
                  menuTabs={menu.data.menuTabs}
                />
              ) : null}
            </ul>
          </li>
        </ul>
      </div>
      <div
        className={`anchor fluid vfluid hold inset-0 white aura ${
          !isOpen ? "hidden" : "active"
        }`}
      >
        <ul className="top right left bottom aureole one centertxt square">
          <ul className="nav-list">
            <li></li>
            <li></li>
            <li>
              <Button mode="link" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </Button>
            </li>
          </ul>
          <Menu
            onClose={() => setIsOpen(false)}
            menuTabs={menu.data.menuTabs}
            isMobile
          />
        </ul>
      </div>
    </header>
  );
};

export default Header;
