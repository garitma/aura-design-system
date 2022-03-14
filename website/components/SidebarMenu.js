import { useState } from "react";
import Link from "next/link";
import Icon from "aura-design/icon";
import Button from "aura-design/button";
import Accordion from "aura-design/accordion";

const Menu = ({ setIsOpen }) => {
  return (
    <>
    <span>Welcome!</span>
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
      <hr className="aura" />
      <span>Components</span>
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
        <Accordion title="Documentation" headlineSize="h5">
          <ul>
            <Menu setIsOpen={setIsOpen} />
          </ul>
        </Accordion>
      </div>
    </>
  );
};

export default SidebarMenu;
