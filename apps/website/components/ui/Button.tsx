import AuraButton, {
  ButtonProps as AuraButtonProps,
} from "@aura-design/system/button";

export interface ButtonProps extends AuraButtonProps {
  size?: "small" | "default";
}

export default function Button({ size = "default", ...props }: ButtonProps) {
  const classNameConnect: string[] = [];

  if (size === "small") {
    classNameConnect.push("p-1 h-3");
  }

  return <AuraButton {...props} className={classNameConnect.join(" ")} />;
}
