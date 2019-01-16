import React from 'react'

const Date = (props) => {
  return (
    <div className="form-group">
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type="date"
        value={props.value}
        disabled={ props.disabled ? 'disabled' : '' }
        onChange={props.handleChange}
      />
      <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
        {props.title}
        {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
      </label>
    </div>
  )
}

export default Date
