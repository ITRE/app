import React, { Component } from 'react'

import NewInventory from '../inventory/new.js'
import Equipment from '../form/equipment.js'

class AdminNewEquipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			equipment: []
		}
    this.cancel = this.cancel.bind(this)
    this.change = this.change.bind(this)
    this.pushNew = this.pushNew.bind(this)
	}


	change(event) {
		const value = event.target.value
		let equipment = [...this.state.equipment]
		if(equipment.includes(value)) {
			equipment.splice(equipment.indexOf(value), 1)
		} else {
			equipment.push(value)
		}
		this.setState({
			equipment: equipment
		})
	}

	cancel() {
	}

	pushNew(inv) {

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
				case 'password':
				case '_id':
				case '__v':
					break
				case 'super':
				case 'supervisor':
					info.push(<p key={parentState.user[key]._id}>supervisor: {parentState.user[key].first} {parentState.user[key].last}</p>)
					break
				default:
					info.push(<p key={key}>{key}: {parentState.user[key]}</p>)
			}
		}

		parentState.hardware.map(item => {
			switch(item) {
				case ('Desktop Computer' || 'Laptop Computer' || 'Tablet / Mobile Computer' || 'Other'):
					value.computer = this.state.equipment
					multiple.computer = true
					break
				case ('Extra Monitor' || 'Phone Connection' || 'Printer' || 'Other'):
					value.cord = this.state.equipment
					multiple.cord = true
					break
				case ('Desktop Computer' || 'Laptop Computer' || 'Tablet / Mobile Computer' || 'Extra Monitor' || 'Phone Connection' || 'Printer' || 'Other'):
					value.accessory = this.state.equipment
					multiple.accessory = true
					break
				default:
					break
			}
			return item
		})

		return (
			<div className='main'>
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
						<h2>Register New Equipment to New User</h2>
		        <NewInventory
							owner={parentState.user}
							pushNew={this.pushNew}
						/>
					</div>
				</div>

				<div className="side-column">
					<div>
						{this.state.equipment.length > 0 &&
							<div>
								<h3>Equipment</h3>
								{this.state.equipment.map(item => <p key={item}>{item}</p>)}
							</div>
						}
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
