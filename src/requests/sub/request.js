import React, {Component} from 'react'
import moment from 'moment'

class Request extends Component {
	constructor(props) {
		super(props)
    this.edit = this.edit.bind(this)
    this.seen = this.seen.bind(this)
    this.reopen = this.reopen.bind(this)
    this.complete = this.complete.bind(this)
	}

	edit() {
		this.props.edit(this.props.ticket)
	}

	seen() {
		this.props.seen(this.props.ticket, this.props.ind)
	}

	reopen() {
		this.props.seen(this.props.ticket, this.props.ind, 'reopen')
	}

	complete() {
		this.props.complete(this.props.ticket, this.props.ind)
	}

	render(){
		const adminButtons = (
			<div className="admin_buttons">
				{ (this.props.ticket.status !== 'Completed' && this.props.ticket.status !== 'Closed') && <button onClick={this.edit}>Work On Request</button> }
				{ this.props.ticket.status === 'New' && <button onClick={this.seen}>Mark Seen</button> }
				{ this.props.ticket.status === 'Completed' && <button onClick={this.seen}>Reopen</button> }
				{ this.props.ticket.status !== 'Completed' && <button onClick={this.complete}>Mark Complete</button> }
			</div>
		)
		const adminInfo = (
			<div className="admin_info">
				<p>Submitted by: {this.props.ticket.user.first} {this.props.ticket.user.last}</p>
				<p>Priority: {this.props.ticket.priority}</p>
				<p>Status: {this.props.ticket.status}</p>
			</div>
		)
	  return (
	    <div className={ this.props.viewer.role === 'Admin' ? 'admin_'+this.props.ticket.priority : 'staff_ticket' }>
				{ this.props.viewer.role === 'Admin' && adminInfo }
				<p>Ticket for: {this.props.ticket.for}</p>
				<p>Submitted on: {moment(this.props.ticket.added).format('MMMM Do YYYY, h:mm a')}</p>
				<p>Kind: {this.props.ticket.kind}</p>
				{this.props.ticket.status === 'Completed'  && <p>Completed on: {moment(this.props.ticket.completed).format('MMMM Do YYYY, h:mm a')}</p>}
				{ this.props.viewer.role === 'Admin' && adminButtons }
	    </div>
	  )
	}
}

export default Request
