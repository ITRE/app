import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home'
import Landing from './landing'
//import Recover from './recover'
//import Register from './register'
import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter className="App">
        <Switch>
          <Route path="/login" component={Landing}/>
          <Route path="/recover" component={Landing}/>
          <Route path="/register" component={Landing}/>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
