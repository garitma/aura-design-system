import React, {useEffect} from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

import useAuth from "@hooks/useAuth";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Meta from "@components/Meta";
import Loading from "@components/Loading";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const Layout = ({ children, text, seo }) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.user) router.push("/login");
  }, [auth?.isLoading]);

  if (!auth?.user) {
    return <Loading />;
  }

  return (
    <main>
      <div className="page">
        <Meta {...seo} />
        <Header text={text} />
        <div className="page-body">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
