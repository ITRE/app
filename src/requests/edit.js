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
			log: {
				type: 'Edit',
			  staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
			  note: ''
			},
			info: {...this.props.location.state.ticket.info},
			redirect: false
		}
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
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
			user: jwt.decode(localStorage.getItem('access token')).id,
			for: this.state.for,
			kind: this.state.kind
		}
		if (this.state.kind === 'New User') {
			newTicket.kind = 'NewUser'
		}
		axios.post(`http://api.ems.test/tickets/${this.props.location.state.ticket._id}`, {
			ticket: newTicket,
			info: this.state.info,
			log: this.state.log
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

  render() {
		console.log(this.props)
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
			<div className='requests'>
				{ this.state.redirect && this.state.redirect }
				<form className='form' onSubmit={this.submit}>
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
				<Textarea
					title='Admin Notes About This Change'
					name='log'
					value={this.state.log.note}
					handleChange={this.change}
					placeholder='Notes'
				/>
				<br />
				<input type="submit" value="Submit" />
				</form>
			</div>
    )
  }
}

export default EditTicket
