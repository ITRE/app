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
		let userInfo = []
		let value = {}
		let multiple = {
			computer: false,
			cord: false,
			accessory: false
		}
		const {user, info} = this.props.location.state

		for (const key in user) {
			switch(key) {
				case 'username':
				case 'first':
				case 'last':
				case 'role':
				case 'program_id':
					userInfo.push(<p key={key}><strong>{key}:</strong> {user[key]}</p>)
					break
				default:
					break
			}
		}

		info.hardware.map(item => {
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
			<div className='main flex'>
				{this.state.cancel && this.state.cancel}
				<div className='main-column'>
					<div>
						<h1>Add Equipment to New User</h1>
						<Equipment
							display={multiple}
							multiple={multiple}
							value={value}
							handleChange={this.change}
						/>
					</div>
					<section className="field-group">
						<h2>Purchase Equipment for New User</h2>
		        { this.props.location.state.info.account &&
							<NewInventory
								user={user}
								account={info.account}
								pushNew={this.pushNew}
							/>
						}
						{ !this.props.location.state.info.account &&
							<p>New equipment cannot be purchased without an account number.</p>
						}
					</section>
				</div>

				<div className="side-column">
					<div>
						<h2>Equipment</h2>
							<button className="primary" onClick={this.review}>Review and Complete</button>
							<button onClick={this.cancel}>Cancel</button>
							{ Object.keys(this.state.equipment).map((key, index) => <p key={index}><strong>{key}: </strong>{this.state.equipment[key]}</p>) }
					</div>
					<div>
							<h3>Requested Hardware</h3>
							{info.hardware.map(item => <p key={item}>{item}</p>)}
							<h3>Requested Software</h3>
							{info.software.map(item => <p key={item}>{item}</p>)}
					</div>
					<div>
						<h3>User Info</h3>
						{userInfo}
					</div>
				</div>
			</div>
    )
  }
}

export default AdminNewEquipment
