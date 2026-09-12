"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { usePathname } from "fumadocs-core/framework";
import { useOnChange } from "fumadocs-core/utils/use-on-change";

/**
 * Vendored from Fumadocs UI 15 `contexts/sidebar` so Aura's customized layout
 * keeps working after the v16 upgrade (those context exports were removed).
 */
interface SidebarContextValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  /**
   * When set to false, don't close the sidebar when navigate to another page
   */
  closeOnRedirect: RefObject<boolean>;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const closeOnRedirect = useRef(true);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useOnChange(pathname, () => {
    if (closeOnRedirect.current) {
      setOpen(false);
    }
    closeOnRedirect.current = true;
  });

  return (
    <SidebarContext.Provider
      value={useMemo(
        () => ({
          open,
          setOpen,
          collapsed,
          setCollapsed,
          closeOnRedirect,
        }),
        [open, collapsed]
      )}
    >
      {children}
    </SidebarContext.Provider>
  );
}
