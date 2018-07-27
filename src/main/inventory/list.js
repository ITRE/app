import React, { Component } from 'react'
import axios from 'axios'
import Item from '../sub/item'
const jwt = require('jsonwebtoken')

class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: []
		}
		this.checkOut = this.checkOut.bind(this)
		this.checkIn = this.checkIn.bind(this)
	}

	componentDidMount() {
    axios.get('http://api.ems.test/inv')
    .then(res => {
      this.setState({ inventory: res.data.data });
    })
		.catch(error => {
			alert(error)
		})
  }

	checkOut(index) {
  //  const token = localStorage.getItem('access token'),
		const data = this.state.inventory[index]
    const user = jwt.decode(localStorage.getItem('access token'))
		axios(`http://api.ems.test/inv/`+data._id, {
			method: "put",
			data: {
				inv: {
					available: false,
					owner: user._id
				},
				item: {},
				log: {
					type: "Borrow",
					staff: user.first + ' ' + user.last,
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
			console.log(error)
	    alert(error)
	  })
  }

	checkIn(index) {
  //  const token = localStorage.getItem('access token'),
		const data = this.state.inventory[index]
    const user = jwt.decode(localStorage.getItem('access token'))
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
					staff: user.first + ' ' + user.last,
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

  render() {
    const user = jwt.decode(localStorage.getItem('access token'))
		const type = (user.role ==='Admin'?'admin':'list')
		let computers = []
		let cords = []
		let accessories = []

		this.state.inventory
			.map((inv, index) => {
				switch(inv.kind) {
					case 'Cord':
						cords.push(<Item type={type} key={inv._id} data={inv} position={index} checkOut={this.checkOut} checkIn={this.checkIn} />)
						break
					case 'Accessory':
						accessories.push(<Item type={type} key={inv._id} data={inv} position={index} checkOut={this.checkOut} checkIn={this.checkIn} />)
						break
					default:
						computers.push(<Item type={type} key={inv._id} data={inv} position={index} checkOut={this.checkOut} checkIn={this.checkIn} />)
				}
				return inv
			})

		return (
			<div>
			<p>[filters]</p>

				<p>Computers</p>
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
	        <p style={{ width: '200px'}}><strong>ID</strong></p>
	        <p style={{ width: '200px'}}><strong>Available</strong></p>
	        <p style={{ width: '200px'}}><strong>Date Out</strong></p>
	        <p style={{ width: '200px'}}><strong>Date In</strong></p>
				</div>
				{ computers }

			<p>Cords</p>
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
	        <p style={{ width: '200px'}}><strong>ID</strong></p>
	        <p style={{ width: '200px'}}><strong>Available</strong></p>
	        <p style={{ width: '200px'}}><strong>Date Out</strong></p>
	        <p style={{ width: '200px'}}><strong>Date In</strong></p>
				</div>
				{ cords }

				<p>Accessories</p>
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
	        <p style={{ width: '200px'}}><strong>ID</strong></p>
	        <p style={{ width: '200px'}}><strong>Available</strong></p>
	        <p style={{ width: '200px'}}><strong>Date Out</strong></p>
	        <p style={{ width: '200px'}}><strong>Date In</strong></p>
				</div>
				{ accessories }


			</div>
    );
  }
}

export default List
