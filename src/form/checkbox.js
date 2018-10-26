import React from 'react'

const Checkbox = (props) => {
  if (props.buttons) {
    return(
      <div className="checkbuttons">
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
          {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
        </label>
          {props.options.map(option => {
            return (
              <div className="checkbutton-group" key={option}>
                <input
                  className="form-checkbox"
                  id= {option}
                  name={props.name}
                  onChange={props.handleChange}
                  value={option}
                  disabled={ props.disabled ? 'disabled' : '' }
                  checked={ props.selectedOptions.indexOf(option) !== -1 }
                  type="checkbox" />
                <label htmlFor={option} className="checkbutton-label">{option}</label>
              </div>
            );
          })}
      </div>
    )
  } else {
    return(
      <div className="">
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
          {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
        </label>
        <div className="checkbox-group">
          {props.options.map(option => {
            return (
              <label key={option}>
                <input
                  className="form-checkbox"
                  id = {props.name}
                  name={props.name}
                  onChange={props.handleChange}
                  value={option}
                  disabled={ props.disabled ? 'disabled' : '' }
                  checked={ props.selectedOptions.indexOf(option) !== -1 }
                  type="checkbox" /> {option}
              </label>
            );
          })}
        </div>
      </div>
    )
  }
}

export default Checkbox
