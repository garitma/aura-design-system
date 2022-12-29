import { useState } from "react";
import Icon from "aura-design/icon";
import Button from "aura-design/button";
import Image from "next/image";

import Link from "@components/Link";

const Header = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="aura purple">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="item">
            <Link href="/" className="halo">
              <a>
                <Image
                  src="/logo.png"
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
          <li className="hide-small hide-medium">
            <ul className="nav-list"></ul>
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
