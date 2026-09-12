"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Vendored from Fumadocs UI 15 `contexts/layout` so Aura's customized layout
 * keeps working after the v16 upgrade (those context exports were removed).
 */
export interface PageStyles {
  tocNav?: string;
  toc?: string;
  page?: string;
  article?: string;
}

const StylesContext = createContext<PageStyles>({
  tocNav: "xl:hidden",
  toc: "max-xl:hidden",
});

export function usePageStyles(): PageStyles {
  return useContext(StylesContext);
}

export function StylesProvider({
  children,
  ...value
}: PageStyles & { children: ReactNode }) {
  return (
    <StylesContext.Provider value={value}>{children}</StylesContext.Provider>
  );
}

export interface NavProviderProps {
  /**
   * Use transparent background
   *
   * @defaultValue none
   */
  transparentMode?: "always" | "top" | "none";
}

interface NavContextType {
  isTransparent: boolean;
}

const NavContext = createContext<NavContextType>({
  isTransparent: false,
});

export function NavProvider({
  transparentMode = "none",
  children,
}: NavProviderProps & { children: ReactNode }) {
  const [transparent, setTransparent] = useState(transparentMode !== "none");

  useEffect(() => {
    if (transparentMode !== "top") return;

    const listener = () => {
      setTransparent(window.scrollY < 10);
    };

    listener();
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [transparentMode]);

  return (
    <NavContext.Provider
      value={useMemo(() => ({ isTransparent: transparent }), [transparent])}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav(): NavContextType {
  return useContext(NavContext);
}
