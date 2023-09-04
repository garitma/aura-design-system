import React from "react";
import { Drawer } from "vaul";

import Button from "../../components/button";
import Section from "../../components/section";

export const Default = () => {
  return (
    <div className="relative">
      <p>
        
        <span className="info info-text wall-pad">External library <span className="font-bold">$ pnpm i vaul</span></span> Drawer
        component for React.{" "}
        <a
          href="https://vaul.emilkowal.ski/"
          className="underline"
          target="_blank"
        >
          All documentaiton
        </a>{" "}
        made by{" "}
        <a href="https://emilkowal.ski/" className="underline" target="_blank">
          Emil Kowalski
        </a>
        .
      </p>
      <p></p>
      <div>
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <Button>Open Drawer</Button>
          </Drawer.Trigger>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Portal>
            <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
              <Section passDiv container="smash">
                <div>
                  <h2>Drawer for React.</h2>
                  <p>
                    This component can be used as a Dialog replacement on mobile
                    and tablet devices.
                  </p>
                  <p>
                    It comes unstyled, has gesture-driven animations, and is
                    made by{" "}
                    <a
                      href="https://emilkowal.ski/"
                      className="underline"
                      target="_blank"
                    >
                      Emil Kowalski
                    </a>
                    .
                  </p>
                  <p>
                    It uses{" "}
                    <a
                      href="https://www.radix-ui.com/docs/primitives/components/dialog"
                      className="underline"
                      target="_blank"
                    >
                      Radix's Dialog primitive
                    </a>{" "}
                    under the hood and is inspired by{" "}
                    <a
                      href="https://twitter.com/devongovett/status/1674470185783402496"
                      className="underline"
                      target="_blank"
                    >
                      this tweet.
                    </a>
                  </p>
                </div>
              </Section>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
};
