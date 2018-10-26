import React from 'react'

const Input = (props) => {
  return (
    <div className="form-group">
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        disabled={ props.disabled ? 'disabled' : '' }
        onChange={props.handleChange}
      />
        <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
          {props.title}
        </label>
      {props.message && <p className="subscript">{props.message}</p>}
    </div>
  )
}

export default Input
