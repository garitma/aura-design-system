import { PrismicNextImage } from "@prismicio/next";

import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import Link from "next/link";

export default async function Header() {
  const client = createClient();
  //const settings = await client.getSingle("settings");
  const menu = await client.getByUID("navigation", "menu");

  return (
    <header className="p-1 bg-purple">
      {isFilled.image(menu.data.logo) && (
        <Link href="/">
          <PrismicNextImage field={menu.data.logo} width={70} height={70} />
        </Link>
      )}
    </header>
  );
}
