import { baseOptions } from "@/lib/layout.shared";
import { HomeLayout } from "@/components/layout/home";
import Footer from "@/components/Footer";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()} themeSwitch={{ enabled: false }}>
      {children}
      <Footer />
    </HomeLayout>
  );
}
