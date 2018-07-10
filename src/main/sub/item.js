import React, { Component } from 'react'
import moment from 'moment'

class Item extends Component {
  render() {
  //  const borrow = date_borrowed.toString()
	let inDate, outDate
	switch (this.props.type) {
		case 'all':
			const {item, type} = this.props.data
      if (item) {
  			inDate = (item.date_returned ? moment(item.date_returned).calendar() : "N/A")
  			outDate = (item.date_borrowed ? moment(item.date_borrowed).calendar() : "N/A")
  			return (
  				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
  					<p style={{ width: '200px'}}>{item.id}</p>
  					<p style={{ width: '200px'}}>{type}</p>
  					<p style={{ width: '200px'}}>{item.outDate}</p>
  					<button style={{ width: '200px'}}>Checkout/Return</button>
  				</div>
  			)
      }
		default:
	    const {id, borrowed, date_borrowed, date_returned} = this.props.data
	    inDate = (date_returned ? moment(date_returned).calendar() : "N/A")
	    outDate = (date_borrowed ? moment(date_borrowed).calendar() : "N/A")
	    const available = (borrowed ? "In Use" : "Available")

			return (
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
					<p style={{ width: '200px'}}>{id}</p>
					<p style={{ width: '200px'}}>{available}</p>
					<p style={{ width: '200px'}}>{outDate}</p>
					<p style={{ width: '200px'}}>{inDate}</p>
					<button style={{ width: '200px'}}>Checkout/Return</button>
				</div>
			)
	}

  }
}

export default Item
