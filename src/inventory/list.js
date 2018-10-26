import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Item from './sub/item'
import Checkbox from '../form/checkbox.js'

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
		console.log(value)
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
				<Checkbox
					title='Kind'
					name='kind'
					options={['Computer', 'Cord', 'Accessory']}
					selectedOptions={this.state.filters}
					handleChange={this.change}
					buttons={true}
				/>
			</div>
		)
	}

	checkOut(index) {
		const data = this.state.inventory[index]
		axios(`http://api.ems.test/inv/${data._id}`, {
			method: "put",
			data: {
				inv: {
					available: false,
					user: this.state.user.id,
					location: 'Room '+this.state.user.room,
					borrowed: Date.now()
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
		const type = (this.state.user.role ==='admin'?'admin':'list')
		return (
			<div className="main">
				{ this.state.redirect && this.state.redirect }
				<h1>Inventory</h1>
				{ !this.state.redirect &&
					<div>
						{this.filters()}
							<div className="flex">
				        <p className="column"><strong>ID</strong></p>
				        <p className="column"><strong>Kind</strong></p>
				        <p className="column"><strong>Owner</strong></p>
				        <p className="column"><strong>Room</strong></p>
				        <p className="column"></p>
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
