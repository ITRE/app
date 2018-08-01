import React from 'react'

const Select = (props) => {
  return(
    <div className="form-group">
      <label htmlFor={props.name} className="form-label"> {props.title} </label>
      <select
        name={props.name}
        value={props.value}
        disabled={ props.disabled ? 'disabled' : '' }
        onChange={props.handleChange}
        >
        <option value="" disabled>{props.placeholder}</option>
        {props.options.map(option => {
          return (
            <option
              key={option}
              value={option}
              label={option}>{option}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default Select
