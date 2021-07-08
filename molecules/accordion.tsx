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
      <div className="aura anchor">
        <span className="h5">{title}</span>
        <div className="pin right top bottom valign">
          <Button mode="link" onClick={() => setIsOpen(!isOpen)}>
            <Icon sprite={isOpen ? "arrowUp" : "arrowDown"} className="t03"/>
          </Button>
        </div>
      </div>
      {isOpen && <ul>{children}</ul>}
    </div>
  );
};

export default Accordion;
