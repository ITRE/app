import React, { Component } from 'react'

import Input from '../../form/input.js'
import Select from '../../form/select.js'

class Accessory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			brand: '',
			model: '',
			type: '',
			power: '',
			size: '',
			price: ''
		}
    this.change = this.change.bind(this)
	}

	componentDidMount() {
		if (this.props.item) {
			this.setState({
				brand: this.props.item.brand ? this.props.item.brand : '',
				model: this.props.item.model ? this.props.item.model : '',
				type: this.props.item.type ? this.props.item.type : '',
				power: this.props.item.hd ? this.props.item.hd : '',
				size: this.props.item.ram ? this.props.item.ram : '',
				price: this.props.item.price ? this.props.item.price : ''
			})
		}
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
    this.setState({
			[name]: value
		}, () => {
			const item = {...this.state}
			this.props.set(item)
		})
	}

  render() {
    return (
			<section className="field-group">
				<h2>Accessory Information</h2>
				<Input
					title='Brand'
					name='brand'
					type='text'
					value={this.state.brand}
					handleChange={this.change}
					placeholder='Brand'
				/>
				<Input
					title='Model'
					name='model'
					type='text'
					value={this.state.model}
					handleChange={this.change}
					placeholder='Model'
				/>
				<Select
					title='Type'
					name='type'
					options={['Monitor', 'Mouse', 'Keyboard', 'Projector', 'SD Card', 'Flash Drive', 'Bag / Case', 'Headphones', 'Camera', 'Presentation Remote', 'Other']}
					value={this.state.type}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Select
					title='Power Source'
					name='power'
					options={['USB-A', 'USB-B', 'USB-C', 'Mini USB', 'Micro USB', 'AC Adapter', 'Lightning', 'AA Battery', 'AAA Battery', '9V Battery', 'Other']}
					value={this.state.power}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Input
					title='Size [optional]'
					name='size'
					type='text'
					value={this.state.size}
					handleChange={this.change}
					placeholder='Size'
				/>
				<Input
					title='Purchase Price'
					name='price'
					type='text'
					value={this.state.price}
					handleChange={this.change}
					placeholder='Price'
				/>
			</section>
    )
  }
}

export default Accessory
