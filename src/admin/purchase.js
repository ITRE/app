import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import NewInventory from '../inventory/new.js'

class PurchaseInventory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current: [],
			new: [],
			finished: false
		}
    this.submit = this.submit.bind(this)
    this.push = this.push.bind(this)
	}

	componentDidMount() {
		if (this.props.location.state.newInv) {
			this.setState({
				new: this.props.location.state.newInv,
				current: this.props.location.state.oldInv
			})
		}
	}

	/*	oldInv: this.state.equipment,
		newInv: this.state.newEquipment,
		parent: this.props.location.state */

	push(item) {
		let old = [...this.state.current]
		let newNew = [...this.state.new]

		newNew.splice(newNew.indexOf(item), 1)
		old.push(item)
		this.setState({
			new: newNew,
			current: old
		})
	}

  submit(event) {

  }


  render() {
		const parentState = this.props.location.state.parent

    return (
			<div className="main">
				{this.state.finished && this.state.finished}
				<NewInventory
					user={parentState.user}
					new={this.state.new[0]}
					account={parentState.account}
					push={this.push}
				/>
			</div>
    )
  }
}

export default PurchaseInventory
