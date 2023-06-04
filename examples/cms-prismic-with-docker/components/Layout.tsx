import React from "react";
import Router from "next/router";
import { Inter } from "next/font/google";
import NProgress from "nprogress";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import type { MetaProps } from "@/components/Meta";

const inter = Inter({ subsets: ["latin"] });

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

type LayoutProps = {
  children: React.ReactNode;
  seo?: MetaProps;
};

const Layout = ({ children, seo }: LayoutProps) => (
  <main className={inter.className}>
    <div className="page-pancake">
      <Meta {...seo} />
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  </main>
);

export default Layout;
