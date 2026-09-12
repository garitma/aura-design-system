"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Aura docs i18n labels — keeps the Fumadocs UI 15 `I18nLabel` / `text` API
 * used by the customized layout after Fumadocs UI 16 simplified i18n context.
 */
export interface Translations {
  search: string;
  searchNoResult: string;
  toc: string;
  tocNoHeadings: string;
  lastUpdate: string;
  chooseLanguage: string;
  nextPage: string;
  previousPage: string;
  chooseTheme: string;
  editOnGithub: string;
}

export const defaultTranslations: Translations = {
  search: "Search",
  searchNoResult: "No results found",
  toc: "On this page",
  tocNoHeadings: "No Headings",
  lastUpdate: "Last updated on",
  chooseLanguage: "Choose a language",
  nextPage: "Next Page",
  previousPage: "Previous Page",
  chooseTheme: "Theme",
  editOnGithub: "Edit on GitHub",
};

interface DocsI18nContextType {
  text: Translations;
}

const DocsI18nContext = createContext<DocsI18nContextType>({
  text: defaultTranslations,
});

export function DocsI18nProvider({
  children,
  translations,
}: {
  children: ReactNode;
  translations?: Partial<Translations>;
}) {
  return (
    <DocsI18nContext.Provider
      value={{
        text: { ...defaultTranslations, ...translations },
      }}
    >
      {children}
    </DocsI18nContext.Provider>
  );
}

export function useDocsI18n() {
  return useContext(DocsI18nContext);
}

export function I18nLabel(props: { label: keyof Translations }) {
  const { text } = useDocsI18n();
  return text[props.label];
}
