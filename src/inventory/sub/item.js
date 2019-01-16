import React, { Component } from 'react'
import moment from 'moment'
const jwt = require('jsonwebtoken')

class Item extends Component {
  constructor(props) {
    super(props)
    this.checkOut = this.checkOut.bind(this)
    this.checkIn = this.checkIn.bind(this)
    this.edit = this.edit.bind(this)
    this.info = this.info.bind(this)
    this.dash = this.dash.bind(this)
    this.list = this.list.bind(this)
  }

  checkOut() {
    this.props.checkOut(this.props.position)
  }

  checkIn() {
    this.props.checkIn(this.props.position)
  }

  edit() {
    this.props.edit(this.props.data)
  }

  info() {
    const {item, itreID, user, program, location, kind, available} = this.props.data
    const owner = (user.first === 'none' ? program.name : user.first+' '+user.last)
    alert(`
      ID: ${itreID}
      Kind: ${kind}
      User: ${owner}
      Room: ${location}
      Brand: ${item.brand}
      Model: ${item.model}
      Type: ${item.type}
      Hard Drive: ${item.hd}
      RAM: ${item.ram}
      CPU: ${item.cpu}
      Price: ${item.price}
      Available: ${available}
    `)
  }

  dash() {
    const {_id, available, program, item} = this.props.data
    const owner = (this.props.data.user.first === 'none' ? program.name : this.props.data.user.first+' '+this.props.data.user.last)
    const user = jwt.decode(localStorage.getItem('access token'))
    let button

    if (user.role === 'Admin') {
      return (
        <div key={_id} className="line-item">
          <button className="link table_column" onClick={ this.info }>{ item.brand } { item.model }</button>
          <p className="table_column">{ owner }</p>
          <p className="table_column date">{moment(this.props.data.borrowed).format('M/D')}</p>
          <p className="table_column"><button className="table_column" onClick={ this.edit }>Edit</button></p>
        </div>
      )
    } else {
        if (available) {
          button = <button onClick={ this.checkOut }>Borrow</button>
        } else if (this.props.data.user.username === user.username) {
          button = <button onClick={ this.checkIn }>Return</button>
        } else {
          button = <button disabled >Unavailable</button>
        }
        return (<div key={_id} style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
        <p>{ item.brand } { item.model }</p>
        <p>{ owner }</p>
          {button}
        </div>)
    }
  }

  list() {
    const {_id, itreID, location, kind, program, available} = this.props.data
    const owner = (this.props.data.user.first === 'none' ? program.name : this.props.data.user.first+' '+this.props.data.user.last)
    const user = jwt.decode(localStorage.getItem('access token'))
    const id = (user.role === 'Admin' ?
      <button className="link column" onClick={ this.info }>{ itreID }</button> :
      <button className="link column">{ itreID }</button>)
    let button

    if (user.role === 'Admin') {
      button = <button className="column" onClick={ this.edit }>Edit</button>
    } else if (available) {
      button = <button className="column" onClick={ this.checkOut }>Borrow</button>
    } else if (this.props.data.user.username === user.username) {
      button = <button className="column" onClick={ this.checkIn }>Return</button>
    } else {
      button = <button className="column" disabled >Unavailable</button>
    }

    return (
      <div key={_id} className="line-item">
        { id }
        <p className="column">{ kind }</p>
        <p className="column">{ owner }</p>
        <p className="column">{ location }</p>
        { button }
      </div>
    )
  }


  render() {
    switch (this.props.type) {
      case 'dashboard':
        return this.dash()
      default:
        return this.list()
    }

  }
}

export default Item
