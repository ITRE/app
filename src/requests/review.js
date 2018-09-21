import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const jwt = require('jsonwebtoken')

class ReviewTicket extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false
		}
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
	}
/*	oldInv: this.state.equipment,
	newInv: this.state.newEquipment,
	parent: this.props.location.state */
	/*
	ticket: this.props.ticket,
	user: user,
	start: this.props.start,
	access: this.props.access,
	software: this.props.software,
	hardware: this.props.hardware,
	account: this.props.account,
	other: this.props.other
	*/
	complete() {
			const { ticket } = this.props.location.state
		axios.put(`http://api.ems.test/tickets/${ticket._id}`, {
			ticket:{
				status: 'Completed'
			},
			info: {},
			log: {
				type: 'Request Completed',
				staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
				note: ''
			}
		})
		.then(res => {
			this.setState({
				redirect: <Redirect to={'/'} />
			})
		})
		.catch(error => {
			alert(error)
		})
	}
  confirm() {
		const { ticket } = this.props.location.state
		switch(ticket.kind) {
			case 'NewUser':
				this.newUser()
				break
			default:
				this.complete()
				break
		}
  }

	newUser() {
			const { user, inventory } = this.props.location.state
			axios('http://api.ems.test/user', {
				method: "post",
				data: user,
				withCredentials: 'include'
			})
			.then(res => {
				const userID = res.data.data._id
				const editInv = inventory.oldInv.map(item => { return {itreID: item, user: userID}})
				axios.put(`http://api.ems.test/inv/batch`, {
					batch: editInv,
					log: {
						type: 'Assigned to New User',
						staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
						note: res.data.data.first+' '+res.data.data.last
					}
				})
				.then(res => {
					if (inventory.newInv) {
						axios.post(`http://api.ems.test/inv/batch`, {
							batch: inventory.newInv,
							user: userID
						})
						.then(res => {
							this.complete()
						})
						.catch(error => {
							alert(error)
						})
					} else {
						this.complete()
					}
				})
				.catch(error => {
					alert(error)
				})
		})
		.catch(error => {
			alert(error)
		})
	}

	cancel() {
		this.setState({
			redirect: <Redirect to={'/tickets/'} />
		})
	}

	mainInfo(title, info) {
		return (
			<div>
				<h3>{title}</h3>
				{ Object.keys(info).map((key, index) => <p key={index}><strong>{key}: </strong>{info[key]}</p>) }
			</div>
		)
	}

	subInfo(title, info) {
		return (
			<div>
				<h3>{title}</h3>
				{ Object.keys(info).map((key, index) => <p key={index}><strong>{key}: </strong>{info[key]}</p>) }
			</div>
		)
	}

  render() {
		console.log(this.props.location.state)
		const { ticket, inventory, user } = this.props.location.state
		let title, aside, main, side

		switch(ticket.kind) {
			case 'NewUser':
				title = 'User Info'
				main = user
				aside = 'Equipment Assigned'
				side = inventory.inv
				break
			default:
				break
		}
/*
<p><strong>Log:</strong></p>
	{ ticket.log.map((entry, index) => <p key={index}>
		<strong>{entry.staff}: </strong>{entry.type} | {entry.note}<em> - {moment(entry.date).format('M/D h:mm a')}</em>
	</p> ) }
	*/
    return (
			<div className='main'>
				{ this.state.redirect && this.state.redirect }
				<h1 className='full-column'>Request Review</h1>
				<div className='main-column'>
					<div>
						<p><strong>Type:</strong> {ticket.kind}</p>
						<p><strong>Requested By:</strong> {ticket.user.first} {ticket.user.last}</p>
						<p><strong>Requested For:</strong> {ticket.for}</p>
						<p><strong>Priority:</strong> {ticket.for}</p>

						<button onClick={this.confirm}>Accept</button>
						<button onClick={this.cancel}>Cancel</button>
					</div>

					{ aside && this.subInfo(aside, side) }
				</div>

				<div className="side-column">
					{ this.mainInfo(title, main) }
				</div>
			</div>
    )
  }
}

export default ReviewTicket
