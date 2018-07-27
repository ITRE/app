import React, { Component } from 'react'
//import axios from 'axios'
import Form from './form.js'

const jwt = require('jsonwebtoken')

class Equipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				requestor: {
					data: jwt.decode(localStorage.getItem('access token')).first + ' ' + jwt.decode(localStorage.getItem('access token')).last,
					kind: 'text',
					error: false
				},
	      tried: {
					data: [],
					kind: 'checkbox',
					options: {
						offOn: 'Tried turning it off and on again',
						update: 'Checked for system updates',
						ncsu: 'Connected to NCSU or EDURoam WIFI (If Internet Issue)'
					},
					error: false
				},
	      kind: {
					data: 'Error',
					kind: 'select',
					options: {
						Access: 'Access',
						Equipment: 'Equipment',
						Error: 'Error',
						Print: 'Print',
						NewUser: 'NewUser',
						Other: 'Other'
					},
					error: false
				}
			},
			access: {
				type: 'desktop',
	      budget: '',
	      account: '',
	      need: ''
			},
			equipment: {
				type: {
					data: '',
					kind: 'text',
					error: false
				},
	      budget:  {
					data: '',
					kind: 'text',
					error: false
				},
	      account:  {
					data: '',
					kind: 'text',
					error: false
				},
	      need:  {
					data: '',
					kind: 'date',
					error: false
				}
			},
			error: {
	      type:  {
					data: '',
					kind: 'select',
					options: {
						start: 'Start Up / Boot',
						monitor: 'Monitor',
						microsoft: 'Microsoft Office',
						internet: 'Email / Web / Internet',
						remote: 'Remote Desktop',
						phone: 'Phone',
						mobile: 'Laptop / Mobile',
						other: 'Other'
					},
					error: false
				},
	      desc:  {
					data: '',
					kind: 'textarea',
					error: false
				},
	      start:  {
					data: '',
					kind: 'date',
					error: false
				}
			},
			print: {
				type: 'desktop',
	      budget: '',
	      account: '',
	      need: ''
			},
			user: {
				type: 'desktop',
	      budget: '',
	      account: '',
	      need: ''
			},
			other: {
				type: 'desktop',
	      budget: '',
	      account: '',
	      need: ''
			},
			reroute: false,
			errorMessage: ''
		}
    this.submit = this.submit.bind(this)
    this.change = this.change.bind(this)
	}

	change(event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    const name = event.target.name
		const tag = event.target.dataset.tag.toLowerCase()
		let newData = {...this.state[tag]}
		if (name === 'tried') {
			if (value) {
				newData[name].data.push(event.target.value)
			} else {
				for( var i = 0; i <= newData[name].data.length-1; i++){
				   if ( newData[name].data[i] === event.target.value) {
				     newData[name].data.splice(i, 1);
				   }
				}
			}
		} else {
			newData[name].data = value
		}
    this.setState({
			[tag]: newData
		})
	}

  submit(event) {
		event.preventDefault()
		let request = {...this.state.data}
		let newRequest = {}
		let newKind = {}
		let kind
		switch(this.state.data.kind.data) {
			case 'Access':
				kind = {...this.state.access}
				break
			case 'Equipment':
				kind = {...this.state.equipment}
				break
			case 'Error':
				kind = {...this.state.error}
				break
			case 'Print':
				kind = {...this.state.print}
				break
			case 'NewUser':
				kind = {...this.state.user}
				break
			default:
				kind = {...this.state.other}
		}

		for (const key in request) {
			if (!request[key].data) {
				request[key].error = true
				this.setState({
					errorMessage: 'Your request is missing information. Please check before submitting again.',
					data: request
				})
				return
			} else {
				request[key].error = false
				newRequest[key] = request[key].data
				this.setState({
					data: request
				})
			}
		}

		for (const key in kind) {
			if (!kind[key].data) {
				kind[key].error = true
				this.setState({
					errorMessage: 'Your request is missing information. Please check before submitting again.',
					[this.state.data.kind.data]: kind
				})
				return
			} else {
				kind[key].error = false
				newKind[key] = request[key].data

				this.setState({
					[this.state.data.kind.data]: kind
				})
			}
		}

		/*
		request.user = jwt.decode(localStorage.getItem('access token')).id
		axios.post('http://api.ems.test/tickets/request', request)
    .then(res => {
			alert(`Request Successfully Submitted.
				type: ${res.data.data.type}
				budget: ${res.data.data.budget}
				account: ${res.data.data.account}
				need: ${res.data.data.need}`)
    })
		.catch(function (error) {
	    if (error.response.data) {
				alert(error.response.data.msg)
				this.setState({errorMessage: `There was an error with your request. ${error.response.data.msg}`})
				console.log('response: ', error.response.data.error.message)
	    } else if (error.request) {
	      console.log('request: ', error.request);
	    } else {
	      console.log('Error', error.message);
	    }
	  })
		*/
		console.log(newRequest)
  }

  render() {
		let kind
		switch(this.state.data.kind.data) {
			case 'Access':
				kind = this.state.access
				break
			case 'Equipment':
				kind = this.state.equipment
				break
			case 'Error':
				kind = this.state.error
				break
			case 'Print':
				kind = this.state.print
				break
			case 'NewUser':
				kind = this.state.user
				break
			default:
				kind = this.state.other
		}
    return (
			<div>
				<Form fields={this.state.data} kind={kind} handleChange={this.change} handleSubmit={this.submit} />
				<p>{this.state.errorMessage}</p>
			</div>
    )
  }
}

export default Equipment
