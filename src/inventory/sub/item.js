import React, { Component } from 'react'
//import moment from 'moment'

class Item extends Component {
  constructor(props) {
    super(props)
    this.checkOut = this.checkOut.bind(this)
    this.checkIn = this.checkIn.bind(this)
    this.edit = this.edit.bind(this)
    this.info = this.info.bind(this)
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
    const {item, itreID, owner, location, kind, available} = this.props.data
    // this.props.data
    alert(`
      ID: ${itreID}
      Kind: ${kind}
      Owner: ${owner.first} ${owner.last}
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

  render() {
    const {_id, itreID, owner, location, kind} = this.props.data

    return (
      <div key={_id} style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
        <a style={{ flex: 2 }} onClick={ this.info }>{ itreID }</a>
        <p style={{ flex: 2 }}>{ kind }</p>
        <p style={{ flex: 3 }}>{ owner.first } { owner.last }</p>
        <p style={{ flex: 2 }}>{ location }</p>
        <button style={{ flex: 1 }} onClick={ this.edit }>Edit</button>
      </div>
    )
  }
}

export default Item
