import React, { Component } from 'react'
import axios from 'axios'
import Request from '../sub/request'
const jwt = require('jsonwebtoken')

class Tickets extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tickets: [],
			user: jwt.decode(localStorage.getItem('access token'))
		}
	}

	componentDidMount() {
		const url = (this.state.user.role === 'admin' ? 'tickets' : 'me/tickets')
    axios.get(`http://api.ems.test/${url}`, {
			method: "get",
			headers: {token: 'JWT '+localStorage.getItem('access token')},
			withCredentials: 'include'
		})
    .then(res => {
      this.setState({ tickets: res.data.data });
    })
		.catch(error => {
			alert(error)
		})
  }


  render() {
		return (
			<div>
				{ this.state.tickets
					.map( ticket => {
						return (<Request ticket={ticket} />)
					})
				}
			</div>
    );
  }
}

export default Tickets
