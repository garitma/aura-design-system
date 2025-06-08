import { PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/prismicio";
import Link from "next/link";

import Menu from "@/components/Menu";
import MCPNavItem from "@/components/MCPNavItem";

const Header = async () => {
  const client = createClient();

  const menu = await client.getByUID("navigation", "menu").catch((e) => e);
  const settings = await client.getSingle("settings").catch((e) => e);

  return (
    <header className="p-0.5 border-b border-b-gray-3">
      <div className="smush">
        <ul className="nav-list ">
          <li className="item">
            <Link href="/">
              <PrismicNextImage field={settings.data.fav_icon} width={40} />
            </Link>
          </li>

          <ul className="nav-list">
            <Menu menu={menu} />
            <MCPNavItem />
          </ul>
        </ul>
      </div>
    </header>
  );
};

export default Header;
