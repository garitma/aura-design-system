import Head from "next/head";
import Link from "next/link";
import Section from "aura-design/section";
import Button from "aura-design/button";
import Input from "aura-design/input";
import Script from "next/script";
import { useForm, useStatus, useFormIsValid } from "aura-design/form";
import { useRouter } from "next/router";

import { authLoginSchema } from "@utils/validation-schema";
import { authWithEmail } from "@utils/magic-client";

const SignIn = () => {
  const status = useStatus();
  const router = useRouter();

  const { email } = useForm({
    email: "",
  });

  const isValid = useFormIsValid({ email }, authLoginSchema);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    status.setIsWaiting(true);

    try {
      const res = await authWithEmail(email.value);
      if (res.ok) {
        status.setIsWaiting(false);
        window.location.href = "/";
        return;
      } else {
        status.setIsWaiting(false);
        status.setIsError(true);
        status.setMessage("An error occurred while authenticating.");
      }
    } catch (error) {
      status.setIsWaiting(false);
      status.setIsError(true);
      status.setMessage("An error occurred while authenticating.");
    }
  };

  return (
    <Section className="anchor pad-divisor flow-cancel">
      <Head>
        <title>Sign In - Aura Magic Link</title>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                if (document.cookie && document.cookie.includes('authed')) {
                  window.location.href = "/"
                }
            `,
          }}
        />
      </Head>
      <div className="aureole two valign" style={{ minHeight: "85vh" }}>
        <div className="one valign">
          <div className="smosh">
            <div className="inputer">
              <h1 className="mb0 mt0 fadeInUp a03">
                Sign in to Aura Magic Link
              </h1>
              <p className="h6 fadeInUp a06">
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
