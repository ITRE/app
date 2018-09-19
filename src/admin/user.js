import React, { Component } from 'react'

import Register from '../user/register.js'

class AdminNewUser extends Component {
	constructor(props) {
		super(props)
    this.cancel = this.cancel.bind(this)
	}

	cancel() {
	}

  render() {
    return (
			<div className=''>
        <Register
					type='Admin'
					ticket={this.props.location.state.ticket}
					access= {this.props.location.state.info.access}
					software= {this.props.location.state.info.software}
					hardware= {this.props.location.state.info.hardware}
					account= {this.props.location.state.info.account}
					other= {this.props.location.state.info.other}
					username={this.props.location.state.info.username}
					password={'SOMEPASSWORD'}
					role={this.props.location.state.info.role}
					email={this.props.location.state.info.email}
					phone={this.props.location.state.info.phone}
					first={this.props.location.state.info.first}
					last={this.props.location.state.info.last}
					room={this.props.location.state.info.room}
					program={this.props.location.state.info.program}
					super={this.props.location.state.info.super}
				/>
			</div>
    )
  }
}

export default AdminNewUser
