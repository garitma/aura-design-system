import React from "react";
import PropTypes from "prop-types";
import {Icon} from "../.."

/**
 * Icon component
 */

 const Select = ({options, placeholder, dialog, dialogColor, name, label, className, ...props}) => {

    const selectAllClasName = `${className || ""} ${dialog ? dialogColor : ""}`

     return(
         <div className="inputer">
             <div className="inputer-group">
                 <div className="select-group">
                <select name={name} className={selectAllClasName} {...props} >
                    {placeholder && <option defaultValue>{placeholder}</option>}
                    {options.map((option, index) => <option value={option[0]} key={index}>{option[1]}</option>)}
                </select>
                <Icon sprite="arrowDown" className="right action  disable" />
                </div>
                {placeholder && label && <label htmlFor={name} className="pin left top">{placeholder}</label>}
                {dialog &&
                    <span className="dialog disable">{dialog}</span>
                }
            </div>
            
        </div>
     )
 }


 Select.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.bool,
    dialog: PropTypes.string,
    dialogColor: PropTypes.oneOf([
      "blue",
      "green",
      "yellow",
      "orange",
      "pink"
    ]),
  };
  
 

 Select.defaultProps = {
    options: [],
    dialogColor: "yellow",
    label: false,
  };
  

 export default Select