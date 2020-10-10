import React from "react";
import PropTypes from "prop-types";
import {Icon} from "../.."

/**
 * Icon component
 */

 const Select = ({options = [], placeholder, ...props}) => {



     return(
         <div className="inputer">
            <select {...props}>
                {placeholder && <option defaultValue>{placeholder}</option>}
                {options.map((option) => <option value={option[0]}>{option[1]}</option>)}
            </select>
            <Icon sprite="arrowDown" className="right action  disable" />
        </div>
     )
 }

 export default Select