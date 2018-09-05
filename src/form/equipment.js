import React, { Component } from 'react'
import axios from 'axios'

class EquipmentSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			computers: [],
			cords: [],
			accessories: []
		}
	}

  componentDidMount() {
		let computers = []
		let cords = []
		let accessories = []
    axios.get('http://api.ems.test/inv')
    .then(res => {
			res.data.data.map(item => {
				switch(item.kind) {
					case 'Computer':
						computers.push(item)
						break
					case 'Cord':
						cords.push(item)
						break
					case 'Accessory':
						accessories.push(item)
						break
					default:
						alert('error determining item kind')
				}
				return item
			})

      this.setState({
				computers: computers,
				cords: cords,
				accessories: accessories
      });
    })
    .catch(error => {
      alert(error)
    })
  }

  render() {
    return(
			<div>
			{ this.props.display.computer &&
				<div className="form-group">
					<label htmlFor='computers' className="form-label">Computers</label>
						<div className="checkbox-group">
							{this.state.computers.length <= 0 && <p>No Computers Currently Available</p>}
			        { this.state.computers
								.filter((option => option.available))
								.map(option => {
				          return (
				            <label key={option._id}>
				              <input
				                className="form-checkbox"
				                id = 'computers'
				                name='computers'
				                onChange={ this.props.handleChange }
				                value={option.itreID}
				                disabled={ this.props.disabled ? 'disabled' : '' }
				                checked={ this.props.value.computer.indexOf(option.itreID) !== -1 }
				                type="checkbox" /> <strong>{option.itreID}</strong> {option.item.brand} {option.item.model}
				            </label>
				          )
				        })}
			      </div>
	      </div>
			}
			{ this.props.display.cord &&
				<div className="form-group">
					<label htmlFor='cords' className="form-label">Cords</label>
						<div className="checkbox-group">
							{this.state.cords.length <= 0 && <p>No Cords Currently Available</p>}
			        { this.state.cords
								.filter((option => option.available))
								.map(option => {
				          return (
				            <label key={option._id}>
				              <input
				                className="form-checkbox"
				                id = 'cords'
				                name='cords'
				                onChange={ this.props.handleChange }
				                value={option.type}
				                disabled={ this.props.disabled ? 'disabled' : '' }
				                checked={ this.props.value.cord.indexOf(option.type) !== -1 }
				                type="checkbox" /> <strong>{option.type}</strong> {option.item.brand} {option.item.model}
				            </label>
				          )
				        })}
			      </div>
	      </div>
			}
			{ this.props.display.accessory &&
				<div className="form-group">
					<label htmlFor='accessory' className="form-label">Accessories</label>
						<div className="checkbox-group">
							{this.state.accessory.length <= 0 && <p>No Accessories Currently Available</p>}
			        { this.state.accessory
								.filter((option => option.available))
								.map(option => {
				          return (
				            <label key={option._id}>
				              <input
				                className="form-checkbox"
				                id = 'accessory'
				                name='accessory'
				                onChange={ this.props.handleChange }
				                value={option.type}
				                disabled={ this.props.disabled ? 'disabled' : '' }
				                checked={ this.props.value.accessory.indexOf(option.itretypeID) !== -1 }
				                type="checkbox" /> <strong>{option.type}</strong> {option.item.brand} {option.item.model}
				            </label>
				          )
				        })}
			      </div>
	      </div>
			}
			</div>
    )
  }
}

export default EquipmentSelect
