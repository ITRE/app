import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './main/home'
import Login from './main/login'
import './css/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App
