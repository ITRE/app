import React, { Component } from 'react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import moment from 'moment'

import InventoryList from './inventory/list'
import AddInventory from './inventory/new'
import EditInventory from './inventory/edit'

//import Account from './user/account'
import Dashboard from './user/dashboard'
import EditUser from './user/edit'
import ListUsers from './user/list'
import AdminNewUser from './user/register'

import AdminAddEquipment from './admin/equipment'

import NewTicket from './requests/new'
import EditTicket from './requests/edit'
import ReviewTicket from './requests/review'
import TicketList from './requests/list'

const jwt = require('jsonwebtoken')

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			user: {}
		}

		this.logout = this.logout.bind(this);
	}

  componentWillMount() {
		const tempToken = localStorage.getItem('access token');
		if (tempToken) {
			const tempUser = jwt.decode(tempToken)
			if (moment.unix(tempUser.exp).isAfter(Date.now())) {
				this.setState({
					token: tempToken,
					user: tempUser
				})
			} else {
				Swal({
				  title: 'Token Expired',
				  type: 'warning',
				  text:'Your login session has expired. Redirecting you to the login page.',
				})
				this.logout()
			}
		}
  }

	logout() {
		localStorage.removeItem('access token')
		this.setState({token: null, user: null})
	}

  render() {
		if (this.state.token == null) {
			return (<Redirect to={'/login'} />)
		} else {
			return (
				<div className='wrapper'>
	        <header className="App-header">
						<nav>
							{this.state.user.role === 'Admin' && <Link to="/admin/accounts">Users</Link>}
							<Link to="/inventory">Inventory</Link>
							{this.state.user.role !== 'Admin' && <Link to="/tickets">View Tickets</Link>}
							{this.state.user.role === 'Admin' && <Link to="/tickets/">Requests</Link>}
			        <Link to="/" className='logo orange'><span className="screen-reader">Logo link to Home</span></Link>
							{this.state.user.role === 'Admin' && <Link to="/inventory/new">New Inventory</Link>}
							{this.state.user.role === 'Admin' && <Link to="/admin/user">New User</Link>}
							{this.state.user.role !== 'Admin' && <Link to="/tickets/new">Submit Request</Link>}
							<button className="link nav" onClick={this.logout}>Log Out</button>
						</nav>
	        </header>

	        <Switch>
						<Route path="/admin/user" component={AdminNewUser}/>
						<Route path="/admin/equipment" component={AdminAddEquipment}/>
						<Route path="/admin/accounts" component={ListUsers}/>

						<Route path="/account/edit" component={EditUser}/>

						<Route path="/inventory/edit" component={EditInventory}/>
						<Route path="/inventory/new" component={AddInventory}/>
						<Route path="/inventory" component={InventoryList}/>

						<Route path="/tickets/review" component={ReviewTicket}/>
						<Route path="/tickets/edit" component={EditTicket}/>
						<Route path="/tickets/new" component={NewTicket}/>
						<Route path="/tickets" component={TicketList}/>

	          <Route path="/" component={Dashboard}/>
	        </Switch>
				</div>
	    )
		}
  }
}

export default Home
