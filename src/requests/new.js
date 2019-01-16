import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import Users from '../form/users.js'
import Select from '../form/select.js'

import Access from './sub/access.js'
import Equipment from './sub/equipment.js'
import Error from './sub/error.js'
import NewUser from './sub/user.js'
import Print from './sub/print.js'
import Other from './sub/other.js'

const jwt = require('jsonwebtoken')

class NewTicket extends Component {
	constructor(props) {
		super(props)
		this.state = {
			requestor_id: jwt.decode(localStorage.getItem('access token')).username,
			kind: '',
			info: {},
			errors: {
				requestor_id: '',
			  kind: '',
			  info: ''
			},
			registered: false,
			validated: false
		}
		this.validate = this.validate.bind(this)
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
		this.cancel = this.cancel.bind(this)
	}

	validate() {
		const errors = {...this.state.errors}
		let success = true
		for (const key in errors) {
			if(errors[key]) {
				success = false
			} else if (errors[key]==='' && !this.state[key]) {
				success = false
				switch(key) {
					case 'kind':
						errors[key] = 'Please make a selection'
						break;
					default:
						errors[key] = 'This field cannot be left blank'
				}
		    this.setState({
					errors: errors
				})
			}
		}
		return success
	}

	cancel() {
		this.setState({
			redirect: <Redirect to={{pathname: '/'}}/>
		})
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
    this.setState({
			[name]: value
		})
	}

	setInfo(info) {
		this.setState({
			info: info
		})
	}

  submit(event) {
		const validated = this.validate()
		if (!validated) {
			alert('Not all fields were filled correctly. Please double check your information and try again.')
		} else {
			const newTicket = {
				user_id: jwt.decode(localStorage.getItem('access token')).username,
				requestor_id: this.state.requestor_id,
				kind: this.state.kind
			}
			if (this.state.kind === 'New User') {
				newTicket.kind = 'NewUser'
			}
			axios.post('http://api.ems.test/tickets', {
				ticket: newTicket,
				kind: this.state.info
			})
	    .then(res => {
				this.setState({
					redirect: <Redirect to={'/tickets/'} />
				})
	    })
	    .catch(error => {
	      alert(error)
	    })
		}
		event.preventDefault()
  }

  render() {
		let kind
		switch(this.state.kind) {
			case 'Access':
				kind = <Access setInfo={this.setInfo} />
				break
			case 'Equipment':
				kind = <Equipment setInfo={this.setInfo} />
				break
			case 'Error':
				kind = <Error setInfo={this.setInfo} />
				break
			case 'Print':
				kind = <Print setInfo={this.setInfo} />
				break
			case 'New User':
				kind = <NewUser setInfo={this.setInfo} />
				break
			case 'Other':
				kind = <Other setInfo={this.setInfo} />
				break
			default:
				kind = ''
		}

    return (
			<div className='requests main'>
				<h1>New Request</h1>
				{ this.state.redirect && this.state.redirect }
				<form className='form' onSubmit={this.submit}>
					<section className="field-group">
						<h2>Requestor</h2>
						<Users
							title='Who is this request for?'
							name='requestor_id'
							value={this.state.requestor_id}
							string={true}
							error={this.state.errors.requestor_id}
							extraOptions={['My Department']}
							handleChange={this.change}
							placeholder='Select One'
						/>
						<Select
							title='What kind of request is this?'
							name='kind'
							error={this.state.errors.kind}
							options={['Access', 'Equipment', 'Error', 'Print', 'New User', 'Other']}
							value={this.state.kind}
							handleChange={this.change}
							placeholder='Select One'
						/>
				</section>
				{kind}

				<button type="submit" className="primary" value="Submit">Submit</button>
				<button type="button" onClick={this.cancel}>Cancel</button>
				</form>
			</div>
    )
  }
}

export default NewTicket
