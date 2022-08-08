import React, { useEffect, useLayoutEffect } from "react";
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

const Layout = ({ children, preview, data, text, seo }) => {
  return (
    <main>
      <div className="page">
        <Meta {...seo} />
        <Header preview={preview} doc={data} text={text} />
        <div className="page-body">{children}</div>
        <Footer doc={data} />
      </div>
    </main>
  );
};

export default Layout;
