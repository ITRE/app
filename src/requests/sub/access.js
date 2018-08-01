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
			type: this.props.info.type ? this.props.info.type : '',
			location: this.props.info.location ? this.props.info.location : '',
			desc: this.props.info.desc ? this.props.info.desc : '',
			start: this.props.info.start ? moment(this.props.info.start).format('YYYY-MM-DD') : ''
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
			</div>
    )
  }
}

export default Access
