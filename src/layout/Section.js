import React from "react";
import PropTypes from "prop-types";

/**
 * Wrap
 */

 const Section = ({children, className, subClassName, color, space, container, ...props}) => {

    const classConnect = [className, space]
    const subClassConnect = [subClassName, container]

    if(color) {classConnect.push(color)}

     return (
         <section className={classConnect.join(' ')} {...props}>
             <div className={subClassConnect}>
                {children}
             </div>
         </section>
     )
 }
 Section.propTypes = {
     subClassName: PropTypes.string,
     space: PropTypes.oneOf(["pad", "inside-pad", "aura", "wall-pad"]),
     container: PropTypes.oneOf(["smash", "smesh", "smish", "smosh", "smush"])
 }

 Section.defaultProps = {
    space: "pad",
    container: "smush"
 }

 export default Section