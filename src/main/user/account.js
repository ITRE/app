import React, { Component } from 'react'
import axios from 'axios'
import Item from '../sub/item'

const jwt = require('jsonwebtoken')

class Account extends Component {
	constructor(props) {
		super(props)
    this.state = {
      inventory: []
    }
		this.checkIn = this.checkIn.bind(this)
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

  componentDidMount() {
		const url = `http://api.ems.test/me/inv/`
    axios.get(url, {
			method: "get",
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
      .then(res => {
        this.setState({ inventory: res.data.data })
      })
			.catch(error => {
		    alert(error)
		  })
  }

  render() {
		const username = jwt.decode(localStorage.getItem('access token')).id
    return (
			<div>

        <p>Equipment</p>
        <div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
          <p style={{ width: '200px'}}><strong>ID</strong></p>
          <p style={{ width: '200px'}}><strong>Type</strong></p>
          <p style={{ width: '200px'}}><strong>Date Out</strong></p>
          <p style={{ width: '200px'}}><strong>Check Out/Return</strong></p>
        </div>
	        { this.state.inventory && this.state.inventory
						.filter((inv) => (inv.owner._id === username))
						.map((inv, index) => ( <Item type='account' key={inv._id} data={inv} position={index} checkIn={this.checkIn} /> )) }
			</div>
    )
  }
}

export default Account
