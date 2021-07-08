import { useState } from "react";
import Button from "../atoms/button";
import Icon from "../atoms/icon";
import { SharedBasic, AuraHeadline } from "../types/global";

export interface AccordionProps extends SharedBasic {
    title: string
    headline: AuraHeadline
}
const Accordion = ({ title, children, headline = "h6" } : AccordionProps)  => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="aura anchor" onClick={() => setIsOpen(!isOpen)}>
        <span className={headline}>{title}</span>
        <div className="pin right top bottom valign">
          <Button mode="link" onClick={() => setIsOpen(!isOpen)}>
            <Icon sprite={isOpen ? "arrowUp" : "arrowDown"} className="t03"/>
          </Button>
        </div>
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
