import Link from "next/link";
import Image from "next/image";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

const Header = ({ text }) => {
  return (
    <header className="purple aura">
      <div className="smush aura">
        <ul className="nav-list">
          <li className="logo-circle">
            <Link href="/">
              <a className="halo">
                <Image
                  src="https://images.prismic.io/garitma%2F05577a45-7699-442d-bce7-1cb85fbbf552_favicon-aura.png?auto=compress,format&w=96"
                  width={48}
                  height={48}
                  priority={true}
                  alt="Logo Aura Design"
                />
              </a>
            </Link>
          </li>
          <li className="mod">
            <Button
              mode="link"
              href="https://github.com/garitma/aura-design-system/tree/main/examples/next-base"
              target="_blank"
              rel="noopener"
            >
              <Icon sprite="github" />
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="light centertxt">{text}</h1>
      </div>
    </header>
  );
};

export default Header;
