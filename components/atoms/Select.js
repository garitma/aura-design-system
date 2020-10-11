import React, {useState} from "react";
import PropTypes from "prop-types";

import { Icon } from "../.."

/**
 * Select component
 */

 const Select = ({options, placeholder, dialog, dialogColor, name, label, className, ...props}) => {

    const [labelInit, setLabelInit] = useState(false)
    const selectAllClasName = `${className || ""} ${dialog ? dialogColor : ""}`

     return(
         <div className="inputer">
             <div className="inputer-group select-group">
                 <div className="halo">
                    <select name={name} className={selectAllClasName} onClick={() => setLabelInit(true)} {...props} >
                        {placeholder && !labelInit ? <option defaultValue>{placeholder}</option> : <option disabled>{placeholder}</option>}
                        {options.map((option, index) => <option value={option[0]} key={index}>{option[1]}</option>)}
                    </select>
                    <Icon sprite="arrowDown" className="right action  disable" />
                </div>
                {placeholder && label && labelInit && <label htmlFor={name} >{placeholder}</label>}
                {dialog &&
                    <span className="dialog disable">{dialog}</span>
                }
            </div>
        </div>
     )
 }

 Select.prototype = {
     option: PropTypes.array,
     dialog: PropTypes.string,
     label: PropTypes.bool,
     placeholder: PropTypes.string,
     dialogColor: PropTypes.oneOf([
        "blue",
        "green",
        "yellow",
        "orange",
        "pink"
    ]),
 }

  
Select.defaultProps = {
    options: [],
    dialogColor: "yellow",
    label: true
};
  

 export default Select