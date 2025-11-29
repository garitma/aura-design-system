import type { HTMLAttributes, ReactNode } from 'react';
import type { I18nConfig } from 'fumadocs-core/i18n';
import type { NavProviderProps } from 'fumadocs-ui/contexts/layout';
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export interface NavOptions extends NavProviderProps {
  enabled: boolean;
  component: ReactNode;

  title?: ReactNode;

  /**
   * Redirect url of title
   * @defaultValue '/'
   */
  url?: string;

  children?: ReactNode;
}

export interface BaseLayoutProps {
  themeSwitch?: {
    enabled?: boolean;
    component?: ReactNode;
    mode?: 'light-dark' | 'light-dark-system';
  };

  searchToggle?: Partial<{
    enabled: boolean;
    components: Partial<{
      sm: ReactNode;
      lg: ReactNode;
    }>;
  }>;

  /**
   * I18n options
   *
   * @defaultValue false
   */
  i18n?: boolean | I18nConfig;

  /**
   * GitHub url
   */
  githubUrl?: string;

  links?: LinkItemType[];
  /**
   * Replace or disable navbar
   */
  nav?: Partial<NavOptions>;

  children?: ReactNode;
}

interface BaseItem {
  /**
   * Restrict where the item is displayed
   *
   * @defaultValue 'all'
   */
  on?: 'menu' | 'nav' | 'all';
}

export interface BaseLinkType extends BaseItem {
  url: string;
  /**
   * When the item is marked as active
   *
   * @defaultValue 'url'
   */
  active?: 'url' | 'nested-url' | 'none';
  external?: boolean;
}

export interface MainItemType extends BaseLinkType {
  type?: 'main';
  icon?: ReactNode;
  text: ReactNode;
  description?: ReactNode;
}

export interface IconItemType extends BaseLinkType {
  type: 'icon';
  /**
   * `aria-label` of icon button
   */
  label?: string;
  icon: ReactNode;
  text: ReactNode;
  /**
   * @defaultValue true
   */
  secondary?: boolean;
}

export interface ButtonItemType extends BaseLinkType {
  type: 'button';
  icon?: ReactNode;
  text: ReactNode;
  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

export interface MenuItemType extends Partial<BaseLinkType> {
  type: 'menu';
  icon?: ReactNode;
  text: ReactNode;

  items: (
    | (MainItemType & {
      /**
       * Options when displayed on navigation menu
       */
      menu?: HTMLAttributes<HTMLElement> & {
        banner?: ReactNode;
      };
    })
    | CustomItemType
  )[];

  /**
   * @defaultValue false
   */
  secondary?: boolean;
}

export interface CustomItemType extends BaseItem {
  type: 'custom';
  /**
   * @defaultValue false
   */
  secondary?: boolean;
  children: ReactNode;
}

export type LinkItemType =
  | MainItemType
  | IconItemType
  | ButtonItemType
  | MenuItemType
  | CustomItemType;

/**
 * Get Links Items with shortcuts
 */
export function getLinks(
  links: LinkItemType[] = [],
  githubUrl?: string,
): LinkItemType[] {
  let result = links ?? [];

  if (githubUrl)
    result = [
      ...result,
      {
        type: 'icon',
        url: githubUrl,
        text: 'Github',
        label: 'GitHub',
        icon: <GitHubLogoIcon />,
        external: true,
      },
    ];

  return result;
}

export { BaseLinkItem } from '@/components/layout/shared/client';
