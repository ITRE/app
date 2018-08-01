import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Item from './sub/item'

const jwt = require('jsonwebtoken')

class InventoryList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: [],
			user: jwt.decode(localStorage.getItem('access token'))
		}
		this.checkOut = this.checkOut.bind(this)
		this.checkIn = this.checkIn.bind(this)
		this.edit = this.edit.bind(this)
	}

	componentDidMount() {
		const url = (this.state.user.role === 'Admin' ? 'inv' : 'me/inv')
    axios.get(`http://api.ems.test/${url}`, {
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

	checkOut(index) {
		const data = this.state.inventory[index]
		axios(`http://api.ems.test/inv/${data._id}`, {
			method: "put",
			data: {
				inv: {
					available: false,
					owner: this.state.user._id
				},
				item: {},
				log: {
					type: "Borrow",
					staff: this.state.user.first + ' ' + this.state.user.last,
					note: "Checked out"
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

	checkIn(index) {
		const data = this.state.inventory[index]
		axios(`http://api.ems.test/inv/`+data._id, {
			method: "put",
			data: {
				inv: {
					available: true,
					owner: '599c7ba76cd8a107bf6d4c13'
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
		const type = (this.state.user.role ==='Admin'?'admin':'list')
		return (
			<div>
				{ this.state.redirect && this.state.redirect }
				{ !this.state.redirect &&
					<div>
						<p>[filters]</p>
							<div style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
				        <p style={{ flex: 2 }}><strong>ID</strong></p>
				        <p style={{ flex: 2 }}><strong>Kind</strong></p>
				        <p style={{ flex: 3 }}><strong>Owner</strong></p>
				        <p style={{ flex: 2 }}><strong>Room</strong></p>
				        <p style={{ flex: 1 }}><strong>Edit</strong></p>
							</div>
							{ this.state.inventory
								.sort((a,b) => {
									const order = { Computer: 1, Cord: 2, Accessory: 3 }
									return order[a.kind] - order[b.kind]
								})
								.map((inv, index) => (
									<Item
										type={type}
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
				}
			</div>
    );
  }
}

export default InventoryList
