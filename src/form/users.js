import React, { Component } from 'react'
import axios from 'axios'

class UserSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: []
		}
	}

  componentDidMount() {
    axios.get('http://api.ems.test/user')
    .then(res => {
      this.setState({
        users: res.data.data
      });
    })
    .catch(error => {
      alert(error)
    })
  }

  render() {
    return(
      <div className="form-group">
				<label htmlFor={this.props.name} style={this.props.error ? {color:'red'} : {}} className="form-label">
	        {this.props.title}
	        {this.props.message && <span style={{fontSize: '12px'}}><br />{this.props.message}</span>}
	      </label>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
					disabled={ this.props.disabled && 'disabled'}
          >
          <option value="5ba2a0450a161d02ca25b959">None</option>
          { this.props.extraOptions && this.props.extraOptions
            .map(option => (
              <option key={option} value={option}>{option}</option>
            ))
          }
          { this.state.users
            .map(user => (
              <option key={user._id} value={this.props.string ? (user.first+' '+user.last) : user._id}>{user.first} {user.last}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

export default UserSelect
