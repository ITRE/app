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
    const {item, itreID, user, location, kind, available} = this.props.data
    // this.props.data
    alert(`
      ID: ${itreID}
      Kind: ${kind},
      User: ${user.first} ${user.last}
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
    const {_id, available, item} = this.props.data
    const owner = this.props.data.user
    const user = jwt.decode(localStorage.getItem('access token'))

    if (user.role === 'Admin') {
      return (
        <div key={_id} style={{display: 'flex', flexFlow: 'row', margin: '0 10px', justify: 'space-between', alignItems: 'center', textAlign: 'left'}}>
          <a onClick={ this.info }>{ item.brand } { item.model }</a>
          <p>{ owner.first } { owner.last }</p>
          <p>{moment(this.props.data.borrowed).format('MMM D h:mm a')}</p>
        </div>
      )
    } else {
        let button
        if (available) {
          button = <button onClick={ this.checkOut }>Borrow</button>
        } else if (owner._id === user.id) {
          button = <button onClick={ this.checkIn }>Return</button>
        } else {
          button = <button disabled >Unavailable</button>
        }
        return (<div key={_id} style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
        <p>{ item.brand } { item.model }</p>
        <p>{ owner.first } { owner.last }</p>
          {button}
        </div>)
    }
  }

  list() {
    const {_id, itreID, location, kind, program, available} = this.props.data
    const owner = (this.props.data.user.first === 'none' ? program.name : this.props.data.user.first+' '+this.props.data.user.last)
    const user = jwt.decode(localStorage.getItem('access token'))
    const id = (user.role === 'Admin' ? <a style={{ flex: 2 }} onClick={ this.info }>{ itreID }</a> : <a style={{ flex: 2 }}>{ itreID }</a>)
    let button

    if (user.role === 'Admin') {
      button = <button style={{ flex: 1 }} onClick={ this.edit }>Edit</button>
    } else if (available) {
      button = <button style={{ flex: 1 }} onClick={ this.checkOut }>Borrow</button>
    } else if (owner._id === user.id) {
      button = <button style={{ flex: 1 }} onClick={ this.checkIn }>Return</button>
    } else {
      button = <button style={{ flex: 1 }} disabled >Unavailable</button>
    }

    return (
      <div key={_id} style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
        { id }
        <p style={{ flex: 2 }}>{ kind }</p>
        <p style={{ flex: 3 }}>{ owner }</p>
        <p style={{ flex: 2 }}>{ location }</p>
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
