import React, { Component } from 'react'
import axios from 'axios'
import Field from './field'

const jwt = require('jsonwebtoken')

class Form extends Component {
	constructor(props) {
		super(props)
		this.state = {
      users: [],
			inventory: {
				itreID: '',
			  serial: '',
			  bought: '',
			  project: '',
			  owner: '',
			  kind: 'Computer',
			  location: ''
			},
			log: {
				staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
				type: '',
				note: ''
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
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		let subItem, newItem, kind
		axios.get('http://api.ems.test/user')
      .then(res => {
				if (this.props.item) {
					newItem = {...this.state.inventory, ...this.props.item}
					delete newItem.__v
					delete newItem.log
					subItem = { ...this.state[newItem.kind.toLowerCase()], ...this.props.item.item}
					delete subItem.__v
					newItem.owner = this.props.item.owner._id
				} else {
					newItem = {...this.state.inventory}
					subItem = {...this.state[kind]}
					newItem.owner = res.data.users[0]._id
				}
				kind = newItem.kind.toLowerCase()
				newItem.item = subItem._id
				for (const key in newItem) {
					if (newItem[key]) {
						continue
					} else {
						newItem[key] = ''
					}
				}
				for (const key in subItem) {
					if (subItem[key]) {
						continue
					} else {
						subItem[key] = ''
					}
				}
        this.setState({
					users: res.data.users,
					inventory: newItem,
					[kind]: subItem
				});
      })
			.catch(error => {
		    alert(error)
		  })
  }

	fields(type) {
		let fieldsArray = []
		for (const key in this.state[type]) {
			if (key === 'owner' || key === 'kind' || key === '_id' || key === 'item' || key === 'log') {
				continue
			}
			fieldsArray.push(
				<Field
					key={key}
					id={key}
					name={key.charAt(0).toUpperCase() + key.slice(1)}
					field={this.state[type][key]}
					handleChange={this.change.bind(this, type)}
				/>
			)
		}
    return fieldsArray
	}

	change(type, event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    const name = event.target.name
		let newItem = {...this.state[type]}
		newItem[name] = value
    this.setState({
			[type]: newItem
		})
	}

  handleSubmit(event) {
		const item = this.state.inventory.kind.toLowerCase()
		this.props.handleSubmit(this.state.inventory, this.state[item], this.state.log)
		event.preventDefault()
  }

  render() {
    return (
			<div>
				<form onSubmit={this.handleSubmit}>

					<label htmlFor="owner">
						Owner:
						<select value={this.state.inventory.owner} name="owner" onChange={this.change.bind(this, 'inventory')}>
							{ this.state.users
								.map(user => (
									<option key={user._id} value={user._id}>{user.first} {user.last}</option>
								))
							}
						</select>
					</label>

					<label htmlFor="kind">
						Kind:
						<select value={this.state.inventory.kind} disabled={this.props.item ? true : false} name="kind" onChange={this.change.bind(this, 'inventory')}>
							<option value='Computer'>Computer</option>
							<option value='Cord'>Cord</option>
							<option value='Accessory'>Accessory</option>
						</select>
					</label>

					{this.fields('inventory')}
					{this.fields(this.state.inventory.kind.toLowerCase())}

					<label htmlFor="type">
						Type of Change:
						<input value={this.state.log.type} name="type" onChange={this.change.bind(this, 'log')} />
					</label>

					<label htmlFor="note">
						Note:
						<textarea value={this.state.log.note} name="note" onChange={this.change.bind(this, 'log')} />
					</label>

          <input type="submit" value="Submit" />
        </form>
			</div>
    )
  }
}

export default Form
