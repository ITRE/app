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
					username={this.props.location.state.info.username}
					password={'SOMEPASSWORD'}
					email={this.props.location.state.info.email}
					phone={this.props.location.state.info.phone}
					first={this.props.location.state.info.first}
					last={this.props.location.state.info.last}
					program={this.props.location.state.info.program}
					super={this.props.location.state.info.super}
				/>
			</div>
    )
  }
}

export default AdminNewUser
