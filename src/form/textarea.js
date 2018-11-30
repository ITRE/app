import React from 'react'

const Textarea = (props) => {
  return (
    <div className="textarea">
      <label htmlFor={props.name} style={props.error ? {color:'red'} : {}} className="form-label">
        {props.title}
        {props.message && <span style={{fontSize: '12px'}}><br />{props.message}</span>}
      </label>
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
