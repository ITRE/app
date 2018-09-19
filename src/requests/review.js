import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class ReviewTicket extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false
		}
    this.confirm = this.confirm.bind(this)
	}
/*	oldInv: this.state.equipment,
	newInv: this.state.newEquipment,
	parent: this.props.location.state */
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
  confirm() {

  }


  render() {
		console.log(this.props.location.state)
		const { ticket, info } = this.props.location.state

    return (
			<div className='main'>
				{ this.state.redirect && this.state.redirect }
				<div className='main-column'>
					<div>
						<h2>Request</h2>
						<p><strong>Type:</strong> {ticket.kind}</p>
						<p><strong>Requested By:</strong> {ticket.user.first} {ticket.user.last}</p>
						<p><strong>Requested For:</strong> {ticket.for}</p>
						<p><strong>Priority:</strong> {ticket.for}</p>
						<p><strong>Log:</strong></p>
							{ ticket.log.map((entry, index) => <p key={index}>{entry.note}</p> ) }
					</div>
				</div>

				<div className="side-column">
					<button>Accept</button>
					<button>Cancel</button>
				</div>
			</div>
    )
  }
}

export default ReviewTicket
