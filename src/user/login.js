import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import Input from '../form/input.js'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:'',
			login: false,
			user: '',
			errors: {
				username: '',
			  password: ''
			}
		}

		this.change = this.change.bind(this)
		this.submit = this.submit.bind(this)
		this.validate = this.validate.bind(this)
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

	change(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	submit(event) {
		console.log('Loging in...')
		event.preventDefault();
    axios(`http://api.ems.test/login`, {
			method: "post",
			data: {username: this.state.username, password: this.state.password},
			withCredentials: 'include'
		})
      .then(res => {
				console.log('Login Successful')
				localStorage.setItem('access token', res.data.token)
				this.setState({login:true})
      })
			.catch(error => {
				Swal({
				  title: error.response.status+' Error',
				  type: 'error',
				  text:error.response.data.msg,
				})
		  })
	}

  render() {
		if (this.state.login) {
			return <Redirect to={{pathname: '/'}}/>
		}
    return (
			<div className="login">
				<form onSubmit={this.submit}>
					<section className="field-group">
						<h2>Log In</h2>
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
				</section>
				<button className="primary" type="submit" value="Submit">Log In</button>
	      </form>
				<div className="register-group">
					<Link className="subscript" to="/recover">Forgot Password?</Link>
					<Link className="subscript" to="/register">New User?</Link>
				</div>
			</div>
    );
  }
}

export default Login
