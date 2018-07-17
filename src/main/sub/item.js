import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Item extends Component {
  constructor(props) {
    super(props)
    this.checkOut = this.checkOut.bind(this)
    this.checkIn = this.checkIn.bind(this)
    this.edit = this.edit.bind(this)
  }
  checkOut() {
    this.props.checkOut(this.props.position)
  }
  checkIn() {
    this.props.checkIn(this.props.position)
  }
  edit() {
    this.props.edit(this.props.position)
  }

  render() {
  	let inDate, outDate
    const {_id, itreID, date_borrowed, date_returned, owner, location, kind} = this.props.data
    inDate = (date_returned ? moment(date_returned).calendar() : "N/A")
    outDate = (date_borrowed ? moment(date_borrowed).calendar() : "N/A")

    switch(this.props.type) {
      case 'admin':
        return (
          <div key={_id}  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
            <p style={{ width: '200px'}}>{itreID}</p>
            <p style={{ width: '200px'}}>{owner.first} {owner.last}</p>
            <p style={{ width: '200px'}}>{location}</p>
              <Link style={{ width: '200px'}} to={{
                pathname: '/inventory/edit',
                state: { item: this.props.data }
              }}>Edit</Link>
          </div>
        )
      case 'account':
        return (
          <div key={_id}  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
            <p style={{ width: '200px'}}>{itreID}</p>
            <p style={{ width: '200px'}}>{kind}</p>
            <p style={{ width: '200px'}}>{outDate}</p>
            { this.props.data.available ?
              <button style={{ width: '200px'}} onClick={this.checkOut}>Checkout</button> :
              <button style={{ width: '200px'}} onClick={this.checkIn}>Return</button>
            }
          </div>
        )
      default:
        return (
          <div key={_id}  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
            <p style={{ width: '200px'}}>{itreID}</p>
              { this.props.data.available ?
                <button style={{ width: '200px'}} onClick={this.checkOut}>Checkout</button> :
                <button style={{ width: '200px'}} onClick={this.checkIn}>Return</button>
              }
            <p style={{ width: '200px'}}>{outDate}</p>
            <p style={{ width: '200px'}}>{inDate}</p>

          </div>
        )
    }


  }
}

export default Item
