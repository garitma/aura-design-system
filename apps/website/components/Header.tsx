import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { MenuIcon, CloseIcon } from "@aura-design/system/dist/icons";
import Button from "@aura-design/system/button";

import Link from "@/components/Link";
import Menu from "@/components/Menu";

const Header = ({ menu }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item">
            {menu?.data?.logo && (
              <Link href="/">
                <a className="halo">
                  <div className="mod-media">
                    <PrismicNextImage field={menu.data.logo} />
                  </div>
                </a>
              </Link>
            )}
          </li>
          <li></li>
          <li className="hide-large">
            <Button mode="link" onClick={() => setIsOpen(true)}>
              <MenuIcon />
            </Button>
          </li>
          <li className="hide-small hide-medium">
            <ul className="nav-list">
              {menu?.data && (
                <Menu
                  onClose={() => setIsOpen(false)}
                  menuTabs={menu.data.menuTabs}
                />
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div
        className={`anchor fluid vfluid hold left top right bottom white aura ${
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
