import React from "react";
import Router from "next/router";
import NProgress from "nprogress";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Meta from "@components/Meta";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const Layout = ({ children, text, seo, menu }) => (
    <div className="page-pancake">
      <Meta {...seo} />
      <Header text={text} menu={menu}/> 
      <div>{children}</div>
       <Footer/> 
    </div>
);

export default Layout;
