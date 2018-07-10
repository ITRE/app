import React, { Component } from 'react'
import axios from 'axios'
import Item from '../sub/item'

class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: []
		}

	}

	componentDidMount() {
    axios.get('http://api.ems.test/inv')
      .then(res => {
        this.setState({ inventory: res.data.data });
      })
  }

  render() {
    return (
			<div>
			<p>[filters]</p>

				<p>Computers</p>
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
	        <p style={{ width: '200px'}}><strong>ID</strong></p>
	        <p style={{ width: '200px'}}><strong>Available</strong></p>
	        <p style={{ width: '200px'}}><strong>Date Out</strong></p>
	        <p style={{ width: '200px'}}><strong>Date In</strong></p>
				</div>
				{ this.state.inventory
					.filter((inv) => (inv.kind === 'computer'))
					.map(inv => (
						<Item type='list' data={inv.item}/>
					))
				}

			<p>Cords</p>
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
	        <p style={{ width: '200px'}}><strong>ID</strong></p>
	        <p style={{ width: '200px'}}><strong>Available</strong></p>
	        <p style={{ width: '200px'}}><strong>Date Out</strong></p>
	        <p style={{ width: '200px'}}><strong>Date In</strong></p>
				</div>
				{ this.state.inventory
					.filter((inv) => (inv.kind === 'cord'))
					.map(inv => (
						<Item type='list' data={inv.item}/>
					))
				}

				<p>Misc</p>
				<div  style={{display: 'flex', flexFlow: 'wrap row', margin: '0 10px'}}>
	        <p style={{ width: '200px'}}><strong>ID</strong></p>
	        <p style={{ width: '200px'}}><strong>Available</strong></p>
	        <p style={{ width: '200px'}}><strong>Date Out</strong></p>
	        <p style={{ width: '200px'}}><strong>Date In</strong></p>
				</div>
				{ this.state.inventory
					.filter((inv) => (inv.kind === 'misc'))
					.map(inv => (
						<Item type='list' data={inv.item}/>
					))
				}


			</div>
    );
  }
}

export default List
