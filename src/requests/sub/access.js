import React, { Component } from 'react'
import moment from 'moment'

import Input from '../../form/input.js'
import Textarea from '../../form/textarea.js'
import Date from '../../form/date.js'
import Select from '../../form/select.js'

class Access extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: 'Folder / Server',
			location: '',
			desc: '',
			start: '',
			errors: {
				location: '',
			  desc: '',
			  start: ''
			},
			validated: false
		}
		this.validate = this.validate.bind(this)
    this.change = this.change.bind(this)
	}

	validate() {
		const errors = {...this.state.errors}
		let success = true
		for (const key in errors) {
			if(errors[key]) {
				success = false
			} else if (errors[key]==='' && !this.state[key]) {
				success = false
				switch(key) {
					case 'kind':
						errors[key] = 'Please make a selection'
						break
					default:
						errors[key] = 'This field cannot be left blank'
				}
		    this.setState({
					errors: errors
				})
			}
		}
		return success
	}

	componentDidMount() {
		if (this.props.info) {
			this.setState({
				type: this.props.info.type ? this.props.info.type : 'Folder / Server',
				location: this.props.info.location ? this.props.info.location : '',
				desc: this.props.info.desc ? this.props.info.desc : '',
				start: this.props.info.start ? moment(this.props.info.start).format('YYYY-MM-DD') : ''
			})
		}
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
				this.props.setInfo(info)
			})
		} else {
	    this.setState({
				[name]: value
			}, () => {
				const info = {...this.state}
				this.props.setInfo(info)
			})
		}
	}

  render() {
    return (
			<section className="field-group">
				<h2>Access Information</h2>
				<Select
					title='What kind of access do you need?'
					name='type'
					type='text'
					options={['Folder / Server', 'Software Install', 'Room', 'Other']}
					value={this.state.type}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Input
					title='Where do you need access to?'
					name='location'
					type='text'
					value={this.state.location}
					handleChange={this.change}
					placeholder='Room or File Path'
				/>
				<Date
					title='When do you need this access?'
					name='start'
					type='text'
					value={this.state.start}
					handleChange={this.change}
				/>
				<Textarea
					title='Additional Description'
					name='desc'
					type='text'
					value={this.state.desc}
					handleChange={this.change}
				/>
		</section>
    )
  }
}

export default Access
