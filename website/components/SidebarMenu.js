import { useState } from "react";
import Link from "next/link";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

const Menu = ({ setIsOpen }) => {
  return (
    <>
      <li>
        <Link href="/docs/getting-started">
          <a
            className="button-menu"
            onClick={() => (setIsOpen ? setIsOpen(false) : {})}
          >
            Getting started
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/design-principles">
          <a
            className="button-menu"
            onClick={() => (setIsOpen ? setIsOpen(false) : {})}
          >
            Design principles
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/spacing">
          <a
            className="button-menu"
            onClick={() => (setIsOpen ? setIsOpen(false) : {})}
          >
            Spacing
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/color">
          <a
            className="button-menu"
            onClick={() => (setIsOpen ? setIsOpen(false) : {})}
          >
            Color
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/iconography">
          <a
            className="button-menu"
            onClick={() => (setIsOpen ? setIsOpen(false) : {})}
          >
            Iconography
          </a>
        </Link>
      </li>
    </>
  );
};

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ul className="hide-small sticky">
        <Menu />
      </ul>
      <div className="hide-medium hide-large">
        <div className="aura anchor">
          <span className="h5">Documentation</span>
          <div className="pin right top bottom valign">
            <Button mode="link" onClick={() => setIsOpen(!isOpen)}>
              <Icon sprite={isOpen ? "arrowUp" : "arrowDown"} />
            </Button>
          </div>
        </div>
        {isOpen && (
          <ul>
            <Menu setIsOpen={setIsOpen} />
          </ul>
        )}
      </div>
    </>
  );
};

export default SidebarMenu;
