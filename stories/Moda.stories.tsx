import React, { useState } from "react";

import { Story, Meta } from "@storybook/react";

import Modal, { ModalProps } from "../molecules/modal";
import Button from "../atoms/button";
import WithIcons from "../hoc/WithIcons.js";

export default {
  title: "Molecule/Modal",
  component: Modal,
  argTypes: {},
} as Meta;

const Template: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WithIcons>
      <Button onClick={() => setIsOpen(true)} label="Open modal" />
      <Modal {...args} isVisible={isOpen} onClose={() => setIsOpen(false)}>
        Hay un costo de vida que debemos pagar. Una escena viva, te leo en
        imágenes y te veo en letras algo así parecido a la distancia.
      </Modal>
    </WithIcons>
  );
};

export const defaultConfig = Template.bind({});

defaultConfig.args = {
  title: "Default Config",
  acceptText: "Accept Text",
  declineText: "Decline Text",
};

export const withCTAValidation = Template.bind({});

withCTAValidation.args = {
  title: "Default Config",
  acceptText: "Accept Text",
  declineText: "Decline Text",
  isValid: false,
};

export const withOutCTA = Template.bind({});

withOutCTA.args = {
  title: "Default Config",
  isCTA: false,
};
