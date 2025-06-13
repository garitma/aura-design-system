import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nprogress from "@/components/Nprogress";

const font = Inter({ subsets: ["latin"] });

const LayoutPancake = ({ children }) => {
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

export default LayoutPancake;
