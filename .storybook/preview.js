import "../style.css";
import { addDecorator } from "@storybook/react";

import WithIcons from "../hoc/with-icons";
import { NoticeContexProvider } from "../utils/use-notice";

const StorybookWrapper = (storyFn) => (
  <NoticeContexProvider>
    <WithIcons>{storyFn()}</WithIcons>
  </NoticeContexProvider>
);
addDecorator(StorybookWrapper);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "padded",
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};
