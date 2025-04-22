import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Nprogress from "@/components/n-progress";

const font = Inter({ subsets: ["latin"] });

const PancakeLayout = ({ children }) => {
  return (
    <main className={font.className}>
      <div className="page-pancake">
        <Header />
        <div>{children}</div>
        <Footer />
        <Nprogress />
      </div>
    </main>
  );
};

export default PancakeLayout;
