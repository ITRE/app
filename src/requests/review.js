import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
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
		const { user, info } = this.props.location.state
		let batch = []
		ids.map(id => {
			batch.push({
				kind: {
				  account: info.account,
				  need: info.start,
				  type: id.type,
				  tempItem: id._id
				},
				ticket: {
					user_id: user.username, //for
			  	requestor_id: ticket.requestor_id, //by
			  	kind: 'Equipment'
				}
			})
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

    return (
			<div className='main'>
				{ this.state.redirect && this.state.redirect }
				<h1 className='full-column'>Request Review</h1>
				<div className='main-column'>
					<div>
						<p><strong>Type:</strong> {ticket.kind}</p>
						<p><strong>Requested By:</strong> {ticket.user_id}</p>
						<p><strong>Requested For:</strong> {ticket.requestor_id}</p>
						<p><strong>Priority:</strong> {ticket.priority}</p>

						<button className="primary" onClick={this.confirm}>Accept</button>
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
