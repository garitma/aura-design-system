import React from "react";
import PropTypes from "prop-types";

import { Buttom } from ".."

/**
 * Menu
 */

 const Menu = ({container, className, menu, ...props}) => {

    const classConnect = [className]

    if(container) {
        classConnect.push(container)
    }

    return (
        <div className={classConnect.join(" ").trim()} {...props}>
            <ul className="nav-list fluid">
                {menu.map(
                    (item, index) => {
                        <li key={index}>
                            <Buttom 
                                label={item.text}
                                href={item.href}
                                as={item.as}
                                target={item.target} 
                                mode="menu" 
                                link 
                            />
                        </li>
                    }
                )}
            </ul>
        </div>
 )}

 Menu.defaultProps = {
    menu: [
        {
            text: "example",
            href: "/",
            as: "/",
            target: "",
        }
    ]
 }

 export default Menu