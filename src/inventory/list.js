import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

import Table from '../form/table.js'

const jwt = require('jsonwebtoken')

class InventoryList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: [],
			ID: '',
			kind: '',
			owner: '',
			available: '',
			filters: ['Computer', 'Cord', 'Accessory'],
			user: jwt.decode(localStorage.getItem('access token'))
		}
		this.checkOut = this.checkOut.bind(this)
		this.checkIn = this.checkIn.bind(this)
		this.edit = this.edit.bind(this)
		this.change = this.change.bind(this)
	}

	componentDidMount() {
    axios.get(`http://api.ems.test/inv`, {
			method: "get",
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
      this.setState({
				inventory: res.data.data
			})
    })
		.catch(error => {
			alert(error)
		})
  }

	edit(item) {
		this.setState({
			redirect: <Redirect to={{
				pathname: '/inventory/edit',
				state: {inv: item}
			}} />
		})
	}


	change(event) {
		const value = event.target.value
    const name = event.target.name
		if (event.target.type === 'checkbox') {
			let changed = [...this.state[name]]
			event.target.checked ? changed.push(value) : changed.splice(changed.indexOf(value), 1)
			this.setState({
				[name]: changed
			})
		} else {
	    this.setState({
				[name]: value
			})
		}
	}

	filters() {
		return (
			<div>

			</div>
		)
	}
		checkOut(index) {
			const data = this.state.inventory[index]
			Swal({
			  title: 'Borrow Equipment',
				html: `
					<div class="form-group popup">
						<label for="request_date">When do you need this equipment?</label>
						<input id="request_date" type="date" />
					</div>
					<div class="form-group popup">
						<label for="return_date">When will you return this equipment?</label>
						<input id="return_date" type="date" />
					</div>
					<div class="form-group popup">
						<label for="notes">Additional Information</label>
						<input id="notes" type="text" />
					</div>
					<div class="caveat">
						<p>
							Please keep in mind that requests for equipment must be submitted at least a week in advance.
						</p>
						<p>
							ITRE IT & Web will do their best to fulfill any requests, but cannot guarantee
							the availability of any piece of equipment.
						</p>
					</div>`,
			  text: 'When will you return this equipment?',
				showCancelButton: true,
			  confirmButtonText: 'Borrow',
			  showLoaderOnConfirm: true,
			  preConfirm: (date) => {
					const returnDate = document.getElementById('return_date').value
					const requestDate = document.getElementById('request_date').value
					if (!date || returnDate === '' || requestDate === '') {
						Swal.showValidationMessage(
							`Request Failed: Both Return and Request Dates Must be Selected.`
						)
					} else if (moment().isAfter(returnDate) || moment().isAfter(requestDate)) {
						Swal.showValidationMessage(
		          `Request failed: Return and Request dates must be after the current date.`
		        )
					} else if (moment(requestDate).isAfter(returnDate)) {
						Swal.showValidationMessage(
		          `Request failed: Request date must be after the current date.`
		        )
					} else if (moment(requestDate).diff(moment().format('YYYY-MM-DD'), 'days') < 7) {
						Swal.showValidationMessage(
							`Request failed: Requests to borrow equipment must be submitted at least one week in advance.`
						)
					}

			    return axios.post('http://api.ems.test/tickets', {
						ticket: {
							user_id: this.state.user.username,
							requestor_id: this.state.user.username,
							kind: 'Borrow'
						},
						kind: {
							item: data._id,
							return_date: returnDate,
							request_date: requestDate,
							info: document.getElementById('notes').value
						}
					})
			      .then(response => {
			        if (!response.data.success) {
			          throw new Error(response.statusText)
			        }

							axios(`http://api.ems.test/inv/${data._id}`, {
								method: "put",
								data: {
									inv: {
										available: false,
									},
									item: {},
									log: {
										type: "Borrow Request",
										staff: this.state.user.first + ' ' + this.state.user.last,
										note: "Ticket ID: " + response.data.data[0]._id
									}
								},
								withCredentials: 'include'
							})
					    .then(res => {
								const newItem = res.data.data
								let inv = [...this.state.inventory]
								inv[index] = newItem[0]
								inv[index].item = newItem[1]
								this.setState({
									inventory: inv
								})
				        return
							})
							.catch(error => {
				        Swal.showValidationMessage(
				          `Request failed: ${error}`
				        )
						  })
			      })
			      .catch(error => {
			        Swal.showValidationMessage(
			          `Request failed: ${error}`
			        )
			      })

			  },
			  allowOutsideClick: () => !Swal.isLoading()
			}).then((result) => {
				if (result.value) {
			    Swal({
			      title: 'Success',
						type: 'success',
			      text: 'Your request has been submitted for review.'
			    })
			  }
			})
		}

	checkIn(index) {
		const data = this.state.inventory[index]
		axios(`http://api.ems.test/inv/`+data._id, {
			method: "put",
			data: {
				inv: {
					available: true,
					user: '599c7ba76cd8a107bf6d4c13',
					location: 'Room 3628',
					returned: Date.now()
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
	    alert(error)
	  })
  }

  render() {
		const headers = ['ID', 'Kind', 'Owner', 'Room', '']
		const items = this.state.inventory
			.sort((a,b) => {
				const order = { Computer: 1, Cord: 2, Accessory: 3 }
				return order[a.kind] - order[b.kind]
			})
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
					id = {
						click: this.info,
						label: inv.itreID
					}
        } else if (inv.available) {
          button = {
						click: () => this.checkOut(index),
						label: 'Borrow'
					}
        } else if (inv.user.username === this.state.user.username) {
          button = {
						click: () => this.checkIn(index),
						label: 'Return'
					}
        } else {
          button = {
						click: null,
						label: 'Unavailable'
					}
        }

				return ({
					id: id,
					kind: inv.kind,
					owner: inv.user.username === 'none' ? inv.program.name : inv.user.first + ' ' + inv.user.last,
					room: inv.location,
					button: button,
					position: index
				})
			})

		return (
			<div className="main">
				<h1>Inventory</h1>
					{ this.state.redirect && this.state.redirect }
				{ items.length > 0 &&
				<Table
					headers={headers}
					items={items}
					filterOptions={['Computer', 'Cord', 'Accessory']}
					filters={this.state.filters}
					filterCategory={'kind'}
					change={this.change}
				/>
				}
			</div>
		)
  }
}

export default InventoryList
