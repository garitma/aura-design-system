import { useState, useRef } from "react";
import Button from "@aura-design/system/button";
import Icon from "@aura-design/system/icon";
import Separator from "@aura-design/system/separator";
import { useRouter } from "next/router";
import * as prismicH from "@prismicio/helpers";

import useClickOutside from "@/hooks/useClickOutside";
import Link from "@/components/Link";

export default function Menu({ onClose, isMobile, menuTabs }) {
  const [indexActive, setIndexActive] = useState(null);
  const router = useRouter();

  return (
    <>
      {menuTabs.map((item, index) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasChilds = item.menuTab.data?.slices?.length > 0;

        const ref = useRef(null);
        useClickOutside(ref, () => setIsOpen(false));

        const handleOnLink = (item) => {
          if (item.link) {
            setIsOpen(false);
            router.push(item.link);
            if (isMobile) onClose();
          } else {
            setIsOpen(!isOpen);
            setIndexActive(index);
          }
        };

        return (
          <li key={`${item.menuTab.id}_${index}`} ref={ref}>
            {hasChilds ? (
              <ul>
                <li>
                  <Button
                    mode="link"
                    onClick={() => handleOnLink(item)}
                    onMouseOver={() => {
                      if (isMobile) return;

                      setIsOpen(true);
                      setIndexActive(index);
                    }}
                    isFluid={isMobile}
                  >
                    {item.menuTab.data.title}

                    {/* <Icon sprite="arrowDown" /> */}
                  </Button>
                </li>
                <ul
                  className={`submenu white ${isMobile ? "" : "pin"} ${
                    isOpen && indexActive === index ? "" : "hidden"
                  }`}
                >
                  {item.menuTab.data?.slices.map((slice, index) => (
                    <ul key={slice.id} className="halo column">
                      {slice.items.map((item, index) => {
                        return (
                          <li key={`${item.id}_${index}`}>
                            <Link
                              {...item?.subSectionLink}
                              field={item.subSectionLink}
                              passHref
                            >
                              <a
                                className={`button-link fluid righttxt`}
                                onClick={onClose}
                              >
                                <span className="wall-pad">
                                  {item.subSectionTitle}
                                </span>
                                <Icon
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </Icon>
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </ul>
              </ul>
            ) : (
              <Link
                {...item.menuTab?.data?.link}
                field={item.menuTab?.data?.link}
                passHref
              >
                <Button
                  mode="link"
                  target={item.menuTab?.data?.link?.target}
                  onClick={onClose}
                  isFluid={isMobile}
                  onMouseOver={() => {
                    if (isMobile) return;

                    setIsOpen(false), setIndexActive(null);
                  }}
                >
                  <span className="wall-pad">{item.menuTab?.data?.title}</span>
                  {item.menuTab?.data?.link?.target && (
                    <Icon
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </Icon>
                  )}
                </Button>
              </Link>
            )}
          </li>
        );
      })}
      <li>
        <Separator isVertical={!isMobile} />
      </li>
      <li>
        <Button
          mode="link"
          href="https://github.com/garitma/aura-design-system"
          target="_blank"
          rel="noopener"
        >
          <Icon
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </Icon>
          <span className="hide-large wall-pad">Github</span>
        </Button>
      </li>
    </>
  );
}
