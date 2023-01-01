import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

import Link from "@components/Link";
import Image from "@components/Image";
import Menu from "@components/Menu";

const Header = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="aura purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item">
            <Link href="/" className="halo">
              <a>
                <PrismicNextImage field={menu.data.logo} />
              </a>
            </Link>
          </li>
          <li></li>
          <li className="hide-large">
            <Button mode="link" onClick={() => setIsOpen(true)}>
              <Icon sprite={"menu"} />
            </Button>
          </li>
          <li className="hide-small hide-medium">
            <ul className="nav-list">
              <Menu
                onClose={() => setIsOpen(false)}
                menuTabs={menu.data.menuTabs}
              />
            </ul>
          </li>
        </ul>
      </div>
      <div className={`smush anchor ${!isOpen ? "hidden" : "active"}`}>
        <ul className="mod-detail hold top right left bottom aureole one centertxt square">
          <ul className="nav-list">
            <li></li>
            <li></li>
            <li>
              <Button mode="link" onClick={() => setIsOpen(false)}>
                <Icon sprite={"close"} />
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
