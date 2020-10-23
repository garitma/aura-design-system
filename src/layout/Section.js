import React from "react";
import PropTypes from "prop-types";

/**
 * Wrap
 */

const Section = ({
  children,
  className,
  subClassName,
  color,
  space,
  container,
  style,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  backgroundRepeat,
  ...props
}) => {
  const classConnect = [className, space];
  const subClassConnect = [subClassName, container];
  const styleConnect = [style]

  if (color) {
    classConnect.push(color);
  }

  if(backgroundImage) {
    styleConnect.push(`backgroundImage: ${backgroundImage}`)
  }
  if(backgroundPosition) {
    styleConnect.push(`backgroundPosition: ${backgroundPosition}`)
  }
  if(backgroundSize) {
    styleConnect.push(`backgroundSize: ${backgroundSize}`)
  }
  if(backgroundRepeat) {
    styleConnect.push(`backgroundRepeat: ${backgroundRepeat}`)
  }

  return (
    <section className={classConnect.join(" ").trim()} style={{styleConnect}} {...props}>
      <div className={subClassConnect.join(" ").trim()}>{children}</div>
    </section>
  );
};
Section.propTypes = {
  subClassName: PropTypes.string,
  space: PropTypes.oneOf(["pad", "inside-pad", "aura", "wall-pad"]),
  container: PropTypes.oneOf(["smash", "smesh", "smish", "smosh", "smush"])
};

Section.defaultProps = {
  space: "pad",
  container: "smush"
};

export default Section;
