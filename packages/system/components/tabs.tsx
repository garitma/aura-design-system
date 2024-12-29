import { useState } from "react";
import { SharedBasic } from "../types/global";

import Button, { ButtonProps } from "./button";


export interface TabsProps extends SharedBasic {
  data: ButtonProps[];
  classNameWrapper?: string;
  classNameNav?: string;
  classNameContainer?: string;
}

const Tabs = ({
  children,
  data,
  className,
  classNameWrapper,
  classNameNav,
  classNameContainer,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Ensure children is an array
  const childArray = Array.isArray(children) ? children : [children];

  // Creating an array of CSS classes to be applied to the tabs element container
  const classNameConnect: string[] = [className!, "nav-list", "start"];

  return (
    <div className={classNameWrapper}>
      <nav className={classNameNav}>
        <ul className={classNameConnect.join(" ").trim()}>
          {data.map((item, index) => (
            <li key={index}>
              <Button
                mode="link"
                className={index === activeTab ? "active" : ""}
                onClick={() => setActiveTab(index)}
                {...item}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className={classNameContainer}>{childArray[activeTab]}</div>
    </div>
  );
};

export default Tabs;
