import React, { Component } from 'react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import logo from './logo.svg'

import InventoryList from './inventory/list'
import AddInventory from './inventory/new'
import EditInventory from './inventory/edit'

//import Account from './user/account'
import Dashboard from './user/dashboard'
import AdminNewUser from './admin/user'
import AdminAddEquipment from './admin/equipment'
import PurchaseInventory from './admin/purchase'

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
		this.setState({
			token: localStorage.getItem('access token'),
			user: jwt.decode(localStorage.getItem('access token'))
		})
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
	          <img src={logo} className="App-logo" alt="logo" />
	          <h1 className="App-title">Welcome {this.state.user.first} {this.state.user.last}</h1>
						<nav style={{display: 'flex', flexFlow: 'wrap row'}}>
							<Link to="/">Home</Link>
							<Link to="/inventory">Inventory</Link>
							{this.state.user.role === 'Admin' && <Link to="/inventory/new">New Inventory</Link>}
							{this.state.user.role === 'Admin' && <Link to="/tickets/">Staff Requests</Link>}
							{this.state.user.role !== 'Admin' && <Link to="/tickets/new">Submit Request</Link>}
							{this.state.user.role !== 'Admin' && <Link to="/tickets">View Tickets</Link>}
							<a onClick={this.logout}>Log Out</a>
						</nav>
	        </header>

	        <Switch>
						<Route path="/admin/user" component={AdminNewUser}/>
						<Route path="/admin/equipment" component={AdminAddEquipment}/>

						<Route path="/inventory/edit" component={EditInventory}/>
						<Route path="/inventory/purchase" component={PurchaseInventory}/>
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
