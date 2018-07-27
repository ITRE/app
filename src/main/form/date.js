import React from 'react'

const Date = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type="date"
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default Date
