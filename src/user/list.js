import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Checkbox from '../form/checkbox.js'

const jwt = require('jsonwebtoken')

class UserList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
		  role: '',
		  email:'',
		  phone: '',
		  first: '',
		  last: '',
		  program: '',
		  super: '',
		  room: '',
			users: [],
			filters: ['Admin', 'Staff', 'Student', 'Temp', 'Other'],
			user: jwt.decode(localStorage.getItem('access token'))
		}
		this.change = this.change.bind(this)
	}

	componentDidMount() {
    axios.get(`http://api.ems.test/user`, {
			method: "get",
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
      this.setState({
				users: res.data.data
			})
    })
		.catch(error => {
			alert(error)
		})
  }

	change(event) {
		const value = event.target.value
    const name = event.target.name
		if (event.target.type === 'checkbox') {
			let changed = [...this.state[name]]
			event.target.checked ? changed.push(value) : changed.splice(changed.indexOf(value), 1)
			this.setState({
				[name]: changed
			})
		} else {
	    this.setState({
				[name]: value
			})
		}
	}

  render() {
		return (
			<div className="main">
				{ this.state.redirect && this.state.redirect }
				<h1>Users</h1>
				<section className="field-group">
					<h2>Filter</h2>
						<Checkbox
							title=''
							name='filters'
							options={['Admin', 'Staff', 'Student', 'Temp', 'Other']}
							selectedOptions={this.state.filters}
							handleChange={this.change}
							buttons={true}
						/>
				</section>

				<div className="field-group">
					<div className="flex headers">
		        <p className="column"><strong>Username</strong></p>
		        <p className="column"><strong>Full Name</strong></p>
		        <p className="column"><strong>Room</strong></p>
		        <p className="column"><strong>Supervisor</strong></p>
		        <p className="column"><strong>Program</strong></p>
					</div>
					{ this.state.users
						.sort((a,b) => {
							const order = {admin:1, staff:2, student:3, temp:4, other:5 }
							return order[a.role] - order[b.rol]
						})
						.filter(a => this.state.user.role === 'admin' || a.role !== 'admin')
						.filter(a => this.state.filters.indexOf(a.role) >= 0)
						.map((user, index) => (
							<div key={user.username} className="line-item">
			          <button className="column" >{ user.username }</button>
			          <p className="column">{ user.first } { user.last }</p>
			          <p className="column">{user.room}</p>
								{user.super && <p className="column">{user.super.first} {user.super.last}</p>}
								{!user.super && <p className="column">No Supervisor</p>}
								{user.program && <p className="column">{user.program.name}</p>}
								{!user.program && <p className="column">No Program</p>}
			        </div>
						))
					}
				</div>
			</div>
    );
  }
}

export default UserList
