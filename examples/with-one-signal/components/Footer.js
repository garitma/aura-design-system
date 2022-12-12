import { useEffect, useState } from "react";
import Section from "aura-design/section";
import OneSignal from "react-onesignal";

import {
  NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
  NEXT_PUBLIC_ONE_SIGNAL_SAFARI_WEB_ID,
} from "@utils/constants";

const Footer = () => {
  useEffect(() => {
    OneSignal.init({
      appId: NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
      safari_web_id: NEXT_PUBLIC_ONE_SIGNAL_SAFARI_WEB_ID,
    }).then(() => {});
  }, []);

  return (
    <footer>
      <Section className="center-text">
        <div className="onesignal-customlink-container center-text"></div>
        <p className="centertxt">
          Powered by{" "}
          <a href="https://auradesigsystem.com" className="uline">
            Aura Design System
          </a>{" "}
          brought to you by{" "}
          <a href="https://garitma.com" className="uline">
            Garitma
          </a>
          .
        </p>
      </Section>
    </footer>
  );
};

export default Footer;
