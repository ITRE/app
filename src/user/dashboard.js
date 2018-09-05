import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Item from '../inventory/sub/item'
import Request from '../requests/sub/request'

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
		this.edit = this.edit.bind(this)
		this.seen = this.seen.bind(this)
		this.complete = this.complete.bind(this)
  }

	checkIn(index) {
  //  const token = localStorage.getItem('access token'),
		const data = this.state.inventory[index]
		axios(`http://api.ems.test/inv/`+data._id, {
			method: "put",
			data: {
				inv: {
					available: true,
					owner: '599c7ba76cd8a107bf6d4c13',
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

		switch (user.role) {
			case 'admin':
			case 'Admin':
				axios.get('http://api.ems.test/tickets', {
					method: "get",
					headers: {token: 'JWT '+token},
					withCredentials: 'include'
				})
				.then(res => {
					ticketData = res.data.data
				})
				.catch(error => {
					console.log(error)
					alert(error)
				})

				axios.get('http://api.ems.test/inv', {
					method: "get",
					headers: {
						token: 'JWT '+token,
						admin: 'borrowed'
					},
					withCredentials: 'include'
				})
				.then(res => {
					this.setState({
						tickets: ticketData.filter((ticket)=> (ticket.status !== 'Completed')),
						inventory: res.data.data.filter((inv)=> (!inv.available)),
						user: user
					})
				})
				.catch(error => {
					alert(error)
				})
				break;
			default:
			this.setState({
				user: user
			})
		}
		return
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
			<div className="main" style={{display:'flex', justify: 'space-between'}}>
				{ this.state.redirect && this.state.redirect }
				<div className="main-column">
	         <p>Requests</p>
					 { this.state.tickets.length > 0 &&
						 this.state.tickets.map((ticket, index) => (
							 <Request
								key={ticket._id}
								ticket={ticket}
								ind={index}
								viewer={this.state.user}
								edit={this.edit}
								seen={this.seen}
								complete={this.complete}
								/>)
							)
						}
						{ this.state.tickets.length <= 0 && 'You have no active requests at the moment.' }
					</div>
				<div className="side-column">
					<p>Equipment</p>
						{ this.state.inventory
							.sort((a,b) => {
								const order = { Computer: 1, Cord: 2, Accessory: 3 }
								return order[a.kind] - order[b.kind]
							})
							.map((inv, index) => (
								<Item
									type={'dashboard'}
									key={inv._id}
									data={inv}
									position={index}
									checkOut={this.checkOut}
									checkIn={this.checkIn}
									edit={this.edit}
									/>
							))
						}
				</div>
			</div>
    )
  }
}

export default Dashboard
