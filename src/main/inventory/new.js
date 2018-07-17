import React, { Component } from 'react'
import axios from 'axios'
import Form from './form'

class Add extends Component {
	constructor(props) {
		super(props)
		this.state = {
      users: [],
			inventory: {
				itreID: '',
			  serial: '',
			  bought: '',
			  added: '',
			  updated: '',
			  project: '',
			  owner: '',
			  available: '',
			  borrowed: '',
				item: '',
			  returned: '',
			  kind: 'Computer',
			  location: ''
			},
			computer: {
				brand: '',
			  model: '',
			  type: '',
			  hd: '',
			  ram: '',
			  cpu: '',
			  price: ''
			},
			cord: {
				brand: '',
			  type: '',
			  a: '',
			  b: '',
			  c: '',
			  length: '',
			  price: ''
			},
			accessory: {
				brand: '',
			  model: '',
			  type: '',
			  serial: '',
			  power: '',
			  size: '',
			  price: ''
			}
		}
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		let newItem = {...this.state.inventory}
    axios.get('http://api.ems.test/user')
      .then(res => {
				newItem.owner = res.data.users[0]._id
        this.setState({
					users: res.data.users,
					inventory: newItem
				});
      })
			.catch(error => {
		    alert(error)
		  })
  }

	handleChange(event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;
		let newItem = {...this.state.inventory}
		newItem[name] = value
    this.setState({
			inventory: newItem
		})
  }

  handleSubmit(NEWinv, NEWitem) {
		axios.post('http://api.ems.test/inv', {inv: NEWinv, item: NEWitem})
      .then(res => {
				console.log(res)
      })
			.catch(function (error) {
		    if (error.response.data) {
					alert(error.response.data.msg)
					console.log('response: ', error.response.data.error.message)
		    } else if (error.request) {
		      console.log('request: ', error.request);
		    } else {
		      console.log('Error', error.message);
		    }
		  })
  }

  render() {
    return (
			<div>
				<Form handleSubmit={this.handleSubmit} type='new' />
			</div>
    )
  }
}

export default Add
