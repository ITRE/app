import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import Users from '../form/users.js'
import Programs from '../form/programs.js'
import Select from '../form/select.js'
import Input from '../form/input.js'
import Date from '../form/date.js'

import Computer from './sub/computer.js'
import Cord from './sub/cord.js'
import Accessory from './sub/accessory.js'

const jwt = require('jsonwebtoken')

class EditInventory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itreID: this.props.location.state.inv.itreID ? this.props.location.state.inv.itreID : '',
			serial: this.props.location.state.inv.serial ? this.props.location.state.inv.serial : '',
			bought: this.props.location.state.inv.bought ? moment(this.props.location.state.inv.bought).format('YYYY-MM-DD') : '',
			project: this.props.location.state.inv.project ? this.props.location.state.inv.project : '',
			program: this.props.location.state.inv.program ? this.props.location.state.inv.program : '5ba10e8bab1a991b9b327ab3',
			user: this.props.location.state.inv.user._id ? this.props.location.state.inv.user._id : '5ba2a0450a161d02ca25b959',
			kind: this.props.location.state.inv.kind ? this.props.location.state.inv.kind : '',
			location: this.props.location.state.inv.location ? this.props.location.state.inv.location : '',
			log: {
				type: 'EditInventory',
				staff: jwt.decode(localStorage.getItem('access token')).first+' '+jwt.decode(localStorage.getItem('access token')).last,
				note: ''
			},
			item: {...this.props.location.state.inv.item},
			finished: false
		}
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		console.log(value)
    this.setState({
			[name]: value
		})
	}

	setInfo(item) {
		this.setState({
			item: item
		})
	}

  submit(event) {
		const newInv = {
			itreID: this.state.itreID,
			serial: this.state.serial,
			bought: this.state.bought,
			project: this.state.project,
			program: this.state.program,
			user: this.state.user,
			kind: this.state.kind,
			location: this.state.location
		}
		axios.put(`http://api.ems.test/inv/${this.props.location.state.inv._id}`, {
			inv: newInv,
			item: this.state.item,
			log: this.state.log
		})
    .then(res => {
			this.setState({
				finished: <Redirect to={'/inventory/'} />
			})
    })
    .catch(error => {
      alert(error)
    })

		event.preventDefault()
  }


  render() {
		let kind
		switch(this.state.kind) {
			case 'Computer':
				kind = <Computer item={this.state.item} set={this.setInfo} />
				break
			case 'Cord':
				kind = <Cord item={this.state.item} set={this.setInfo} />
				break
			case 'Accessory':
				kind = <Accessory item={this.state.item} set={this.setInfo} />
				break
			default:
				kind = ''
		}
    return (
			<div className="main">
				{this.state.finished && this.state.finished}
				<h1>Edit Inventory</h1>

				<form className='form' onSubmit={this.submit}>
					<Programs
						title='Owner'
						name='program'
						value={this.state.program}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Users
						title='User'
						name='user'
						value={this.state.user}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Select
						title='Kind'
						name='kind'
						options={['Computer', 'Cord', 'Accessory']}
						value={this.state.kind}
						handleChange={this.change}
						placeholder='Select One'
					/>
					<Input
						title='ITRE ID'
						name='itreID'
						type='text'
						value={this.state.itreID}
						handleChange={this.change}
						placeholder='ITRE 123'
					/>
					<Input
						title='Serial Number'
						name='serial'
						type='text'
						value={this.state.serial}
						handleChange={this.change}
						placeholder='Serial Number'
					/>
					<Date
						title='When was this purchased?'
						name='bought'
						value={this.state.bought}
						handleChange={this.change}
					/>
					<Input
						title='Account Number'
						name='project'
						type='text'
						value={this.state.project}
						handleChange={this.change}
						placeholder='Project Account Number'
					/>
					<Input
						title='Location'
						name='location'
						type='text'
						value={this.state.location}
						handleChange={this.change}
						placeholder='Room Number'
					/>
				{kind}
				<br />
				<input type="submit" value="Submit" />
				</form>
			</div>
    )
  }
}

export default EditInventory
