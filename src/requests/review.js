import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

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
			Swal({
				title: error.response.status+' Error',
				type: 'error',
				text:error.response.data.msg,
			})
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

	newInv(ids) {
		const { user, ticket, info } = this.props.location.state
		let batch = []
		ids.map(id => {
			batch.push({
				kind: {
				  account: info.account,
				  need: info.start,
				  type: id.item.type,
				  tempItem: id._id
				},
				ticket: {
					user_id: user.username, //for
			  	requestor_id: ticket.requestor_id, //by
			  	kind: 'Equipment'
				}
			})
			return id
		})
		axios.post(`http://api.ems.test/tickets/purchases`, {
			batch: batch,
			user: user
		})
		.then(res => {
			this.complete()
		})
		.catch(error => {
			Swal({
				title: error.response.status+' Error',
				type: 'error',
				text:error.response.data.msg,
			})
		})
	}

	newUser() {
			const { user, inventory } = this.props.location.state
			axios('http://api.ems.test/user', {
				method: "post",
				data: user,
				withCredentials: 'include'
			})
			.then(res => {
				const userID = res.data.data
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
							this.newInv(res.data.data)
						})
						.catch(error => {
							Swal({
							  title: error.response.status+' Error',
							  type: 'error',
							  text:error.response.data.msg,
							})
						})
					} else {
						this.complete()
					}
				})
				.catch(error => {
					Swal({
					  title: error.response.status+' Error',
					  type: 'error',
					  text:error.response.data.msg,
					})
				})
		})
		.catch(error => {
			Swal({
				title: error.response.status+' Error',
				type: 'error',
				text:error.response.data.msg,
			})
		})
	}

	cancel() {
		this.setState({
			redirect: <Redirect to={'/tickets/'} />
		})
	}

	subInfo(title, info) {
		return (
			<section className="field-group">
				<h2>{title}</h2>
				{ Object.keys(info).map((key, index) => <p key={index}><strong>{key}: </strong>{info[key]}</p>) }
			</section>
		)
	}

  render() {
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

    return (
			<div className='main flex'>
				{ this.state.redirect && this.state.redirect }
				<h1 className='full-column'>Request Review</h1>
				<div className='main-column'>
					<section className="field-group">
						<h2>Ticket Information</h2>
						<p><strong>Type:</strong> {ticket.kind}</p>
						<p><strong>Requested By:</strong> {ticket.user_id}</p>
						<p><strong>Requested For:</strong> {ticket.requestor_id}</p>
						<p><strong>Priority:</strong> {ticket.priority}</p>
					</section>
					{ aside && this.subInfo(aside, side) }
					<section className="field-group">
						<button className="primary" onClick={this.confirm}>Accept</button>
						<button onClick={this.cancel}>Cancel</button>
					</section>
				</div>

				<div className="side-column">
					{ this.subInfo(title, main) }
				</div>
			</div>
    )
  }
}

export default ReviewTicket
