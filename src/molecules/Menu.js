import React from "react";
import PropTypes from "prop-types";

import { Buttom } from ".."

/**
 * Menu
 */

 const Menu = ({childre, container, className, menu, ...props}) => {

    const classConnect = [className]

    if(container) {
        classConnect.push(container)
    }

    return (
        <div className={classConnect.join(" ").trim()} {...props}>
            <ul className="nav-list fluid">
                {childre}
            </ul>
        </div>
 )}


 export default Menu