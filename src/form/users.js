import React, { Component } from 'react'
import axios from 'axios'

class UserSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			isLoading: false
		}
		this.signal = axios.CancelToken.source()
	}

	componentDidMount() {
		this.onLoadUser();
	}

	componentWillUnmount() {
		this.signal.cancel('Api is being canceled');
	}

	onLoadUser = async () => {
		try {
			this.setState({ isLoading: true });
			const response = await axios.get('http://api.ems.test/user', {
				cancelToken: this.signal.token,
			})
			this.setState({ users: response.data.data, isLoading: true });
		} catch (err) {
			if (axios.isCancel(err)) {
				//console.log('Error: ', err.message); // => prints: Api is being canceled
			} else {
				this.setState({ isLoading: false });
			}
		}
	 }

  render() {
    return(
      <div className={"select " + (this.props.error ? 'error' : '')}>
				<label htmlFor={this.props.name} className="form-label">
	        {this.props.title}
	      </label>
        <select
          name={this.props.name}
					className="selectBox"
          value={this.props.value || ''}
          onChange={this.props.handleChange}
					disabled={ this.props.disabled && 'disabled'}
          >
          <option value='' disabled={true}>{this.props.placeholder}</option>
          { this.props.extraOptions && this.props.extraOptions
            .map(option => (
              <option key={option} value={option}>{option}</option>
            ))
          }
          { this.state.users
            .map(user => (
              <option key={user.username} value={user.username}>{user.first} {user.last}</option>
            ))
          }
        </select>
        {this.props.error &&
          <span>{this.props.error}</span>
        }
      </div>
    )
  }
}

export default UserSelect
