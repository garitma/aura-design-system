import Link from "next/link";
import Image from "next/image";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

const Header = ({ text }) => {
  return (
    <header className="accents-4 white-text aura">
      <div className="smesh wall-pad">
        <ul className="nav-list">
          <li>
            <Link href="/" className="halo">
              <Image
                src="/logo.png"
                width={64}
                height={64}
                priority={true}
                alt="Logo Aura Design"
              />
              <span className="valign wall-pad">
                <span className="warning warning-text wall-pad">Play</span>
              </span>
            </Link>
          </li>
          <li className="mod dark">
            <Button
              mode="link"
              href="https://github.com/garitma/aura-design-system"
              target="_blank"
              rel="noopener"
            >
              <Icon sprite="github" />
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
