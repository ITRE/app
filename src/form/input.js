import React from 'react'

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
        {props.title}
        {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
      </label>
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        disabled={ props.disabled ? 'disabled' : '' }
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input
