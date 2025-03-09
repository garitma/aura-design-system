import { JSX } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

export function getDisplayName(node: any) {
  if (!node) return "Unknown";

  if (node.props["data-display-name"]) {
    return node.props["data-display-name"];
  }

  if (typeof node.type === "string") {
    return node.type;
  }
  return "Unknown";
}

export const generateComponentCode = (Component: () => JSX.Element, {name, importString}: {name: string, importString: string}) => {
  const componentString = reactElementToJSXString(Component(), {
    displayName(element) {
      return getDisplayName(element);
    },
    filterProps: ["data-display-name"],
    maxInlineAttributesLineLength: 100,
    sortProps: false
  }).replace(/\n/g, "\n    ");

return `${importString}

const ${name} = () => {
  return (
    ${componentString}
  );
};

export default ${name};`;
};
