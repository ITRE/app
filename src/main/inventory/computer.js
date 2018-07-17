import React, { Component } from 'react'

import Field from './field'

class ComputerFields extends Component {
	constructor(props) {
		super(props)
		this.state = {
			computer: {
				brand: '',
			  model: '',
			  type: '',
			  hd: '',
			  ram: '',
			  cpu: '',
			  price: ''
			}
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;
		let newItem = {...this.state.computer}
		newItem[name] = value
    this.setState({
			computer: newItem
		})
  }

  render() {
		let fieldsArray = []
		for (const key in this.state.computer) {
			fieldsArray.push(<Field key={key} name={key} handleChange={this.handleChange} />)
		}
    return (
			<div>
					{
						fieldsArray
					}
			</div>
    )
  }
}

export default ComputerFields
