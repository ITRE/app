import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import Input from '../form/input.js'
import Users from '../form/users.js'
import Select from '../form/select.js'

const jwt = require('jsonwebtoken')

class EditUser extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
		  confirm: '',
		  role: 'Staff',
		  email:'',
		  phone: '',
		  first: '',
		  last: '',
		  program: '',
		  super: '',
		  room: '',
			user: jwt.decode(localStorage.getItem('access token')),
			errors: {
				confirm: '',
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
		this.cancel = this.cancel.bind(this)
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
			}
		}
		if (this.state.password !== this.state.confirm) {
			success = false
			errors.confirm = true
		}
		this.setState({
			errors: errors
		})
		return success
	}

	cancel() {
		this.setState({
			registered: <Redirect to={{pathname: '/'}}/>
		})
	}

  componentDidMount() {
		this.setState({
		  role: this.props.role ? this.props.role : 'Staff',
		  email: this.props.email ? this.props.email : '',
		  phone: this.props.phone ? this.props.phone : '',
		  first: this.props.first ? this.props.first : '',
		  last: this.props.last ? this.props.last : '',
		  program: this.props.program ? this.props.program : '',
		  super: this.props.super ? this.props.super : '',
		  room: this.props.room ? this.props.room : ''
		})
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
				case 'confirm':
					if (!value || value !== this.state.password) {
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

		}
	}

  render() {
    return (
			<div className="main">
				{this.state.registered && this.state.registered}

				<h1>New User</h1>

				<form onSubmit={this.submit}>
					<section className="field-group">
						<h2>Account</h2>
						<Input
							title='New Password'
							name='password'
							type='password'
							error={this.state.errors.password}
							criteria='password'
							message='Must be at least 8 characters'
							value={this.state.password}
							handleChange={this.change}
							placeholder='New Password'
						/>
						<Input
							title='Confirm Password'
							name='confirm'
							type='password'
							error={this.state.errors.confirm}
							criteria='password'
							message=''
							value={this.state.confirm}
							handleChange={this.change}
							placeholder='Confirm Password'
						/>
					{this.state.user.role === 'admin' &&
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
					}
					</section>

					<section className="field-group">
						<h2>Personal</h2>
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
					</section>

					<section className="field-group">
						<h2>ITRE</h2>
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
					</section>

					<button type="submit" className="primary" value="Submit">Register</button>
					<button type="button" onClick={this.cancel}>Cancel</button>
	      </form>
			</div>
    );
  }
}

export default EditUser
