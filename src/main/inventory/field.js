import React, { Component } from 'react'

class Field extends Component {
  	constructor(props) {
  		super(props)

  		this.handleChange = this.handleChange.bind(this);
  	}

  	handleChange(event) {
  		this.props.handleChange(event)
    }
  render() {
    return (
			<label htmlFor={this.props.id}>
				{this.props.name}:
				<input value={this.props.field} name={this.props.id} onChange={this.props.handleChange} />
			</label>
    )
  }
}

export default Field
