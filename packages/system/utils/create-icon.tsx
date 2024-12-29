import { Children } from "react";
import Icon from "../components/icon";

interface CreateIconOptions {
  viewBox?: string;
  path?: React.ReactElement | React.ReactElement[];
  displayName?: string;
}

export function createIcon(options: CreateIconOptions) {
  const { viewBox = "0 0 24 24", displayName } = options;

  const path = Children.toArray(options.path);

  const Comp = ({ ...props }) => (
    <Icon viewBox={viewBox} {...props} displayName={displayName}>
      {path.length ? path : <path fill="currentColor" />}
    </Icon>
  );

  return Comp;
}
