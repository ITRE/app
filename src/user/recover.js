import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import Input from '../form/input.js'

class Recover extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:'',
			confirm:'',
			login: '',
			user: '',
			errors: {
				username: '',
			  password: '',
				confirm: ''
			}
		}

		this.change = this.change.bind(this)
		this.submit = this.submit.bind(this)
		this.validate = this.validate.bind(this)
		this.cancel = this.cancel.bind(this)
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

	submit(event) {
		event.preventDefault();
/*    axios(`http://api.ems.test/login`, {
			method: "post",
			data: {username: this.state.username, password: this.state.password},
			withCredentials: 'include'
		})
      .then(res => {
				localStorage.setItem('access token', res.data.token)
				this.setState({login:<Redirect to={{pathname: '/'}}/>})
      })
			.catch(error => {
		    alert(error)
		  })*/
	}

  render() {
    return (
			<div className="wrapper">
				{this.state.login}
				<header className="App-header">
					<nav>
		        <div className='logo'>
							<span className="screen-reader">Logo</span>
							<img src="../logo.svg"></img>
						</div>
					</nav>
        </header>

				<div className="login">
					<form onSubmit={this.submit}>
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
							<Input
								title='Confirm Password'
								name='confirm'
								type='password'
								error={this.state.errors.confirm}
								criteria='password'
								value={this.state.confirm}
								handleChange={this.change}
								placeholder='Confrim Password'
							/>
					</section>
					<button className="primary" type="submit" value="Submit">Log In</button>
					<button onClick={this.cancel}>Cancel</button>
		      </form>
				</div>
			</div>

    );
  }
}

export default Recover
