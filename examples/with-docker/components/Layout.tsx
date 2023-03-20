import React from "react";
import Router from "next/router";
import NProgress from "nprogress";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import type { MetaProps } from "@/components/Meta";

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
  text?: string;
  seo?: MetaProps;
};

const Layout = ({ children, text, seo }: LayoutProps) => (
  <main>
    <div className="page">
      <Meta {...seo} />
      <Header text={text} />
      <div className="page-body">{children}</div>
      <Footer />
    </div>
  </main>
);

export default Layout;
