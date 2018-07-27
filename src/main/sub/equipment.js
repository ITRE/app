import React, { Component } from 'react'

import Input from '../form/input.js'
import Date from '../form/date.js'
import Select from '../form/select.js'
import Textarea from '../form/textarea.js'

class Equipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			budget: '',
			account: '',
			need: '',
			type: '',
			desc: ''
		}
    this.change = this.change.bind(this)
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		if (event.target.type === 'checkbox') {
			let newTried = [...this.state.tried]
			event.target.checked ? newTried.push(value) : newTried.splice(newTried.indexOf(value), 1)
			this.setState({
				tried: newTried
			}, () => {
				const info = {...this.state}
				this.props.test(info)
			})
		} else {
	    this.setState({
				[name]: value
			}, () => {
				const info = {...this.state}
				this.props.test(info)
			})
		}
	}

  render() {
    return (
			<div>
				<Input
					title='What is your budget?'
					name='budget'
					type='text'
					value={this.state.budget}
					handleChange={this.change}
					placeholder='$'
				/>
				<Input
					title='What account should be charged?'
					name='account'
					type='text'
					value={this.state.account}
					handleChange={this.change}
					placeholder='Account Number'
				/>
				<Date
					title='When do you need this item?'
					name='need'
					type='text'
					value={this.state.need}
					handleChange={this.change}
				/>
				<Select
					title='What kind of item do you need?'
					name='type'
					type='text'
					options={['Desktop', 'Laptop', 'Projector', 'Peripheral', 'Application', 'Other']}
					value={this.state.type}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Textarea
					title='Additional Description'
					name='desc'
					type='text'
					value={this.state.desc}
					handleChange={this.change}
				/>
			</div>
    )
  }
}

export default Equipment
