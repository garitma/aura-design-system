import { useState } from "react";
import Link from "next/link";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

import Image from "@components/Image";
import Menu from "@components/Menu";

const Header = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="aura purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item">
            <Link href="/">
              <a className="halo">
                <Image {...menu.data.logo} priority={true} />
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
      {isOpen && (
        <div className="smush anchor">
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
      )}
    </header>
  );
};

export default Header;
