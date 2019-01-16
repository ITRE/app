import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Request from './sub/request'
const jwt = require('jsonwebtoken')

class Tickets extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tickets: [],
			user: jwt.decode(localStorage.getItem('access token')),
			redirect: false
		}
		this.edit = this.edit.bind(this)
		this.seen = this.seen.bind(this)
		this.complete = this.complete.bind(this)
	}

	componentDidMount() {
//		const url = (this.state.user.role === 'Admin' ? 'tickets' : 'me/tickets')
    axios.get('http://api.ems.test/tickets', {
			method: "get",
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
			switch(this.state.user.role) {
				case 'Admin':
					this.setState({
						tickets: res.data.data
					})
					break
				default:
					this.setState({
						tickets: res.data.data.filter((ticket)=> (
							ticket.user_id === this.state.user.username || ticket.requestor_id === this.state.user.username
						))
					})
			}
    })
		.catch(error => {
			alert(error)
		})
  }

	edit(ticket) {
		if (ticket.kind === 'NewUser') {
			ticket.kind = 'New User'
		}
		this.setState({
			redirect: <Redirect to={{
				pathname: '/tickets/edit',
				state: {ticket: ticket}
			}} />
		})
	}

	seen(ticket, index, reopen) {
		let changedData
		if (reopen) {
			changedData = {
				ticket:{
					status: 'Reopened'
				},
				info: {},
				log: {
					type: 'Quick Reopen',
					staff: this.state.user.first+' '+this.state.user.last,
					note: "Reopened Closed or Completed Request"
				}
			}
		} else {
			changedData = {
				ticket:{
					status: 'Seen'
				},
				info: {},
				log: {
					type: 'Quick Seen',
					staff: this.state.user.first+' '+this.state.user.last,
					note: "Marked Seen"
				}
			}
		}
		axios({
			method: "put",
			url: `http://api.ems.test/tickets/${ticket._id}`,
			data: changedData,
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
			let newTickets = [...this.state.tickets]
			let ticketData = res.data.data[0]
			ticketData.user = newTickets[index].user
			newTickets[index] = ticketData
			newTickets[index].info = res.data.data[1]
      this.setState({
				tickets: newTickets
			})
    })
		.catch(error => {
			alert(error)
		})
	}

	complete(ticket, index) {
		axios({
			method: "put",
			url: `http://api.ems.test/tickets/${ticket._id}`,
			data: {
				ticket:{
					status: 'Completed'
				},
				info: {},
				log: {
					type: 'Quick Complete',
					staff: this.state.user.first+' '+this.state.user.last,
					note: "Marked Completed"
				}
			},
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
			let newTickets = [...this.state.tickets]
			let ticketData = res.data.data[0]
			ticketData.user = newTickets[index].user
			newTickets[index] = ticketData
			newTickets[index].info = res.data.data[1]
      this.setState({
				tickets: newTickets
			})
    })
		.catch(error => {
			alert(error)
		})
	}

  render() {
		return (
			<div className="main">
				<h1>Requests</h1>
				{ this.state.redirect && this.state.redirect }
				<section className="field-group">
					<h2>Open</h2>
					{ this.state.tickets.length > 0 &&
						this.state.tickets
						.filter(a => a.status !== 'Completed' && a.status !== 'Closed')
						.sort((a,b) => {
							const order = {
								'Awaiting Reply': 1,
								'New': 2,
								'Reopened': 3,
								'Seen': 4,
								'In Progress': 5,
								'On Hold': 6, }
							return order[a.status] - order[b.status] || a.added - b.added
						})
						.map( (ticket, index) => {
							return (
								<Request
									key={ticket._id}
									ticket={ticket}
									ind={index}
									viewer={this.state.user}
									edit={this.edit}
									seen={this.seen}
									complete={this.complete}
								/>
							)
						})
					}
				</section>
				<section className="field-group">
					<h2>Closed</h2>

					{ this.state.tickets.length > 0 &&
						this.state.tickets
						.filter(a => a.status === 'Completed' || a.status === 'Closed')
						.sort((a,b) => {
							const order = {
							'Completed': 1,
							'Closed': 2}
							return order[a.status] - order[b.status] || a.added - b.added
						})
						.map( (ticket, index) => {
							return (
								<Request
									key={ticket._id}
									ticket={ticket}
									ind={index}
									viewer={this.state.user}
									edit={this.edit}
									seen={this.seen}
									complete={this.complete}
								/>
							)
						})
					}
				</section>
				{ this.state.tickets.length <= 0 && <p>You have not submitted any requests</p>}
			</div>
    );
  }
}

export default Tickets
