import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Users from '../form/users.js'
import Programs from '../form/programs.js'
import Select from '../form/select.js'
import Input from '../form/input.js'
import Date from '../form/date.js'

import Computer from './sub/computer.js'
import Cord from './sub/cord.js'
import Accessory from './sub/accessory.js'

//const jwt = require('jsonwebtoken')

class NewInventory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itreID: '',
			serial: '',
			bought: '',
			project: '',
			program_id: '',
			user: '',
			kind: 'Computer',
			location: '',
			item: {},
			none: false,
			finished: false
		}
    this.submit = this.submit.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.change = this.change.bind(this)
		this.cancel = this.cancel.bind(this)
	}

	cancel() {
		this.setState({
			finished: <Redirect to={{pathname: '/'}}/>
		})
	}

  componentDidMount() {
		if(this.props.user) {
			this.setState({
				program_id: this.props.user.program_id,
				location: this.props.user.room,
				project: this.props.account,
				none: true
			})
		}
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
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
			program_id: this.state.program_id,
			user: this.state.user,
			kind: this.state.kind,
			location: this.state.location
		}

		if(this.props.pushNew) {
			newInv.item = this.state.item
			this.props.pushNew(newInv)
			this.setState({
				itreID: '',
				serial: '',
				bought: '',
				program_id: this.props.user.program_id,
				location: this.props.user.room,
				project: this.props.account,
				user: '',
				kind: 'Computer',
				item: {},
			})
			window.scrollTo(0, 0)
		} else {
			axios.post(`http://api.ems.test/inv/`, {
				inv: newInv,
				item: this.state.item
			})
	    .then(res => {
				this.setState({
					finished: <Redirect to={'/inventory/'} />
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

		const form = (<form className='form' onSubmit={this.submit}>
		<section className="field-group">
			<h2>Owner Information</h2>
			<Programs
				title='Owner'
				name='program_id'
				value={this.state.program_id}
				handleChange={this.change}
				placeholder='Select One'
			/>
		{ !this.state.none &&
			<Users
				title='User'
				name='user'
				value={this.state.user}
				handleChange={this.change}
				placeholder='Select One'
			/> }
		</section>
		<section className="field-group">
			<h2>General Information</h2>
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
				placeholder='Account Number'
			/>
			<Input
				title='Location'
				name='location'
				type='text'
				value={this.state.location}
				handleChange={this.change}
				placeholder='Room Number'
			/>
		</section>
			{kind}
			<br />
			<button type="submit" className="primary" value="Submit">Create</button>
			<button type="button" onClick={this.cancel}>Cancel</button>
		</form>)

		if (this.props.pushNew) {
			return (
				<section >
					<p>Creates a placeholder in the equipment database and opens a new purchase request ticket.</p>
					{form}
				</section>
			)
		} else {
	    return (
				<div className="main">
					{this.state.finished && this.state.finished}
					<h1>New Inventory</h1>
					{form}
				</div>
	    )
		}
  }
}

export default NewInventory
