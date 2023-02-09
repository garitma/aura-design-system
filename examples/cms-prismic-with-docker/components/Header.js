import { useState } from "react";
import Button from "@aura-design/system/button";
import { CloseIcon } from "@aura-design/system/dist/icons";

import Link from "@/components/Link";
import Image from "@/components/Image";
import Menu from "@/components/Menu";

const Header = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="aura purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item">
            <Link href="/" className="halo">
              <a>
                {menu.data?.logo?.url ? <Image {...menu.data.logo} /> : null}
              </a>
            </Link>
          </li>
          <li></li>
          <li className="hide-large">
            <Button mode="link" onClick={() => setIsOpen(true)}>
              =
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
      <div className={`smush anchor ${!isOpen ? "hidden" : "active"}`}>
        <ul className="mod-detail hold top right left bottom aureole one centertxt square">
          <ul className="nav-list">
            <li></li>
            <li></li>
            <li>
              <Button mode="link" onClick={() => setIsOpen(false)}>
                x
              </Button>
            </li>
          </ul>
          {menu?.data?.menuTabs ? (
            <Menu
              onClose={() => setIsOpen(false)}
              menuTabs={menu.data.menuTabs}
              isMobile
            />
          ) : null}
        </ul>
      </div>
    </header>
  );
};

export default Header;
