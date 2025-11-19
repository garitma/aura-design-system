import { baseOptions } from "@/utils/layout.shared";
import { source } from "@/utils/source";
import { DocsLayout } from "@/components/layout/docs";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
