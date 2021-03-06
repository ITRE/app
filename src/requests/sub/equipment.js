import React, { Component } from 'react'
import moment from 'moment'

import Input from '../../form/input.js'
import Date from '../../form/date.js'
import Select from '../../form/select.js'
import Textarea from '../../form/textarea.js'

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

	componentDidMount() {
		if (this.props.info) {
			this.setState({
				budget: this.props.info.budget ? this.props.info.budget : '',
				account: this.props.info.account ? this.props.info.account : '',
				need: this.props.info.need ? moment(this.props.info.need).format('YYYY-MM-DD') : '',
				type: this.props.info.type ? this.props.info.type : '',
				desc: this.props.info.desc ? this.props.info.desc : ''
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
				<h2>Equipment Information</h2>
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
		</section>
    )
  }
}

export default Equipment
