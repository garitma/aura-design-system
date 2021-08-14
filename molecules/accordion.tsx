import { useState } from "react";
import Button from "../atoms/button";
import Icon from "../atoms/icon";
import { SharedBasic, AuraHeadline } from "../types/global";

export interface AccordionProps extends SharedBasic {
  title: string;
  headline: AuraHeadline;
}
const Accordion = ({ title, children, headline = "h6" }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const classNameConnect: string[] = [
    "aura",
    "anchor",
    "lefttxt",
    "b0",
    "fluid",
    "white",
    headline,
  ];

  return (
    <div className="fluid">
      <button
        className={classNameConnect.join(" ").trim()}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={headline}>{title}</span>
        <div className="pin right top bottom valign">
          <span className="button-link">
            <Icon sprite={isOpen ? "arrowUp" : "arrowDown"} className="t03" />
          </span>
        </div>
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
