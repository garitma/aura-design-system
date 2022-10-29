import Link from "next/link";
import Image from "next/image";
import Icon from "aura-design/icon";
import Button from "aura-design/button";

const Header = ({ text }) => {
  return (
    <header className="purple aura">
      <div className="smush wall-pad">
        <ul className="nav-list">
          <li className="logo-circle">
            <Link href="/">
              <a className="halo">
                <Image
                  src="https://images.prismic.io/aura-design-cms-prismic-with-docker/b325b91c-0903-4671-98f2-a63f527d9c03_logo.png?auto=compress,format"
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
        <div>{text && <h1 className="light centertxt mt0 mb0">{text}</h1>}</div>
      </div>
    </header>
  );
};

export default Header;
