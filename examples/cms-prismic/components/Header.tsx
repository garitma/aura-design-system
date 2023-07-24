import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as prismic from "@prismicio/client";
import Button from "@aura-design/system/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

import Menu from "@/components/Menu";

type HeaderProps = {
  menu: prismic.Content.NavigationDocument;
};

const Header = ({ menu }: HeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="purple aura">
      <div className="smush wall-pad">
        <ul className="nav-list">
          <li className="logo-circle">
            <Link href="/" className="nav-list">
              <div className="valign item">
                <b className="h3">LUNALANDIA</b>
              </div>
            </Link>
          </li>
          <li className="hide-medium hide-large">
            <Button mode="pill" onClick={() => setIsOpen(true)}>
              <HamburgerMenuIcon className="icon" />
            </Button>
          </li>
          <li className="hide-small">
            <ul className="nav-list">
              <Menu menu={menu} />
            </ul>
          </li>
        </ul>
      </div>
      <div
        className={`anchor fluid vfluid hold left top right bottom snow aura ${
          !isOpen ? "hidden" : "active"
        }`}
      >
        <ul className="mod-detail top right left bottom aureole one centertxt square">
          <ul className="nav-list">
            <li></li>
            <li></li>
            <li className="item">
              <Button mode="pill" onClick={() => setIsOpen(false)}>
                <Cross1Icon className="icon" />
              </Button>
            </li>
          </ul>
          <Menu menu={menu} onClose={() => setIsOpen(false)} isMobile />
        </ul>
      </div>
    </header>
  );
};

export default Header;
