import type { HTMLAttributes, ReactNode } from 'react';
import type { I18nConfig } from 'fumadocs-core/i18n';
import type { NavProviderProps } from '@/components/layout/contexts/layout';
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export interface NavOptions extends NavProviderProps {
  enabled: boolean;
  component: ReactNode;

  title?: ReactNode;

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

  i18n?: boolean | I18nConfig;

  githubUrl?: string;

  links?: LinkItemType[];
  nav?: Partial<NavOptions>;

  children?: ReactNode;
}

interface BaseItem {
  on?: 'menu' | 'nav' | 'all';
}

export interface BaseLinkType extends BaseItem {
  url: string;
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
  label?: string;
  icon: ReactNode;
  text: ReactNode;
  secondary?: boolean;
}

export interface ButtonItemType extends BaseLinkType {
  type: 'button';
  icon?: ReactNode;
  text: ReactNode;
  secondary?: boolean;
}

export interface MenuItemType extends Partial<BaseLinkType> {
  type: 'menu';
  icon?: ReactNode;
  text: ReactNode;

  items: (
    | (MainItemType & {
      menu?: HTMLAttributes<HTMLElement> & {
        banner?: ReactNode;
      };
    })
    | CustomItemType
  )[];

  secondary?: boolean;
}

export interface CustomItemType extends BaseItem {
  type: 'custom';
  secondary?: boolean;
  children: ReactNode;
}

export type LinkItemType =
  | MainItemType
  | IconItemType
  | ButtonItemType
  | MenuItemType
  | CustomItemType;

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
        icon: <GitHubLogoIcon className="icon" />,
        external: true,
      },
    ];

  return result;
}

export { BaseLinkItem } from '@/components/layout/shared/client';

