import AuraSection, { SectionProps } from "@aura-design/system/section";

export default function Section({
  className,
  subClassName,
  ...props
}: SectionProps) {
  const classNameConnect: string[] = ["px-2"];

  if (className) {
    classNameConnect.push(className);
  }

  return <AuraSection {...props} className={classNameConnect.join(" ")} />;
}
