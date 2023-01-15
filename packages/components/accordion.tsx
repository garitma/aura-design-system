import { ChevronDownIcon } from "../icons";
import { SharedBasic, AuraHeadline, AuraColors } from "../types/global";

export interface AccordionProps extends SharedBasic {
  title?: string;
  headerSize?: AuraHeadline;
  color?: AuraColors;
}

const Accordion = ({
  title,
  children,
  headerSize = "h6",
  color,
}: AccordionProps) => {
  const classNameConnect: string[] = [
    "aura",
    "anchor",
    "lefttxt",
    "b0",
    "fluid",
    "pointer",
    headerSize,
  ];

  if (color) {
    classNameConnect.push(color);
  }

  return (
    <details>
      <summary className={classNameConnect.join(" ").trim()}>
        {title}
        <div className="dropdown disable notevent">
          <ChevronDownIcon
            className="icon"
            role="presentation"
            focusable="false"
          />
        </div>
      </summary>
      {children}
    </details>
  );
};

export default Accordion;
