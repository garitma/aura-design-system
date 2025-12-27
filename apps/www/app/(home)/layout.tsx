import { baseOptions } from "@/utils/layout.shared";
import { HomeLayout } from "@/components/layout/home";
import Footer from "@/components/Footer";
import { source } from "@/utils/source";

import { ThemeColorSwitcher } from "@/components/ThemeColorSwitcher";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      tree={source.pageTree}
      themeSwitch={{
        enabled: true,
        component: <ThemeColorSwitcher />,
      }}
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
