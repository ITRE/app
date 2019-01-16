import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Request from '../requests/sub/request'
import moment from 'moment'

import Table from '../form/table.js'

const jwt = require('jsonwebtoken')

class Dashboard extends Component {
	constructor(props) {
		super(props)
    this.state = {
      inventory: [],
			tickets: [],
			user: {},
			redirect: false
    }
		this.checkIn = this.checkIn.bind(this)
		this.editTicket = this.editTicket.bind(this)
		this.editInv = this.editInv.bind(this)
		this.seen = this.seen.bind(this)
		this.complete = this.complete.bind(this)
  }

	checkIn(index) {
		const data = this.state.inventory[index]
		axios(`http://api.ems.test/inv/`+data._id, {
			method: "put",
			data: {
				inv: {
					available: true,
					user_id: "none",
          program_id: "ITWEB",
					location: 'Room 3628'
				},
				item: {},
				log: {
					type: "Borrow",
					staff: this.state.user.first + ' ' + this.state.user.last,
					note: "Checked in"
				}
			},
			withCredentials: 'include'
		})
    .then(res => {
			const newItem = res.data.data
			let inv = [...this.state.inventory]
			inv[index] = newItem[0]
			inv[index].item = newItem[1]
			this.setState({ inventory: inv })
		})
		.catch(error => {
			console.log(error)
	    alert(error)
	  })
  }

  componentDidMount() {
    const token = localStorage.getItem('access token')
    const user = jwt.decode(token)
		let ticketData

		axios.get('http://api.ems.test/tickets', {
			method: "get",
			headers: {token: 'JWT '+token},
			withCredentials: 'include'
		})
		.then(res => {
			ticketData = res.data.data

			axios.get('http://api.ems.test/inv', {
				method: "get",
				headers: {
					token: 'JWT '+token,
					admin: 'borrowed'
				},
				withCredentials: 'include'
			})
			.then(res => {
				switch(user.role) {
					case 'Admin':
						this.setState({
							tickets: ticketData.filter((ticket)=> (ticket.status !== 'Completed')),
							inventory: res.data.data.filter((inv)=> (!inv.available)),
							user: user
						})
						break
					default:
						this.setState({
							tickets: ticketData.filter((ticket)=> (ticket.user_id === user.username)),
							inventory: res.data.data.filter((inv)=> (inv.user_id === user.username)),
							user: user
						})
						break
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

	editTicket(ticket) {
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

	editInv(item) {
		this.setState({
			redirect: <Redirect to={{
				pathname: '/inventory/edit',
				state: {inv: item}
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
		console.log(this.state.inventory)
		const headers = ['ID', 'Owner', 'Borrowed', '']
		const items = this.state.inventory
			.sort((a,b) => {
				const order = { Computer: 1, Cord: 2, Accessory: 3 }
				return order[a.kind] - order[b.kind]
			})
			.filter(a => a.user.username !== 'none')
			.map((inv, index) => {
				let button
				let id = {
					data: inv,
					label: inv.itreID
				}
				if (this.state.user.role === 'Admin') {
					button = {
						click: () => this.edit(inv),
						label: 'Edit'
					}
				} else {
					button = {
						click: () => this.checkIn(index),
						label: 'Return'
					}
				}

				return ({
					id: id,
					owner: inv.user.username === 'none' ? inv.program.name : inv.user.first + ' ' + inv.user.last,
					date: moment(inv.borrowed).format('M/D'),
					button: button,
					position: index
				})
			})
    return (
			<div className="main flex">
				{ this.state.redirect && this.state.redirect }
				<h1 className='full-column'>Welcome {this.state.user.first} {this.state.user.last}</h1>

				<div className="main-column">
	         <h2>Active Requests</h2>
					 { this.state.tickets.length > 0 &&
						 this.state.tickets.map((ticket, index) => (
							 <Request
								key={ticket._id}
								ticket={ticket}
								ind={index}
								viewer={this.state.user}
								edit={this.editTicket}
								seen={this.seen}
								complete={this.complete}
								/>)
							)
						}
						{ this.state.tickets.length <= 0 && 'You have no active requests at the moment.' }
					</div>
				<div className="side-column">
					<h2>Equipment in Use</h2>
						{ this.state.inventory.length > 0 &&
							<Table
 		 					headers={headers}
 		 					items={items}
 		 					change={this.change}
 		 				/>
						}
				</div>
			</div>
    )
  }
}

export default Dashboard
