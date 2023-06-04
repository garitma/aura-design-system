import Link from "next/link";
import Image from "next/image";
import Button from "@aura-design/system/button";

import { GithubIcon } from "@/components/icons";

type HeaderProps = {
  text?: string;
};

const Header = ({ text }: HeaderProps): JSX.Element => {
  return (
    <header className="purple aura">
      <div className="smush wall-pad">
        <ul className="nav-list">
          <li className="logo-circle">
            <Link href="/" className="nav-list">
              <div className="valign">
                <Image
                  src="/logo.png"
                  width={48}
                  height={48}
                  priority={true}
                  alt="Logo Aura Design"
                />
              </div>
              <div className="valign item">
                <b className="h3">LUNALANDIA</b>
              </div>
            </Link>
          </li>
          <li className="mod">
            <Button
              mode="link"
              href="https://github.com/garitma/aura-design-system/tree/canary/examples/next-base"
              target="_blank"
              rel="noopener"
            >
              <GithubIcon />
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <div>{text && <h1 className="light centertxt mt0 mb0">{text}</h1>}</div>
      </div>
    </header>
  );
};

export default Header;
