import React, {Component} from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'

class Request extends Component {
	constructor(props) {
		super(props)
    this.edit = this.edit.bind(this)
    this.seen = this.seen.bind(this)
    this.reopen = this.reopen.bind(this)
    this.complete = this.complete.bind(this)
    this.info = this.info.bind(this)
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

	info() {
		const {ticket} = this.props
		let info = ''
		const dateSub = moment(ticket.added).format('MMMM Do YYYY, h:mm a')
		for(let item in ticket.info) {
			const keyLabel = item.replace('_', ' ').split(" ").map(a=>a.substring(0,1).toUpperCase()+a.substring(1)).join(' ')
			if (item.charAt(0) === '_') {
				continue;
			} else if (Array.isArray(ticket.info[item])) {
				info += '<p><strong>'+keyLabel+':</strong> <ul class="log">'
				info += ticket.info[item].filter(entry => entry !== ', ').map(entry => '<li>'+entry+'</li>')
				info = info + '</ul></p>'
				continue
			} else if (item === 'super') {
				info += '<p><strong>'+keyLabel+':</strong> '+ticket.info[item].first+' '+ticket.info[item].last+'</p>'
				continue
			} else if (item === 'program') {
				info = info + '<p><strong>'+keyLabel+':</strong> '+ticket.info[item].name+'</p>'
				continue
			}
			if (moment(ticket.info[item], 'YYYY-MM-DDTHH:mm:ss.SSSSZ', true).isValid()) {
				info += '<p><strong>'+keyLabel+':</strong> '+moment(ticket.info[item]).format('MMMM Do YYYY')+'</p>'
				continue
			}
			info += '<p><strong>'+keyLabel+':</strong> '+ticket.info[item]+'</p>'
		}
		if (this.props.viewer.role === 'Admin' && ticket.log.length > 0) {
			info += '<p><strong>Log:</strong> <ul class="log">'
			for (let entry in ticket.log) {
				if (ticket.log[entry] === null) {
					continue
				}
				info += '<li><strong>'+moment(ticket.log[entry].date).format('MMM DD, YYYY h:mm a')+'</strong> | '+ticket.log[entry].type+' - '+ticket.log[entry].staff
				if (ticket.log[entry].note) {
					info = info + '<ul><li>'+ticket.log[entry].note+'</li></ul>'
				}
				info +='</li>'
			}
			info = info + '</ul></p>'
		}

		Swal({
		  title: 'Ticket Info',
		  type: 'info',
		  html:`<div class="popup">
				<p><strong>Date Submitted:</strong> ${dateSub}</p>
				<p><strong>Submitted By:</strong> ${ticket.requestor.first} ${ticket.requestor.last}</p>
				<p><strong>Submitted For:</strong> ${ticket.for.first} ${ticket.for.last}</p>
				<p><strong>Type:</strong> ${ticket.kind}</p>
				<p><strong>Status:</strong> ${ticket.status}</p>
				${info}
			</div>`,
		})
	}

	render(){
		const {ticket} = this.props
		let kind = ticket.kind
		if (kind === 'NewUser') {
			kind = 'New User'
		}
		if (this.props.viewer.role === 'Admin') {
			return(
				<div className="admin">
					<div className={"status "+ticket.status+' '+ticket.priority} onClick={this.info}>
						{ticket.status} - {ticket.priority}
					</div>
					<div className="request-info">
						<p><strong>Ticket for:</strong> {ticket.for.first} {ticket.for.last}</p>
						{ticket.status !== 'Completed' &&
							<p><strong>Submitted on:</strong> {moment(ticket.added).format('MMMM Do YYYY, h:mm a')}</p>}
						{(ticket.status === 'Completed' || ticket.status === 'Closed') &&
							<p><strong>Closed on:</strong> {moment(ticket.log[ticket.log.length-1].date).format('MMMM Do YYYY, h:mm a')}</p>}
						<p><strong>Kind: </strong>{kind}</p>
						<p><strong>Submitted by: </strong>{ticket.requestor.first} {ticket.requestor.last}</p>
						<div className="admin_buttons">
							{ (ticket.status !== 'Completed' && ticket.status !== 'Closed')
								&& <button className="primary" onClick={this.edit}>Work On Request</button> }
							{ ticket.status === 'New' && <button onClick={this.seen}>Mark Seen</button> }
							{ ticket.status === 'Completed' && <button onClick={this.reopen}>Reopen</button> }
							{ ticket.status !== 'Completed' && <button onClick={this.complete}>Mark Complete</button> }
						</div>
					</div>
				</div>
			)
		} else {
		  return (
		    <div className="request-item request-info" onClick={this.info}>
					<p><strong>Ticket for:</strong> {ticket.for.first} {ticket.for.last}</p>
					<p><strong>Kind: </strong>{kind}</p>
					<p><strong>Submitted on:</strong> {moment(ticket.added).format('MMMM Do YYYY, h:mm a')}</p>
					{ticket.status === 'Completed'
						&& <p>Completed on: {moment(ticket.completed).format('MMMM Do YYYY, h:mm a')}</p>}
		    </div>
		  )
		}
	}
}

export default Request
