import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
//import Swal from 'sweetalert2'

import Input from '../form/input.js'

class Recover extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email:'',
			login: '',
			token: '',
			pass: '',
			confirm: '',
			errors: {
				username: '',
			  email: '',
				pass: ''
			}
		}

		this.change = this.change.bind(this)
		this.submitRequest = this.submitRequest.bind(this)
		this.submitPass = this.submitPass.bind(this)
		this.validate = this.validate.bind(this)
		this.cancel = this.cancel.bind(this)
	}

  componentDidMount() {
		if (this.props.match.params.id) {
			this.setState({token: this.props.match.params.id})
		}
  }

	validate() {
		const errors = {...this.state.errors}
		let success = true
		for (const key in errors) {
			if (errors[key]) {
				success = false
			} else if (errors[key]==='' && !this.state[key]) {
				success = false
				errors[key] = true
		    this.setState({
					errors: errors
				})
			} else if ([key]==='confirm' && this.state[key] !== this.state.password) {
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
			login: <Redirect to={{pathname: '/login'}}/>
		})
	}

	change(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	submitRequest(event) {
		event.preventDefault();
    axios.post(`http://api.ems.test/recover/request`, {
				username: this.state.username,
				email: this.state.email
			})
      .then(res => {
				alert('success!')
				this.setState({
					login: <Redirect to={{pathname: '/login'}}/>
				})
      })
			.catch(error => {
		    alert(error)
		  })
	}

	submitPass(event) {
		event.preventDefault();
    axios.post(`http://api.ems.test/recover/change`, {
				password: this.state.pass,
				token: this.state.token
			})
      .then(res => {
				alert('success!')
				this.setState({
					login: <Redirect to={{pathname: '/login'}}/>
				})
      })
			.catch(error => {
		    alert(error)
		  })
	}

  render() {
    return (
			<div className="login">
				{this.state.login}
				{this.state.token && this.changePass()}
				{!this.state.token && this.request()}
			</div>
    );
  }

	request() {
		return(
			<form onSubmit={this.submitRequest}>
				<section className="field-group">
					<h2>Change Password</h2>
					<Input
						title='Username'
						name='username'
						type='text'
						error={this.state.errors.username}
						value={this.state.username}
						handleChange={this.change}
						placeholder='Username'
					/>
				<span style={{textAlign:"center", display:"block"}}>OR</span>
					<Input
						title='Email'
						name='email'
						type='email'
						error={this.state.errors.email}
						value={this.state.email}
						handleChange={this.change}
						placeholder='Email'
					/>
			</section>
			<button className="primary" type="submit" value="Submit">Submit</button>
			<button type="button" onClick={this.cancel}>Cancel</button>
			</form>
		)
	}

	changePass() {
		return (
			<form onSubmit={this.submitPass}>
				<section className="field-group">
					<h2>Change Password</h2>
					<Input
						title='New Password'
						name='pass'
						type='password'
						error={this.state.errors.pass}
						value={this.state.pass}
						handleChange={this.change}
						placeholder='New Password'
					/>
					<Input
						title='Confirm Password'
						name='confirm'
						type='password'
						value={this.state.confirm}
						handleChange={this.change}
						placeholder='Confirm Password'
					/>
			</section>
			<button className="primary" type="submit" value="Submit">Submit</button>
			<button type="button" onClick={this.cancel}>Cancel</button>
			</form>
		)
	}
}

export default Recover
