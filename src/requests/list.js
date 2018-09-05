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
		const url = (this.state.user.role === 'Admin' ? 'tickets' : 'me/tickets')
    axios.get(`http://api.ems.test/${url}`, {
			method: "get",
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
      this.setState({
				tickets: res.data.data
			})
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
			console.log(res.data)
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
			<div>
				{ this.state.redirect && this.state.redirect }
				{ !this.state.redirect &&
					this.state.tickets
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
			</div>
    );
  }
}

export default Tickets
