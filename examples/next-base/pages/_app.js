import Router from "next/router";
import "aura-design/style.css";
import "../public/style.css";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
