import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Login from './user/login'
import Recover from './user/recover'
import Register from './user/register'

class Landing extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			user: {}
		}
	}

  render() {
		return (
			<div className="wrapper">
				{this.state.token && this.state.token}
				<header className="App-header">
					<nav>
						<Link to="/" className='logo orange'><span className="screen-reader">Logo link to Home</span></Link>
					</nav>
        </header>

        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route path="/recover/:id" component={Recover}/>
          <Route path="/recover" component={Recover}/>

          <Route path="/login" component={Login}/>
        </Switch>
			</div>
    )
  }
}

export default Landing
