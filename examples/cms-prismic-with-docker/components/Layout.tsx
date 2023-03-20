import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { MetaProps } from "@/components/Meta";
import type { MenuProps } from "@/components/Header";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";

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
  menu: {data: MenuProps}
};

const Layout = ({ children, seo, menu }: LayoutProps) => (
  <div className="page-pancake">
    <Meta {...seo} />
    <Header menu={menu} />
    <div>{children}</div>
    <Footer />
  </div>
);

export default Layout;
