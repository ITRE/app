import React, { Component } from 'react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import logo from '../logo.svg'
import List from './inventory/list'
import Add from './inventory/new'
import Edit from './inventory/edit'
import Account from './user/account'
//import Equipment from './requests/equipment'
import Ticket from './requests/ticket'
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
				<div>
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
						</nav>
	        </header>
					<br />
					<button onClick={this.logout}>Log Out</button>
					<br />

	        <Switch>
						<Route path="/inventory/edit" component={Edit}/>
						<Route path="/inventory/new" component={Add}/>
						<Route path="/inventory" component={List}/>
						<Route path="/tickets/edit" component={Edit}/>
						<Route path="/tickets/new" component={Ticket}/>
						<Route path="/tickets" component={TicketList}/>
	          <Route path="/" component={Account}/>
	        </Switch>
				</div>
	    )
		}
  }
}

export default Home
