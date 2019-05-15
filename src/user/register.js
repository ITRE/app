import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import Input from '../form/input.js'
import Users from '../form/users.js'
import Select from '../form/select.js'
import Program from '../form/programs.js'

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
		  password: '',
		  role: 'Staff',
		  email:'',
		  phone: '',
		  first: '',
		  last: '',
		  program_id: '',
		  super_id: '',
		  room: '',
			errors: {
				username: '',
			  password: '',
			  role: '',
			  email: '',
			  phone: '',
			  first: '',
			  last: '',
			  program_id: '',
			  super_id: '',
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
		    this.setState({
					errors: errors
				})
			}
		}
		return success
	}

	cancel() {
		this.setState({
			registered: <Redirect to={{pathname: '/'}}/>
		})
	}

  componentDidMount() {
		const {state} = this.props.location
		if (state) {
			this.setState({
				username: state.info.last ? (state.info.first.substring(0, 1)+state.info.last).toLowerCase() : '',
				password: state.info.password ? state.info.password : '',
				role: state.info.role ? state.info.role : 'Staff',
				email: state.info.email ? state.info.email : '',
				phone: state.info.phone ? state.info.phone : '',
				first: state.info.first ? state.info.first : '',
				last: state.info.last ? state.info.last : '',
				program_id: state.info.program_id ? state.info.program_id : '',
				super_id: state.info.super_id ? state.info.super_id : '',
				room: state.info.room ? state.info.room : ''
			})
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
		const {state} = this.props.location
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
			  program_id: this.state.program_id,
			  super_id: this.state.super_id,
			  room: this.state.room,
			}
			if (state) {
				const info = {
					start: state.info.start,
					access: state.info.access,
					software: state.info.software,
					hardware: state.info.hardware,
					account: state.info.account,
					other: state.info.other,
				}
				this.setState({
					registered: <Redirect to={{
						pathname: '/admin/equipment',
						state: {
							ticket: state.ticket,
							user: user,
							info: info
						}
					}} />
				})
			} else {
				axios(`http://api.ems.test/user`, {
					method: "post",
					data: user,
					withCredentials: 'include'
				})
		    .then(res => {
					Swal({
					  title: 'Success!',
					  type: 'success',
					  text: 'Account registered!',
					})
					this.setState({
						registered: <Redirect to={{pathname: '/dashboard'}}/>
					})
		    })
				.catch(error => {
					Swal({
					  title: error.response.status+' Error',
					  type: 'error',
					  text:error.response.data.msg,
					})
			  })
			}
		}
	}

  render() {
		console.log(this.state)
    return (
			<div className="main">
				{this.state.registered && this.state.registered}

				<h1>New User</h1>

				<form onSubmit={this.submit}>
					<section className="field-group">
						<h2>Account</h2>
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
							options={['Staff', 'Student', 'Grad Student', 'Temp', 'Other']}
							disabled={this.props.role && true}
							value={this.state.role}
							handleChange={this.change}
							placeholder='Select One'
						/>
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
							name='super_id'
							error={this.state.errors.super_id}
							value={this.state.super_id}
							handleChange={this.change}
							placeholder='Select One'
						/>
						<Program
							title='Program:'
							name='program_id'
							error={this.state.errors.program_id}
							value={this.state.program_id}
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

export default Register
