import Router from "next/router";
import "aura-design/style.css";
import WithMotionObserver from "aura-design/motion";

import "../public/style.css";
import "../public/aura.css";

import * as gtag from "@utils/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }) {
  return (
    <WithMotionObserver>
      <Component {...pageProps} />
    </WithMotionObserver>
  );
}

export default MyApp;
