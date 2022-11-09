import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

import Menu from "@components/Menu";

const Header = ({ text, menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="aura purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item">
            <Link href="/">
              <a className="halo">
                <Image
                  src="https://images.prismic.io/aura-design-cms-prismic-with-docker/b325b91c-0903-4671-98f2-a63f527d9c03_logo.png?auto=compress,format"
                  width={48}
                  height={48}
                  priority={true}
                  alt="Logo Aura Design"
                />
              </a>
            </Link>
          </li>
          <li></li>
          <li className="hide-large">
            <Button mode="link" onClick={() => setIsOpen(true)}>
              <Icon sprite={"menu"} />
            </Button>
          </li>
          <li className="hide-medium hide-small">
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
              menu_tabs={menu_tabs}
              isMobile
            />
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
