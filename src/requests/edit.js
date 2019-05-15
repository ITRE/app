import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

import Users from '../form/users.js'
import Select from '../form/select.js'
import Date from '../form/date.js'
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
			user: jwt.decode(localStorage.getItem('access token')),
			user_id: '',
			requestor_id: '{}',
			kind: '',
			priority: '',
			status: '',
			log: [],
			note: '',
			info: {},
			redirect: false,
			addUser: false
		}
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
    this.changeInfo = this.changeInfo.bind(this)
    this.newUser = this.newUser.bind(this)
    this.borrow = this.borrow.bind(this)
    this.cancel = this.cancel.bind(this)
	}

	componentDidMount() {
		if (this.props.location.state.ticket) {
			this.setState({
				user_id: this.props.location.state.ticket.user_id ? this.props.location.state.ticket.user_id : '',
				requestor_id: this.props.location.state.ticket.requestor_id ? this.props.location.state.ticket.requestor_id : '',
				kind: this.props.location.state.ticket.kind ? this.props.location.state.ticket.kind : '',
				priority: this.props.location.state.ticket.priority ? this.props.location.state.ticket.priority : '',
				status: this.props.location.state.ticket.status ? this.props.location.state.ticket.status : '',
				log: this.props.location.state.ticket.log ? [...this.props.location.state.ticket.log] : [],
				info: this.props.location.state.ticket.info ? {...this.props.location.state.ticket.info} : {},
			})
		}
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
    this.setState({
			[name]: value
		})
	}

	changeInfo(event) {
		const value = event.target.value
    const name = event.target.name
    let info = {...this.state.info}
		info[name] = value
    this.setState({
			info: info
		})
	}

	setInfo(info) {
		this.setState({
			info: info
		})
	}

  submit(event) {
		const newTicket = {
			user_id: this.state.user_id,
			requestor_id: this.state.requestor_id,
			kind: this.state.kind,
			priority: this.state.priority,
			status: this.state.status,
			info: this.state.info._id
		}
		if (this.props.location.state.ticket.status === this.state.status && this.state.status === 'New') {
			newTicket.status = 'Seen'
		}
		if (this.state.kind === 'New User') {
			newTicket.kind = 'NewUser'
		}
		if (this.state.user_id === 'My Department') {
			newTicket.user_id = 'none'
		}
		axios.put(`http://api.ems.test/tickets/${this.props.location.state.ticket._id}`, {
			ticket: newTicket,
			info: this.state.info,
			log: {
				type: 'Edit',
			  staff: this.state.user.first+' '+this.state.user.last,
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

  borrow(event) {
		const newItem = {
			user_id: this.state.user_id,
			location: this.props.location.state.ticket.for.room,
			borrowed: moment(),
			updated: moment()
		}

		const newTicket = {
			user_id: this.state.user_id,
			requestor_id: this.state.requestor_id,
			kind: this.state.kind,
			priority: this.state.priority,
			status: 'Completed',
			info: this.state.info._id
		}
		if (this.state.user_id === 'My Department') {
			newTicket.user_id = 'none'
		}
		axios.put(`http://api.ems.test/inv/${this.state.info.item}`, {
			inv: newItem,
			item: {},
			log: {
				type: 'Borrowed',
			  staff: this.state.user.first+' '+this.state.user.last,
			  note: 'Request for borrow approved.'
			}
		})
    .then(res => {
			axios.put(`http://api.ems.test/tickets/${this.props.location.state.ticket._id}`, {
				ticket: newTicket,
				info: this.state.info,
				log: {
					type: 'Borrow Approved',
				  staff: this.state.user.first+' '+this.state.user.last,
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
    })
    .catch(error => {
      alert(error)
    })
		event.preventDefault()
  }

	newUser(event) {
		let user_id = this.state.user_id
		if (user_id === 'My Department') {
			user_id = this.state.user.program.code
		}
		let log = [...this.state.log]
		log.push({
			type: 'Edit',
			staff: this.state.user.first+' '+this.state.user.last,
			note: this.state.note
		})
		this.setState({
			redirect: <Redirect to={{
				pathname: '/admin/user',
				state: {
					ticket: {
						user_id: user_id,
						_id: this.props.location.state.ticket._id,
						requestor_id: this.state.requestor_id,
						kind: 'NewUser',
						priority: this.state.priority,
						status: this.state.status,
						log: log
					},
					user: this.state.user.username,
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
				kind = <Access info={this.state.info} setInfo={this.setInfo} />
				break
			case 'Equipment':
				kind = <Equipment info={this.state.info} setInfo={this.setInfo} />
				break
			case 'Error':
				kind = <Error info={this.state.info} setInfo={this.setInfo} />
				break
			case 'Print':
				kind = <Print info={this.state.info} setInfo={this.setInfo} />
				break
			case 'New User':
				kind = <NewUser info={this.state.info} setInfo={this.setInfo} />
				break
			case 'Other':
				kind = <Other info={this.state.info} setInfo={this.setInfo} />
				break
			case 'Borrow':
				kind = <section className="field-group">
									<h2>Borrow Information</h2>
									<Date
										title='When do you need this equipment?'
										name='request_date'
										value={moment.utc(this.state.info.request_date).format('YYYY-MM-DD')}
										handleChange={this.changeInfo}
									/>
									<Date
										title='When will you return this equipment?'
										name='return_date'
										value={moment.utc(this.state.info.return_date).format('YYYY-MM-DD')}
										handleChange={this.changeInfo}
									/>
									<Textarea
										title='Additional information'
										name='info'
										value={this.state.info.info}
										handleChange={this.changeInfo}
										placeholder='Notes'
									/>
								</section>
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

					{this.state.kind === 'New User' && <button className="primary" onClick={this.newUser} value="Create User">Create User</button>}
					{this.state.kind === 'Borrow' && <button className="primary" onClick={this.borrow} value="Approve">Approve Request</button>}
					<button className={this.state.kind === 'New User' || this.state.kind === 'Borrow' ? '' : "primary"} type="submit" value="Submit">Update</button>
					<button type="button" onClick={this.cancel} value="Cancel">Cancel</button>

					<section className="field-group">
					<h2>Ticket Information</h2>
					<Users
						title='Requestor'
						name='requestor_id'
						value={this.state.requestor_id}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Users
						title='Who is this request for?'
						name='user_id'
						value={this.state.user_id}
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
						options={['Access', 'Borrow', 'Equipment', 'Error', 'Print', 'New User', 'Other']}
						value={this.state.kind}
						handleChange={this.change}
						placeholder='Select One'
					/>
				</section>

					{kind}

					{this.state.kind === 'New User' && <button className="primary" onClick={this.newUser} value="Create User">Create User</button>}
					{this.state.kind === 'Borrow' && <button className="primary" onClick={this.borrow} value="Approve">Approve Request</button>}
					<button className={this.state.kind === 'New User' || this.state.kind === 'Borrow' ? '' : "primary"} type="submit" value="Submit">Update</button>
					<button type="button" onClick={this.cancel} value="Cancel">Cancel</button>
				</form>
			</div>
    )
  }
}

export default EditTicket
