import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from './form'

class Edit extends Component {
	constructor(props) {
		super(props)
		this.state = {
      finished: false
		}
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleSubmit(NEWinv, NEWitem, NEWlog) {
		console.log({inv: NEWinv, item: NEWitem, log:NEWlog})
		axios.put('http://api.ems.test/inv/'+NEWinv._id, {inv: NEWinv, item: NEWitem, log:NEWlog})
      .then(res => {
				this.setState({finished: true})
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
				{this.state.finished && <Redirect to={'/'} />}
				<Form handleSubmit={this.handleSubmit} type='new' item={this.props.location.state.item} />
			</div>
    )
  }
}

export default Edit
