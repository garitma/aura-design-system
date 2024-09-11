import Link from "next/link";
import Accordion from "@aura-design/system/accordion";

const Menu = ({ handleOnClose }) => {
  return (
    <>
      <span>Welcome!</span>
      <li>
        <Link href="/docs/getting-started">
          <a
            className="button-menu"
            onClick={() => (handleOnClose ? handleOnClose() : {})}
          >
            Getting started
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/design-principles">
          <a
            className="button-menu"
            onClick={() => (handleOnClose ? handleOnClose() : {})}
          >
            Design principles
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/spacing">
          <a
            className="button-menu"
            onClick={() => (handleOnClose ? handleOnClose() : {})}
          >
            Spacing
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/color">
          <a
            className="button-menu"
            onClick={() => (handleOnClose ? handleOnClose() : {})}
          >
            Color
          </a>
        </Link>
      </li>
      <li>
        <Link href="/docs/iconography">
          <a
            className="button-menu"
            onClick={() => (handleOnClose ? handleOnClose() : {})}
          >
            Iconography
          </a>
        </Link>
      </li>
      <hr className="aura" />
      <span>Components</span>
      <li>
        <Link href="/docs/button">
          <a
            className="button-menu"
            onClick={() => (handleOnClose ? handleOnClose() : {})}
          >
            Button
          </a>
        </Link>
      </li>
    </>
  );
};

const SidebarMenu = () => {
  const handleOnClose = () => {
    const details = document.querySelector("details");
    details.removeAttribute("open");
  };

  return (
    <>
      <ul className="hide-small sticky">
        <Menu handleOnClose={handleOnClose} />
      </ul>
      <div className="hide-medium hide-large">
        <Accordion title="Documentation" headerSize="h5">
          <ul>
            <Menu handleOnClose={handleOnClose} />
          </ul>
        </Accordion>
      </div>
    </>
  );
};

export default SidebarMenu;
