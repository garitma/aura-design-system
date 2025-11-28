import { baseOptions } from "@/utils/layout.shared";
import { source } from "@/utils/source";
import { DocsLayout } from "@/components/layout/docs";

import { ThemeColorSwitcher } from "@/components/ThemeColorSwitcher";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      themeSwitch={{
        enabled: true,
        component: <ThemeColorSwitcher />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
