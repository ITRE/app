import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import NewInventory from '../inventory/new.js'
import Equipment from '../form/equipment.js'

class AdminNewEquipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			equipment: {},
			currentEquipment: [],
			newEquipment: [],
			cancel: false
		}
    this.cancel = this.cancel.bind(this)
    this.change = this.change.bind(this)
    this.review = this.review.bind(this)
    this.pushNew = this.pushNew.bind(this)
	}


	change(event) {
		const value = event.target.value
    const name = event.target.name
		let equipment = [...this.state.currentEquipment]
		let list = {...this.state.equipment}
		if(equipment.indexOf(value) !== -1) {
				delete list[value]
			equipment.splice(equipment.indexOf(value), 1)
		} else {
			list[value] = name
			equipment.push(value)
		}
		this.setState({
			equipment: list,
			currentEquipment: equipment
		})
	}

	cancel() {
		this.setState({
			cancel: <Redirect to={{pathname: '/'}}/>
		})
	}

	pushNew(inv) {
		let equipment = [...this.state.newEquipment]
		let list = {...this.state.equipment}
		list[inv.itreID] = inv.item.brand+' '+inv.item.type
		equipment.push(inv)
		this.setState({
			newEquipment: equipment,
			equipment: list
		})
	}
/*
ticket: this.props.ticket,
user: user,
start: this.props.start,
access: this.props.access,
software: this.props.software,
hardware: this.props.hardware,
account: this.props.account,
other: this.props.other
*/
	review() {
		this.setState({
			cancel: <Redirect to={{
				pathname: '/tickets/review',
				state: {
					ticket: this.props.location.state.ticket,
					inventory: {
						oldInv: this.state.currentEquipment,
						newInv: this.state.newEquipment,
						inv: this.state.equipment
					},
					user: this.props.location.state.user,
					info: this.props.location.state.info
				}
			}}/>
		})
	}

  render() {
		let info = []
		let value = {}
		let multiple = {
			computer: false,
			cord: false,
			accessory: false
		}
		const parentState = this.props.location.state

		for (const key in parentState.user) {
			switch(key) {
				case 'username':
				case 'first':
				case 'last':
				case 'role':
					info.push(<p key={key}><strong>{key}:</strong> {parentState.user[key]}</p>)
					break
				default:
					break
			}
		}

		parentState.info.hardware.map(item => {
			switch(item) {
				case ('Desktop Computer' || 'Laptop Computer' || 'Tablet / Mobile Computer' || 'Other'):
					value.computer = this.state.currentEquipment
					multiple.computer = true
					/* falls through */
				case ('Extra Monitor' || 'Phone Connection' || 'Printer' || 'Other'):
					value.cord = this.state.currentEquipment
					multiple.cord = true
					/* falls through */
				case ('Desktop Computer' || 'Laptop Computer' || 'Tablet / Mobile Computer' || 'Extra Monitor' || 'Phone Connection' || 'Printer' || 'Other'):
					value.accessory = this.state.currentEquipment
					multiple.accessory = true
					/* falls through */
				default:
					break
			}
			return item
		})

		return (
			<div className='main'>
				{this.state.cancel && this.state.cancel}
				<div className='main-column'>
					<div>
						<h2>Add Equipment to New User</h2>
						<Equipment
							display={multiple}
							multiple={multiple}
							value={value}
							handleChange={this.change}
						/>
					</div>
					<div>
						<h3>Purchase Equipment for New User</h3>
		        <NewInventory
							user={parentState.user}
							account={parentState.info.account}
							pushNew={this.pushNew}
						/>
					</div>
				</div>

				<div className="side-column">
					<div>
						<h2>Equipment</h2>
							<button onClick={this.review}>Review and Complete</button>
							<button onClick={this.cancel}>Cancel</button>
							{ Object.keys(this.state.equipment).map((key, index) => <p key={index}><strong>{key}: </strong>{this.state.equipment[key]}</p>) }
					</div>
					<div>
							<h3>Requested Hardware</h3>
							{parentState.info.hardware.map(item => <p key={item}>{item}</p>)}
							<h3>Requested Software</h3>
							{parentState.info.software.map(item => <p key={item}>{item}</p>)}
					</div>
					<div>
						<h3>User Info</h3>
						{info}
					</div>
				</div>
			</div>
    )
  }
}

export default AdminNewEquipment
