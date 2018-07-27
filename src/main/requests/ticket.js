import React, { Component } from 'react'
import axios from 'axios'

import Users from '../form/users.js'
import Select from '../form/select.js'

import Access from '../sub/access.js'
import Equipment from '../sub/equipment.js'
import Error from '../sub/error.js'
import NewUser from '../sub/user.js'
import Print from '../sub/print.js'
import Other from '../sub/other.js'

const jwt = require('jsonwebtoken')

class Ticket extends Component {
	constructor(props) {
		super(props)
		this.state = {
			for: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
			kind: '',
			info: {}
		}
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		if (name === 'kind') {

		} if (name === 'tried') {
			let newTried = [...this.state.tried]
			event.target.checked ? newTried.push(value) : newTried.splice(newTried.indexOf(value), 1)
			this.setState({
				tried: newTried
			})
		} else {
	    this.setState({
				[name]: value
			})
		}
	}

	setInfo(info) {
		this.setState({
			info: info
		})
	}

  submit(event) {
		
		const newTicket = {
			user: jwt.decode(localStorage.getItem('access token')).id,
			for: this.state.for,
			kind: this.state.kind
		}
		axios.post('http://api.ems.test/tickets', {
			ticket: newTicket,
			kind: this.state.info
		})
    .then(res => {
      console.log(res.data)
    })
    .catch(error => {
      alert(error)
    })

		event.preventDefault()
		console.log(this.state)
  }

  render() {
		let kind
		switch(this.state.kind) {
			case 'Access':
				kind = <Access test={this.setInfo} />
				break
			case 'Equipment':
				kind = <Equipment test={this.setInfo} />
				break
			case 'Error':
				kind = <Error test={this.setInfo} />
				break
			case 'Print':
				kind = <Print test={this.setInfo} />
				break
			case 'New User':
				kind = <NewUser test={this.setInfo} />
				break
			case 'Other':
				kind = <Other test={this.setInfo} />
				break
			default:
				kind = ''
		}

    return (
			<div className='requests'>
				<form className='form' onSubmit={this.submit}>
					<Users
						title='Who is this request for?'
						name='for'
						value={this.state.for}
						string={true}
						extraOptions={['My Department']}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Select
						title='What kind of rquest is this?'
						name='kind'
						options={['Access', 'Equipment', 'Error', 'Print', 'New User', 'Other']}
						value={this.state.kind}
						handleChange={this.change}
						placeholder='Select One'
					/>
				{kind}
				<br />
				<input type="submit" value="Submit" />
				</form>
			</div>
    )
  }
}

export default Ticket
