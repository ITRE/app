import React, { Component } from 'react'
import axios from 'axios'
import Form from './form'

class Add extends Component {
	constructor(props) {
		super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleSubmit(NEWinv, NEWitem) {
		axios.post('http://api.ems.test/inv', {inv: NEWinv, item: NEWitem})
      .then(res => {
				console.log(res)
      })
			.catch(function (error) {
		    if (error.response.data) {
					alert(error.response.data.msg)
					console.log('response: ', error.response.data.error.message)
		    } else if (error.request) {
		      console.log('request: ', error.request);
		    } else {
		      console.log('Error', error.message);
		    }
		  })
  }

  render() {
    return (
			<div>
				<Form handleSubmit={this.handleSubmit} type='new' />
			</div>
    )
  }
}

export default Add
