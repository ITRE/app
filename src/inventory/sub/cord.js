import React, { Component } from 'react'

import Input from '../../form/input.js'
import Select from '../../form/select.js'

class Cord extends Component {
	constructor(props) {
		super(props)
		this.state = {
			brand: '',
			model: '',
			type: '',
			a: '',
			b: '',
			c: '',
			length: '',
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
				a: this.props.item.a ? this.props.item.a : '',
				b: this.props.item.b ? this.props.item.b : '',
				c: this.props.item.c ? this.props.item.c : '',
				length: this.props.item.length ? this.props.item.length : '',
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
			<h2>Cord Information</h2>
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
					options={['HDMI-VGA', 'HDMI-Display', 'HDMI-USB', 'HDMI-DVI', 'HDMI', 'VGA-USB', 'VGA-Display', 'VGA-DVI', 'VGA', 'Display', 'USB', 'DVI', 'Cat5', 'Cat6', 'AUX', 'S-Video', 'Other']}
					value={this.state.type}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Select
					title='Primary Connector'
					name='a'
					options={['HDMI-male', 'HDMI-female', 'VGA-male', 'VGA-female', 'Display-male', 'Display-female', 'USB-male', 'USB-female', 'DVI-male', 'DVI-female', 'Cat5', 'Cat6', 'AUX', 'S-Video', 'Other']}
					value={this.state.a}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Select
					title='Secondary Connector'
					name='b'
					options={['HDMI-male', 'HDMI-female', 'VGA-male', 'VGA-female', 'Display-male', 'Display-female', 'USB-male', 'USB-female', 'DVI-male', 'DVI-female', 'Cat5', 'Cat6', 'AUX', 'S-Video', 'Other']}
					value={this.state.b}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Select
					title='Split Connector [optional]'
					name='c'
					options={['HDMI-male', 'HDMI-female', 'VGA-male', 'VGA-female', 'Display-male', 'Display-female', 'USB-male', 'USB-female', 'DVI-male', 'DVI-female', 'Cat5', 'Cat6', 'AUX', 'S-Video', 'Other']}
					value={this.state.c}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Input
					title='Cord Length'
					name='length'
					type='text'
					value={this.state.length}
					handleChange={this.change}
					placeholder='Length'
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

export default Cord
