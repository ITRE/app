import React from 'react'

const Select = (props) => {
  if (props.options.length < 6) {
    return(
      <div className="select">
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
          {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
        </label>
        <div className="low-select" id={props.name}>
          {props.options.map(option => {
            return (
              <div className="selectButtons" key={option}>
                <input
                  className="selectInput"
                  type='radio'
                  value={option}
                  onChange={props.handleChange}
                  name={props.name}
                  defaultChecked={props.value===option}
                  id={option}/>
                <label className="selectLabel" htmlFor={option}>{option}</label>
              </div>
            );
          })}
        </div>
      </div>
    )
  } else {
    return(
      <div className="select">
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
          {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
        </label>
        <select
          name={props.name}
          value={props.value}
					className="selectBox"
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
}

export default Select
