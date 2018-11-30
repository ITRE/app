import React, { Component } from 'react'

import Input from '../../form/input.js'
import Select from '../../form/select.js'

class Computer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			brand: '',
			model: '',
			type: '',
			hd: '',
			ram: '',
			cpu: '',
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
				hd: this.props.item.hd ? this.props.item.hd : '',
				ram: this.props.item.ram ? this.props.item.ram : '',
				cpu: this.props.item.cpu ? this.props.item.cpu : '',
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
			<div>
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
					options={['Desktop', 'Laptop', 'Projector', 'Peripheral', 'Application', 'Other']}
					value={this.state.type}
					handleChange={this.change}
					placeholder='Select One'
				/>
				<Input
					title='Hard Drive'
					name='hd'
					type='text'
					value={this.state.hd}
					handleChange={this.change}
					placeholder='Hard Drive'
				/>
				<Input
					title='CPU'
					name='cpu'
					type='text'
					value={this.state.cpu}
					handleChange={this.change}
					placeholder='CPU'
				/>
				<Input
					title='RAM'
					name='ram'
					type='text'
					value={this.state.ram}
					handleChange={this.change}
					placeholder='RAM'
				/>
				<Input
					title='Purchase Price'
					name='price'
					type='text'
					value={this.state.price}
					handleChange={this.change}
					placeholder='Price'
				/>
			</div>
    )
  }
}

export default Computer
