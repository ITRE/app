import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home'
import Login from './user/login'
import Register from './user/register'
import './css/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App
