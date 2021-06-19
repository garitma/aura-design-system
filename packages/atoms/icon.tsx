import React from "react"

/**
 * Icon component
 */

 export interface ButtonProps {
  sprite?: any;
  className?: any;
}

const Icon: React.FC<ButtonProps> = ({ sprite, className, ...props }) => {
  const classConnect: any = ["icon", sprite, className]

  return <div className={classConnect.join(" ").trim()} {...props}></div>
}



export default Icon
