import React, { Component } from 'react'

class RequestForm extends Component {
  constructor(props) {
		super(props)
    this.fieldRender = this.fieldRender.bind(this)
  }

  fieldRender(field, group) {
    let fields = []
    let errorStyle = {}
		for (const key in field)  {
      let options = []
      if (field[key].validation) {
        errorStyle = {color:'red'}
      }
      switch(field[key].kind) {
        case 'select':
          for (const val in field[key].options) {
            options.push(<option value={val} key={val}>{field[key].options[val]}</option>)
          }
          fields.push(
            <label style={errorStyle} key={key} htmlFor={key}>
              {key}:
              <select value={field[key].data} name={key} data-tag={group} onChange={this.props.handleChange}>
                {options}
              </select>
            </label>
          )
          break
        case 'checkbox':
          for (const val in field[key].options) {
            options.push(<div key={val} className="checkbox"><input type="checkbox" name={key} value={val} data-tag={group} id={val} onChange={this.props.handleChange} /><label htmlFor={val}>{field[key].options[val]}</label></div>)
          }
          fields.push(
            <label style={errorStyle} key={key} htmlFor={key}>
              {key}:
              {options}
            </label>
          )
          break
        case 'date':
          fields.push(
            <label style={errorStyle} key={key} htmlFor={key}>
              {key}:
              <input type="date" value={field[key].data} name={key} data-tag={group} onChange={this.props.handleChange} />
            </label>
          )
          break
        case 'textarea':
          fields.push(
            <label style={errorStyle} key={key} htmlFor={key}>
              {key}:
              <textarea value={field[key].data} name={key} data-tag={group} onChange={this.props.handleChange} />
            </label>
          )
          break
        default:
          fields.push(
            <label style={errorStyle} key={key} htmlFor={key}>
              {key}:
              <input value={field[key].data} name={key} data-tag={group} onChange={this.props.handleChange} />
            </label>
          )
      }
		}
    return fields
  }

  render() {
    return (
			<div>
				<form onSubmit={this.props.handleSubmit}>
					{this.fieldRender(this.props.fields, 'data')}
          {this.fieldRender(this.props.kind, this.props.fields.kind.data)}
          <input type="submit" value="Submit" />
        </form>
			</div>
    )
  }
}

export default RequestForm
