import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import Input from '../form/input.js'
import Users from '../form/users.js'
import Programs from '../form/programs.js'
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
			if (key === 'password' || key === 'confirm') {
				if (this.state.password === '') {
					continue
				}
			} else if (errors[key]) {
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
		  role: this.props.location.state.user.role ? this.props.location.state.user.role : 'Staff',
		  email: this.props.location.state.user.email ? this.props.location.state.user.email : '',
		  phone: this.props.location.state.user.phone ? this.props.location.state.user.phone : '',
		  first: this.props.location.state.user.first ? this.props.location.state.user.first : '',
		  last: this.props.location.state.user.last ? this.props.location.state.user.last : '',
		  program: this.props.location.state.user.program ? this.props.location.state.user.program.code : '',
		  super: this.props.location.state.user.super ? this.props.location.state.user.super.username : '',
		  room: this.props.location.state.user.room ? this.props.location.state.user.room : ''
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
			axios.put(`http://api.ems.test/user/${this.props.location.state.user.username}`, {
				password: this.state.password,
			  role: this.state.role,
			  email: this.state.email,
			  phone: this.state.phone,
			  first: this.state.first,
			  last: this.state.last,
			  program: this.state.program,
			  super: this.state.super,
			  room: this.state.room,
			})
	    .then(res => {
				Swal({
					title: 'Success!',
					type: 'success',
					text: 'User edited.',
				})
				this.setState({
					registered: <Redirect to={'/admin/accounts'} />
				})
	    })
	    .catch(error => {
	      alert(error)
	    })
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
							disabled={this.state.role && true}
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
						<Programs
							title='Program'
							name='program'
							value={this.state.program}
							handleChange={this.change}
							placeholder='Select One'
						/>
					</section>

					<button type="submit" className="primary" value="Submit">Update</button>
					<button type="button" onClick={this.cancel}>Cancel</button>
	      </form>
			</div>
    );
  }
}

export default EditUser
