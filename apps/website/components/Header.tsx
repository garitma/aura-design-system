import { PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/prismicio";
import Link from "next/link";

import Menu from "@/components/Menu";
import DrawerMenu from "@/components/DrawerMenu";

const Header = async () => {
  const client = createClient();

  const menu = await client.getByUID("navigation", "menu").catch((e) => e);
  const settings = await client.getSingle("settings").catch((e) => e);

  return (
    <header className="p-0.5 border-b border-b-black-3">
      <div className="smush">
        <ul className="nav-list ">
          <li className="item">
            <Link href="/">
              <PrismicNextImage field={settings.data.fav_icon} width={40} />
            </Link>
          </li>

          <li>
            <DrawerMenu menu={menu} />
            <Menu menu={menu} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
