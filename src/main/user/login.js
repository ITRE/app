import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:'',
			login: false,
			user: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();
    axios(`http://api.ems.test/login`, {
			method: "post",
			data: {username: this.state.username, password: this.state.password},
			withCredentials: 'include'
		})
      .then(res => {
				localStorage.setItem('access token', res.data.token)
				this.setState({login:true})
      })
			.catch(error => {
		    alert(error)
		  })
	}

  render() {
		if (this.state.login) {
			return <Redirect to={{pathname: '/'}}/>
		}
    return (
			<div>
				Fill this out:

				<form onSubmit={this.handleSubmit}>
	        <label>
	          Username:
	          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
	        </label>
	        <label>
	          Password:
	          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
				<Link to="/recover">Forgot Password?</Link>
				<Link to="/register">New User?</Link>
			</div>
    );
  }
}

export default Login
