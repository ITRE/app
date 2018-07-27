import React, { Component } from 'react'

import Input from '../form/input.js'
import Date from '../form/date.js'
import Textarea from '../form/textarea.js'

class Print extends Component {
	constructor(props) {
		super(props)
		this.state = {
			path: '',
			size: '',
			special: '',
			need: ''
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
					title='What is the full file path of the file to be printed?'
					name='path'
					type='text'
					value={this.state.path}
					handleChange={this.change}
					placeholder='File Path'
				/>
				<Input
					title='What size should the file be printed to?'
					name='size'
					type='text'
					value={this.state.size}
					handleChange={this.change}
					placeholder='Final Printed Size'
				/>
				<Textarea
					title='Any special instructions:'
					name='special'
					value={this.state.special}
					handleChange={this.change}
					placeholder='Special Instructions'
				/>
				<Date
					title='When do you need this completed?'
					name='need'
					value={this.state.need}
					handleChange={this.change}
				/>
			</div>
    )
  }
}

export default Print
