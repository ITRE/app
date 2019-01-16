import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Table from '../form/table.js'

const jwt = require('jsonwebtoken')

class UserList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			filters: ['Admin', 'Staff', 'Student', 'Temp', 'Other'],
			user: jwt.decode(localStorage.getItem('access token'))
		}
		this.change = this.change.bind(this)
		this.edit = this.edit.bind(this)
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

	edit(user) {
		this.setState({
			redirect: <Redirect to={{
				pathname: '/account/edit',
				state: {user: user}
			}} />
		})
	}

  render() {
		let headers = ['Full Name', 'Role', 'Room', 'Supervisor', 'Program']
		if (this.state.user.role === 'Admin') {
			headers.push('Edit')
		}
		const items = this.state.users.sort((a,b) => {
			const order = {'Admin':1, 'Staff':2, 'Student':3, 'Temp':4, 'Other':5, 'None':6 }
			return order[a.role] - order[b.role]
		})
		.map((user, index) => {
			let item = {
				full: user.first + ' ' + user.last,
				role: user.role,
				room: user.room,
				super: user.super ? user.super.first + ' ' + user.super.last : 'No Supervisor',
				program: user.program ? user.program.name : 'No Program'
			}
			if (this.state.user.role === 'Admin') {
				item.button = {
					click: () => this.edit(user),
					label: 'Edit'
				}
			}
			return item
		})

		return(
			<div className="main">
				{ this.state.redirect && this.state.redirect }
				<h1>Users</h1>
				{ items.length > 0 &&
					<Table
					headers={headers}
					items={items}
					filterOptions={['Admin', 'Staff', 'Student', 'Temp', 'Other']}
					filters={this.state.filters}
					filterCategory={'role'}
					change={this.change}
				/>
				}
			</div>
		)
  }
}

export default UserList
