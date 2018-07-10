import React, { Component } from 'react'
import axios from 'axios'
import Item from './sub/item'

class Account extends Component {
	constructor(props) {
		super(props)

    this.state = {
      inventory: []
    }
  }

  componentDidMount() {
		const username = this.props.location.state.user
		const url = `http://api.ems.test/users/${username}/inv`
//    axios.get(url)
//      .then(res => {
//				console.log(res)
//        this.setState({ inventory: res.data.data })
//      })
  }

  render() {
    return (
			<div>

        <p>Equipment</p>
        <div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
          <p style={{ width: '200px'}}><strong>ID</strong></p>
          <p style={{ width: '200px'}}><strong>Type</strong></p>
          <p style={{ width: '200px'}}><strong>Date Out</strong></p>
        </div>
	        { this.state.inventory.map(inv => ( <Item type='all' data={inv}/> )) }
			</div>
    )
  }
}

export default Account
