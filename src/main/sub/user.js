import React, { Component } from 'react'

import Input from '../form/input.js'
import Date from '../form/date.js'
import Select from '../form/select.js'
import Users from '../form/users.js'
import Checkbox from '../form/checkbox.js'
import Textarea from '../form/textarea.js'

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
				program: '',
				super: '',
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

	change(event) {
		const value = event.target.value
    const name = event.target.name
		let user = {...this.state.user}
		let newList
		switch (event.target.name) {
			case 'sofware':
			console.log(value)
				newList = [...this.state.user.sofware]
				event.target.checked ? newList.push(value) : newList.splice(newList.indexOf(value), 1)
				user.sofware = newList
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
			this.props.test(info)
		})
	}

  render() {
    return (
			<div>
				<Select
					title='Role:'
					name='role'
					options={['Admin', 'Staff', 'Student', 'Other']}
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
				<Select
					title='Program:'
					name='program'
					options={['Administration', 'IT & Web', 'LTAP', 'Aviation', 'Bike / Ped', 'Econ / Policy', 'Highway Systems', 'Modeling / Comp', 'Port / Ferry', 'School Planning / Transpo', 'Transit', 'TIMS', 'Graphic Design', 'Other']}
					value={this.state.user.program}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Users
					title='Supervisor:'
					name='super'
					value={this.state.user.super}
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
			</div>
    )
  }
}

export default NewUser
