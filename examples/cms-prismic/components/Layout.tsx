import React from "react";
import Router from "next/router";
import { Inter } from "next/font/google";
import NProgress from "nprogress";
import * as prismic from "@prismicio/client";

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
  menu: prismic.Content.NavigationDocument;
  footer: prismic.Content.FooterDocument
};

const Layout = ({ children, menu, footer, seo }: LayoutProps) => (
  <main className={inter.className}>
    <div className="page-pancake">
      <Meta {...seo} />
      <Header menu={menu} />
      <div>{children}</div>
      <Footer footer={footer}/>
    </div>
  </main>
);

export default Layout;
