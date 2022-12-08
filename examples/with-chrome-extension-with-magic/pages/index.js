import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Section from "aura-design/section";
import Button from "aura-design/button";
import Input from "aura-design/input";
import Icon from "aura-design/icon";
import { useForm, useStatus, useFormIsValid } from "aura-design/form";

import { authLoginSchema } from "@utils/validation-schema";
import { magic } from "@utils/magic-client";

const SignIn = () => {
  const status = useStatus();
  const [isFullPage, setIsFullPage] = useState(false);
  const [isNotice, setIsNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userMetadata, setUserMetadata] = useState();

  /* Relying on the page width to tell if the user is viewing in the popup or full page */
  useEffect(() => {
    if (window.innerWidth > 400) setIsFullPage(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    magic.user
      .isLoggedIn()
      .then((magicIsLoggedIn) => {
        if (magicIsLoggedIn) {
          magic.user.getMetadata().then(setUserMetadata);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (userMetadata) {
      setIsLoading(false);
    }
  }, [userMetadata]);

  const { email } = useForm({
    email: "",
  });

  const isValid = useFormIsValid({ email }, authLoginSchema);

  const handleOnLogOut = useCallback(() => {
    magic.user.logout().then(() => {
      setUserMetadata(null);
    });
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    status.setIsWaiting(true);

    try {
      const res = await magic.auth.loginWithMagicLink({ email: email.value });
      setIsNotice(true);
    } catch (error) {
      console.log(error);
      status.setIsWaiting(false);
      status.setIsError(true);
      status.setMessage("An error occurred while authenticating.");
    }
  };

  if (isLoading) return <Section>Loading...</Section>;

  if (userMetadata) {
    return (
      <Section className="center-text">
        <h1 className="mb0 mt0  ">Hello, {userMetadata.email}</h1>
        <div className="pad">
          <Button onClick={handleOnLogOut} mode="pill">
            Log Out <Icon sprite="poweroff" />
          </Button>
        </div>
      </Section>
    );
  }

  if (!isFullPage) {
    return (
      <Section>
        <h1 className="mt0">Please login to use this extensión.</h1>
        <Button
          onClick={() => chrome.tabs.create({ url: "index.html" })}
        >
          Sign In
        </Button>
      </Section>
    );
  }

  if (isNotice) {
    return (
      <Section className="anchor flow-cancel">
        <div className="aureole one valign" style={{ minHeight: "85vh" }}>
          <div className="center-text">
            <h1 className="mb0 mt0">You are logged In</h1>
            <p className="h6">
              <b>You can close this tab and use the extension.</b>
            </p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="anchor flow-cancel">
      <div className="aureole two valign" style={{ minHeight: "85vh" }}>
        <div className="one valign">
          <div className="smosh">
            <div className="inputer">
              <h1 className="mb0 mt0">Sign in to Aura Magic Link</h1>
              <p className="h6">
                <b>Enter your email below</b>
              </p>
            </div>
            <form onSubmit={handleOnSubmit}>
              <div className="aureole one">
                <Input placeholder="email" {...email.input} isLabelable />
                <div className="inputer">
                  <Button
                    className="green-with-white"
                    isFluid
                    isDisabled={!isValid}
                    isWaiting={status.state.isWaiting}
                    waitingText="Loading..."
                    label="Iniciar sesión"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="two anchor halo smash">
          <div className="anchor">
            <div className="spin anchor"></div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SignIn;
