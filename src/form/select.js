import React from 'react'

const Select = (props) => {
  if (props.options.length < 6) {

    return(
      <div className={"select " + (props.error ? 'error' : '')}>
        <label className="form-label">
          {props.title}
        </label>
        <div className="low-select" id={'select_'+props.name}>
          {props.options.map(option => {
            return (
              <div className="selectButtons" key={option}>
                <input
                  className="selectInput"
                  type='radio'
                  value={option}
                  onChange={props.handleChange}
                  name={props.name}
                  checked={props.value===option}
                  id={'radio_'+option}
                />
                <label className="selectLabel" htmlFor={'radio_'+option}>{option}</label>
              </div>
            );
          })}
        </div>
        {props.error &&
          <span>{props.error}</span>
        }
      </div>
    )
  } else {
    return(
      <div className={"select " + (props.error ? 'error' : '')}>
        <label htmlFor={props.name} className="form-label">
          {props.title}
        </label>
        <select
          name={props.name}
          value={props.value || ''}
					className="selectBox"
          disabled={ props.disabled ? 'disabled' : '' }
          onChange={props.handleChange}
          >
          <option disabled={true} value=''>{props.placeholder}</option>
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
        {props.error &&
          <span>{props.error}</span>
        }
      </div>
    )
  }
}

export default Select
