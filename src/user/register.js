import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Input from '../form/input.js'
import Users from '../form/users.js'
import Select from '../form/select.js'

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: this.props.username ? this.props.username : '',
		  password: this.props.password ? this.props.password : '',
		  role: this.props.role ? this.props.role : 'Staff',
		  email: this.props.email ? this.props.email : '',
		  phone: this.props.phone ? this.props.phone : '',
		  first: this.props.first ? this.props.first : '',
		  last: this.props.last ? this.props.last : '',
		  program: this.props.program ? this.props.program : '',
		  super: this.props.super ? this.props.super : '',
		  room: this.props.room ? this.props.room : '',
			errors: {
				username: '',
			  password: '',
			  role: '',
			  email: '',
			  phone: '',
			  first: '',
			  last: '',
			  program: '',
			  super: '',
			  room: ''
			},
			registered: false,
			validated: false
		}
		this.validate = this.validate.bind(this)
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
	}

	validate() {
		const errors = {...this.state.errors}
		let success = true
		for (const key in errors) {
			if(errors[key]) {
				success = false
			} else if (errors[key]==='' && !this.state[key]) {
				success = false
				errors[key] = true
		    this.setState({
					errors: errors
				})
			}
		}
		return success
	}

  componentDidMount() {
		if (this.props.type==='Admin') {
			const errors = {...this.state.errors}
			for (const key in errors) {
				if (this.state[key] === '') {
					errors[key] = true
			    this.setState({
						errors: errors
					})
				}
			}
		}
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		let errors = {...this.state.errors}
		if (name in errors) {
			switch(event.target.type) {
				case 'password':
					if (!value || value.length < 8) {
						errors[name] = true
					} else {
						errors[name] = false
					}
					break
				default:
					if (!value) {
						errors[name] = true
					} else {
						errors[name] = false
					}
			}
		}
    this.setState({
			[name]: value,
			errors: errors
		})
	}

	submit(event) {
		event.preventDefault()
		const validated = this.validate()
		if (!validated) {
			alert('Not all fields were filled correctly. Please double check your information and try again.')
		} else {
			const user = {
				username: this.state.username,
			  password: this.state.password,
			  role: this.state.role,
			  email: this.state.email,
			  phone: this.state.phone,
			  first: this.state.first,
			  last: this.state.last,
			  program: this.state.program,
			  super: this.state.super,
			  room: this.state.room,
			}
			axios(`http://api.ems.test/user`, {
				method: "post",
				data: user,
				withCredentials: 'include'
			})
	    .then(res => {
				if (this.props.type === 'Admin') {
					this.setState({
						registered: <Redirect to={{
							pathname: '/admin/equipment',
							state: {
								ticket: this.props.ticket,
								user: res.data.data,
								start: this.props.start,
								access: this.props.access,
								software: this.props.software,
								hardware: this.props.hardware,
								account: this.props.account,
								other: this.props.other
							}
						}} />
					})
				} else {
					this.setState({
						registered: <Redirect to={{pathname: '/login'}}/>
					})
				}
	    })
			.catch(error => {
		    alert(error)
		  })
		}
	}

  render() {
    return (
			<div>
				{this.state.registered && this.state.registered}
				Fill this out:

				<form onSubmit={this.submit}>
					<Input
						title='Username'
						name='username'
						type='text'
						error={this.state.errors.username}
						value={this.state.username}
						handleChange={this.change}
						placeholder='Username'
					/>
					<Input
						title='Password'
						name='password'
						type='password'
						error={this.state.errors.password}
						criteria='password'
						message='Must be at least 8 characters'
						value={this.state.password}
						handleChange={this.change}
						placeholder='Password'
					/>
					<Select
						title='Role:'
						name='role'
						error={this.state.errors.role}
						options={['Admin', 'Staff', 'Student', 'Temp', 'Other']}
						disabled={this.props.role && true}
						value={this.state.role}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Input
						title='First Name'
						name='first'
						type='text'
						error={this.state.errors.first}
						value={this.state.first}
						handleChange={this.change}
						placeholder='First Name'
					/>
					<Input
						title='Last Name'
						name='last'
						type='text'
						error={this.state.errors.last}
						value={this.state.last}
						handleChange={this.change}
						placeholder='Last Name'
					/>
					<Input
						title='Email'
						name='email'
						type='text'
						error={this.state.errors.email}
						value={this.state.email}
						handleChange={this.change}
						placeholder='Email'
					/>
					<Input
						title='Phone Number'
						name='phone'
						type='text'
						error={this.state.errors.phone}
						value={this.state.phone}
						handleChange={this.change}
						placeholder='Phone Number'
					/>
					<Input
						title='Room Number'
						name='room'
						type='text'
						error={this.state.errors.room}
						value={this.state.room}
						handleChange={this.change}
						placeholder='Room Number'
					/>
					<Users
						title='Supervisor:'
						name='super'
						error={this.state.errors.super}
						value={this.state.super}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Select
						title='Program:'
						name='program'
						error={this.state.errors.program}
						options={['Administration', 'IT & Web', 'LTAP', 'Aviation', 'Bike / Ped', 'Econ / Policy', 'Highway Systems', 'Modeling / Comp', 'Port / Ferry', 'School Planning / Transpo', 'Transit', 'TIMS', 'Graphic Design', 'Other']}
						value={this.state.program}
						handleChange={this.change}
						placeholder='Select One'
					/>
	        <input type="submit" value="Submit" />
	      </form>
			</div>
    );
  }
}

export default Register
