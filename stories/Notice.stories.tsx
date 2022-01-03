import React, { useContext } from "react";

import { Story, Meta } from "@storybook/react";

import Modal, { ModalProps } from "../molecules/modal";
import Button from "../atoms/button";

import { NoticeContext } from "../utils/use-notice";

export default {
  title: "Molecule/Modal",
  component: Modal,
  argTypes: {},
} as Meta;

const Template: Story<ModalProps> = (args) => {
  const notice = useContext(NoticeContext);
  return (
    <Button
      onClick={() => console.log(notice)}
      label="tricker toast"
    />
  );
};

export const defaultToast = Template.bind({});
