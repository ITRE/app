import React, { Component } from 'react'
import moment from 'moment'

import Input from '../../form/input.js'
import Date from '../../form/date.js'
import Select from '../../form/select.js'
import Users from '../../form/users.js'
import Program from '../../form/programs.js'
import Checkbox from '../../form/checkbox.js'
import Textarea from '../../form/textarea.js'

class NewUser extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				role: '',
				first: '',
				last: '',
				email: '',
				phone: '',
				program_id: '',
				super_id: '',
				room: '',
				start: '',
				access: '',
				software: [],
				hardware: [],
				account: '',
				other: ''
			},
			supers: []
		}
    this.change = this.change.bind(this)
	}

	componentDidMount() {
		if (this.props.info) {
			this.setState({
				user: {
					role: this.props.info.role ? this.props.info.role : '',
					first: this.props.info.first ? this.props.info.first : '',
					last: this.props.info.last ? this.props.info.last : '',
					email: this.props.info.email ? this.props.info.email : '',
					phone: this.props.info.phone ? this.props.info.phone : '',
					program_id: this.props.info.program_id ? this.props.info.program_id : '',
					super_id: this.props.info.super_id ? this.props.info.super_id : '',
					room: this.props.info.room ? this.props.info.room : '',
					start: this.props.info.start ? moment(this.props.info.start).format('YYYY-MM-DD') : '',
					access: this.props.info.access ? this.props.info.access : '',
					software: this.props.info.software ? this.props.info.software : [],
					hardware: this.props.info.hardware ? this.props.info.hardware : [],
					account: this.props.info.account ? this.props.info.account : '',
					other: this.props.info.other ? this.props.info.other : ''
				}
			})
		}
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		let user = {...this.state.user}
		let newList
		switch (name) {
			case 'software':
				newList = [...this.state.user.software]
				event.target.checked ? newList.push(value) : newList.splice(newList.indexOf(value), 1)
				user.software = newList
				break
			case 'hardware':
				newList = [...this.state.user.hardware]
				event.target.checked ? newList.push(value) : newList.splice(newList.indexOf(value), 1)
				user.hardware = newList
				break
			default:
				user[name] = value
		}
		this.setState({
			user: user
		}, () => {
			const info = {...this.state.user}
			this.props.setInfo(info)
		})
	}

  render() {
    return (
			<section className="field-group">
				<h2>New User Information</h2>
				<Select
					title='Role:'
					name='role'
					options={['Staff', 'Temp', 'Grad Student', 'Student', 'Other']}
					value={this.state.user.role}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Input
					title='User First Name:'
					name='first'
					type='text'
					value={this.state.user.first}
					handleChange={this.change}
					placeholder='First'
				/>
				<Input
					title='User Last Name:'
					name='last'
					type='text'
					value={this.state.user.last}
					handleChange={this.change}
					placeholder='Last'
				/>
				<Input
					title='Email:'
					name='email'
					type='text'
					value={this.state.user.email}
					handleChange={this.change}
					placeholder='email@ncsu.edu'
				/>
				<Input
					title='Phone Number:'
					name='phone'
					type='text'
					value={this.state.user.phone}
					handleChange={this.change}
					placeholder='(xxx) xxx-xxxx'
				/>
				<Program
					title='Program:'
					name='program_id'
					value={this.state.user.program_id}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Users
					title='Supervisor:'
					name='super_id'
					value={this.state.user.super_id}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Input
					title='Room Number:'
					name='room'
					type='text'
					value={this.state.user.room}
					handleChange={this.change}
					placeholder='Room Number'
				/>
				<Date
					title='When does this person start work?'
					name='start'
					value={this.state.user.start}
					handleChange={this.change}
				/>
				<Input
					title='What servers does this user need access to?'
					name='access'
					type='text'
					value={this.state.user.access}
					handleChange={this.change}
					placeholder='Servers'
				/>
				<Checkbox
					title='What software does this user need installed'
					name='software'
					options={['ArcGIS', 'SASS', 'R', 'MatLab', 'VISSIM / VISTRO', 'Python', 'Adobe Creative', 'Other']}
					selectedOptions={this.state.user.software}
					handleChange={this.change}
					placeholder='Name'
				/>
				<Checkbox
					title='What hardware does this user need?'
					name='hardware'
					options={['Desktop Computer', 'Laptop Computer', 'Tablet / Mobile Computer', 'Extra Monitor', 'Phone Connection', 'Printer', 'Other']}
					selectedOptions={this.state.user.hardware}
					handleChange={this.change}
					placeholder='Name'
				/>
				<Input
					title='If equipment or licenses need to be purchased, what is the account number that should be charged?'
					name='account'
					type='text'
					value={this.state.user.account}
					handleChange={this.change}
					placeholder='Account Number'
				/>
				<Textarea
					title='Describe anything not covered that this user needs:'
					name='other'
					value={this.state.user.other}
					handleChange={this.change}
				/>
			</section>
    )
  }
}

export default NewUser
