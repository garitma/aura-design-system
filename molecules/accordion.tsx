import { useState } from "react";
import Button from "../atoms/button";
import Icon from "../atoms/Icon";
import { SharedBasic } from "../types/global";

export interface AccordionProps extends SharedBasic {
    title: string
}
const Accordion = ({ title, children } : AccordionProps)  => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="aura anchor" onClick={() => setIsOpen(!isOpen)}>
        <span className="h5">{title}</span>
        <div className="pin right top bottom valign">
          <Button mode="link" onClick={() => setIsOpen(!isOpen)}>
            <Icon sprite={isOpen ? "arrowUp" : "arrowDown"} className="t03"/>
          </Button>
        </div>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Accordion;
