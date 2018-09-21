import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import Users from '../form/users.js'
import Select from '../form/select.js'
import Textarea from '../form/textarea.js'

import Access from './sub/access.js'
import Equipment from './sub/equipment.js'
import Error from './sub/error.js'
import NewUser from './sub/user.js'
import Print from './sub/print.js'
import Other from './sub/other.js'

const jwt = require('jsonwebtoken')

class EditTicket extends Component {
	constructor(props) {
		super(props)
		this.state = {
			for: this.props.location.state.ticket.for,
			user: {...this.props.location.state.ticket.user},
			kind: this.props.location.state.ticket.kind,
			priority: this.props.location.state.ticket.priority,
			status: this.props.location.state.ticket.status,
			log: [...this.props.location.state.ticket.log],
			note: '',
			info: {...this.props.location.state.ticket.info},
			redirect: false,
			addUser: false
		}
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
    this.newUser = this.newUser.bind(this)
    this.cancel = this.cancel.bind(this)
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
    this.setState({
			[name]: value
		})
	}

	setInfo(info) {
		this.setState({
			info: info
		})
	}

  submit(event) {
		const newTicket = {
			user: this.state.user._id,
			for: this.state.for,
			kind: this.state.kind,
			priority: this.state.priority,
			status: this.state.status,
			info: this.state.info
		}
		if (this.state.kind === 'New User') {
			newTicket.kind = 'NewUser'
		}
		axios.put(`http://api.ems.test/tickets/${this.props.location.state.ticket._id}`, {
			ticket: newTicket,
			log: {
				type: 'Edit',
			  staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
			  note: this.state.note
			}
		})
    .then(res => {
			this.setState({
				redirect: <Redirect to={'/tickets/'} />
			})
    })
    .catch(error => {
      alert(error)
    })

		event.preventDefault()
  }

	newUser(event) {
		let log = [...this.state.log]
		log.push({
			type: 'Edit',
			staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
			note: this.state.note
		})
		this.setState({
			redirect: <Redirect to={{
				pathname: '/admin/user',
				state: {
					ticket: {
						for: this.state.for,
						_id: this.props.location.state.ticket._id,
						user: this.state.user,
						kind: 'NewUser',
						priority: this.state.priority,
						status: this.state.status,
						log: log
					},
					user: jwt.decode(localStorage.getItem('access token')).id,
					info: {...this.state.info}
				}
			}} />
		})
	}

	cancel(event) {
		this.setState({
			redirect: <Redirect to={'/tickets/'} />
		})
	}

  render() {
		let kind
		switch(this.state.kind) {
			case 'Access':
				kind = <Access info={this.state.info} test={this.setInfo} />
				break
			case 'Equipment':
				kind = <Equipment info={this.state.info} test={this.setInfo} />
				break
			case 'Error':
				kind = <Error info={this.state.info} test={this.setInfo} />
				break
			case 'Print':
				kind = <Print info={this.state.info} test={this.setInfo} />
				break
			case 'New User':
				kind = <NewUser info={this.state.info} test={this.setInfo} />
				break
			case 'Other':
				kind = <Other info={this.state.info} test={this.setInfo} />
				break
			default:
				kind = ''
		}

    return (
			<div className='requests main'>
				{ this.state.redirect && this.state.redirect }
				<h1>Edit Request</h1>
				{ this.state.addUser && this.state.addUser }
				<form className='form' onSubmit={this.submit}>
					<Textarea
						title='Admin Notes'
						name='note'
						value={this.state.note}
						handleChange={this.change}
						placeholder='Notes'
					/>
				{this.state.kind !== 'New User' && <button type="submit" value="Submit">Submit</button> }
					{this.state.kind === 'New User' && <button onClick={this.newUser} value="Create User">Create User</button> }
					<button onClick={this.cancel} value="Cancel">Cancel</button>
					<br />
					<h2>Edit Request Ticket</h2>
					<Users
						title='Requestor'
						name='user'
						value={this.state.user._id}
						disabled={true}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Users
						title='Who is this request for?'
						name='for'
						value={this.state.for}
						string={true}
						extraOptions={['My Department']}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Select
						title='Priority'
						name='priority'
						options={['Low', 'Normal', 'Medium', 'High', 'Urgent']}
						value={this.state.priority}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Select
						title='Status'
						name='status'
						options={['New', 'Seen', 'In Progress', 'On Hold', 'Awaiting Reply', 'Completed', 'Closed']}
						value={this.state.status}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Select
						title='What kind of request is this?'
						name='kind'
						options={['Access', 'Equipment', 'Error', 'Print', 'New User', 'Other']}
						value={this.state.kind}
						handleChange={this.change}
						placeholder='Select One'
					/>
				{kind}
				<br />
				{this.state.kind !== 'New User' && <button type="submit" value="Submit">Submit</button> }
				{this.state.kind === 'New User' && <button onClick={this.newUser} value="Create User">Create User</button>}
				<button onClick={this.cancel} value="Cancel">Cancel</button>
				</form>
			</div>
    )
  }
}

export default EditTicket
