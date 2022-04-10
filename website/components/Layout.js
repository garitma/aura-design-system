import React, { useEffect, useLayoutEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import WithMotionObserver from "aura-design/motion"

import Header from "@components/Header";
import Footer from "@components/Footer";
import { formatMeta, formatMetaArchives } from "@utils/formatMeta";

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
  data,
  text,
  meta,
  path,
  excerpt,
  isArchive,
}) => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      const motions = document.querySelectorAll("[class*='motion']");
   
      const observer = new window.IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          entries[0].target.classList.add("mounted");
        } else {
          entries[0].target.classList.remove("mounted");
        }
      });
      motions.forEach((element) => observer.observe(element));
    }
  });

  return (
    <main>
      {isArchive
        ? formatMetaArchives(meta, path, text, excerpt)
        : formatMeta(meta)}
      <div className="page">
        <Header preview={preview} doc={data} text={text} />
        <div className="page-body">{children}</div>
        <Footer doc={data} />
      </div>
    </main>
  );
};

export default Layout;
