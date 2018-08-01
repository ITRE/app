import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
//import Login from './login'

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				username: '',
			  password: '',
			  email: '',
			  phone: '',
			  first: '',
			  last: '',
			  program: '',
			  super: '',
			  room: ''
			},
			errors: {
				username: {
					visible: false,
					text: 'Please enter a username'
				},
			  password: {
					visible: false,
					text: 'Please enter a password'
				},
			  passwordShort: {
					visible: false,
					text: 'Your password is too short'
				},
			  email: {
					visible: false,
					text: 'Please enter an email'
				},
			  phone: {
					visible: false,
					text: 'Please enter a phone number'
				},
			  first: {
					visible: false,
					text: 'Please enter your first name'
				},
			  last: {
					visible: false,
					text: 'Please enter your last name'
				},
			  program: {
					visible: false,
					text: 'Please enter your program group name'
				},
			  super: {
					visible: false,
					text: 'Please enter your supervisor\'s name'
				},
			  room: {
					visible: false,
					text: 'Please enter your room number'
				}
			},
			registered: false,
			validated: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.validate = this.validate.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	validate() {
		const errors = {...this.state.errors}
		let success = true
		for (const key in this.state.data) {
			if (key === 'password') {
				if (this.state.data.password.length < 8) {
					console.log(this.state.data.password.length)
					errors.passwordShort.visible = true
					success = false
				}
			} else if (this.state.data[key].length < 1) {
				errors[key].visible = true
				success = false
			} else {
				errors[key].visible = false
			}
		}

		this.setState({
			errors: errors,
			validated: success
		})
	}

	handleChange(event) {
		let newData = {...this.state.data}
		newData[event.target.name] = event.target.value
		this.setState({
			data: newData
		})
	}

	handleSubmit(event) {
		console.log(this.state)
		this.validate()
		if (this.state.validated) {
			axios(`http://api.ems.test/user`, {
				method: "post",
				data: this.state.data,
				withCredentials: 'include'
			})
	    .then(res => {
				this.setState({
					registered:true
				})
	    })
			.catch(error => {
		    alert(error)
		  })
		}

	}

  render() {
		if (this.state.registered) {
			return <Redirect to={{pathname: '/login'}}/>
		}
    return (
			<div>
				Fill this out:

				<form onSubmit={this.handleSubmit}>

					{this.state.errors.username.visible && <p style={{color:'red'}}>{this.state.errors.username.text}</p>}
	        <label>
	          Username:
	          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
	        </label>

					{this.state.errors.password.visible && <p style={{color:'red'}}>{this.state.errors.password.text}</p>}
					{this.state.errors.passwordShort.visible && <p style={{color:'red'}}>{this.state.errors.passwordShort.text}</p>}
	        <label>
	          Password:
	          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
	        </label>

					{this.state.errors.first.visible && <p style={{color:'red'}}>{this.state.errors.first.text}</p>}
	        <label>
	          First Name:
	          <input type="text" name="first" value={this.state.first} onChange={this.handleChange} />
	        </label>

					{this.state.errors.last.visible && <p style={{color:'red'}}>{this.state.errors.last.text}</p>}
	        <label>
	          Last Name:
	          <input type="text" name="last" value={this.state.last} onChange={this.handleChange} />
	        </label>

					{this.state.errors.email.visible && <p style={{color:'red'}}>{this.state.errors.email.text}</p>}
	        <label>
	          Email:
	          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
	        </label>

					{this.state.errors.room.visible && <p style={{color:'red'}}>{this.state.errors.room.text}</p>}
	        <label>
	          Room Number:
	          <input type="text" name="room" value={this.state.room} onChange={this.handleChange} />
	        </label>

					{this.state.errors.phone.visible && <p style={{color:'red'}}>{this.state.errors.phone.text}</p>}
	        <label>
	          Phone Number:
	          <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
	        </label>

					{this.state.errors.super.visible && <p style={{color:'red'}}>{this.state.errors.super.text}</p>}
	        <label>
	          Supervisor:
	          <input type="text" name="super" value={this.state.super} onChange={this.handleChange} />
	        </label>

					{this.state.errors.program.visible && <p style={{color:'red'}}>{this.state.errors.program.text}</p>}
	        <label>
	          Program:
	          <input type="text" name="program" value={this.state.program} onChange={this.handleChange} />
	        </label>

	        <input type="submit" value="Submit" />
	      </form>
			</div>
    );
  }
}

export default Register
