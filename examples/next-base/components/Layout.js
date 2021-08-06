import React from "react";
import Router from "next/router";
import NProgress from "nprogress";

import Header from "@components/Header";
import Footer from "@components/Footer";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const Layout = ({
  children,
  preview,

  text,
}) => (
  <main>
    <div className="page">
      <Header preview={preview} text={text} />
      <div className="page-body">{children}</div>
      <Footer />
    </div>
  </main>
);

export default Layout;
