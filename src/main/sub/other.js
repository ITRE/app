import React, { Component } from 'react'

import Date from '../form/date.js'
import Textarea from '../form/textarea.js'

class Other extends Component {
	constructor(props) {
		super(props)
		this.state = {
			desc: '',
			need: ''
		}
    this.change = this.change.bind(this)
	}

	change(event) {
		const value = event.target.value
    const name = event.target.name
		if (event.target.type === 'checkbox') {
			let newTried = [...this.state.tried]
			event.target.checked ? newTried.push(value) : newTried.splice(newTried.indexOf(value), 1)
			this.setState({
				tried: newTried
			}, () => {
				const info = {...this.state}
				this.props.test(info)
			})
		} else {
	    this.setState({
				[name]: value
			}, () => {
				const info = {...this.state}
				this.props.test(info)
			})
		}
	}

  render() {
    return (
			<div>
				<Textarea
					title='Additional Description'
					name='desc'
					type='text'
					value={this.state.desc}
					handleChange={this.change}
					placeholder='Description'
				/>
				<Date
					title='When do you need this access?'
					name='need'
					type='text'
					value={this.state.need}
					handleChange={this.change}
				/>
			</div>
    )
  }
}

export default Other
