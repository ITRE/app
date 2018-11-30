import React from 'react'

const Checkbox = (props) => {
  if (props.buttons) {
    return(
      <div className="checkboxes">
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
          {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
        </label>
        <div className="checkbuttons">
          {props.options.map(option => {
            return (
              <label key={option} className="blue checkbox">
                <input
                  className="form-checkbox"
                  id= {props.name}
                  name={props.name}
                  onChange={props.handleChange}
                  value={option}
                  disabled={ props.disabled ? 'disabled' : '' }
                  checked={ props.selectedOptions.indexOf(option) !== -1 }
                  type="checkbox" />
                {option}
                <span className="checkmark"></span>
              </label>
            );
          })}
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
          {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
        </label>
        <div className="checkbox-group">
          {props.options.map(option => {
            return (
              <label key={option} className="blue checkbox">
                <input
                  className="form-checkbox"
                  id= {props.name}
                  name={props.name}
                  onChange={props.handleChange}
                  value={option}
                  disabled={ props.disabled ? 'disabled' : '' }
                  checked={ props.selectedOptions.indexOf(option) !== -1 }
                  type="checkbox" />
                {option}
                <span className="checkmark"></span>
              </label>
            );
          })}
        </div>
      </div>
    )
  }
}

export default Checkbox
