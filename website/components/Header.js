import Link from "next/link";
import Image from "next/image";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

const Header = ({ text }) => {
  return (
    <header className="blue aura anchor" style={{ overflow: "hidden" }}>
      <div>
        <Image
          src="https://images.prismic.io/garitma/f87649d7-9c04-482c-8065-5896201ced9d_mint-aura.jpg?auto=compress,format"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="smush wall-pad">
        <ul className="nav-list">
          <li className="logo-circle">
            <Link href="/">
              <a className="halo">
                <Image
                  src="https://images.prismic.io/garitma%2F05577a45-7699-442d-bce7-1cb85fbbf552_favicon-aura.png?auto=compress,format&w=96"
                  width={48}
                  height={48}
                  priority={true}
                  alt="Logo Garitma"
                />
              </a>
            </Link>
          </li>
          <li>
            <ul className="nav-list">
              <li className="anchor item">
                <Button
                  mode="link"
                  href="https://ladle.auradesignsystem.com"
                  target="_blank"
                  rel="noopener"
                >
                  Ladle
                </Button>
              </li>
              <li className="item">
                <Button
                  mode="link"
                  href="https://github.com/garitma/aura-design-system"
                  target="_blank"
                  rel="noopener"
                  className="mod"
                >
                  <Icon sprite="github" />
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="anchor">
        <h1 className="light centertxt mb0 motion-fadeUp mounted">{text}</h1>
      </div>
    </header>
  );
};

export default Header;
