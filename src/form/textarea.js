import React from 'react'

const Textarea = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <textarea
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        disabled={ props.disabled ? 'disabled' : '' }
        onChange={props.handleChange}
      />
    </div>
  )
}

export default Textarea
