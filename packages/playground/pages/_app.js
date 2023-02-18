import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import "@aura-design/styles/main.css";

//import "../../styles/main.css"; only for dev :b
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    Fathom.load(`USKQGVIM`, {
      includedDomains: ["play.auradesignsystem.com"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
