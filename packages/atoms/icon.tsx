import React from "react"

/**
 * Icon component
 */


type Props = {
  sprite?: string;
  className?: string;
}

const Icon = ({ sprite, className, ...props }: Props) => {
  const classConnect: string[] = ["icon", sprite!, className!]

  return <div className={classConnect.join(" ").trim()} {...props}></div>
}



export default Icon
