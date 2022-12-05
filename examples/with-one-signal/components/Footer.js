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
      notifyButton: {
        enable: false,
      },
      allowLocalhostAsSecureOrigin: true,
      // Your other init options here
      promptOptions: {
        customlink: {
          enabled: true /* Required to use the Custom Link */,
          style: "button" /* Has value of 'button' or 'link' */,
          size: "medium" /* One of 'small', 'medium', or 'large' */,
          color: {
            button:
              "var(--aura-accents-10)" /* Color of the button background if style = "button" */,
            text: "#FFFFFF" /* Color of the prompt's text */,
          },
          text: {
            subscribe:
              "Subscribe to push notifications" /* Prompt's text when not subscribed */,
            unsubscribe:
              "Unsubscribe from push notifications" /* Prompt's text when subscribed */,
            explanation:
              "Get updates from all sorts of things that matter to you" /* Optional text appearing before the prompt button */,
          },
          unsubscribeEnabled: true /* Controls whether the prompt is visible after subscription */,
        },
      },
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
