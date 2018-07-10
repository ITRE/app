import React, { Component } from 'react'
import axios from 'axios'

class Add extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: [],
      users: [],
      kinds: [],
			item: {
				itreID: '',
			  serial: '',
			  bought: '',
			  added: '',
			  updated: '',
			  project: '',
			  owner: '',
			  available: '',
			  borrowed: '',
			  returned: '',
			  kind: '',
			  item: '',
			  location: ''
			}
		}
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
    axios.get('http://api.ems.test/user')
      .then(res => {
				console.log('res: ', res)
				console.log('data: ', res.data)
				console.log('sub-data: ', res.data.data)
				console.log('sub-data: ', res.data.data[0])
        this.setState({ users: res.data.data[0] });
      })
  }

	handleChange(event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;
    this.setState({
			item: {
				[name]: value
			}
		})
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.item);
    event.preventDefault();
  }

  render() {
    return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Owner:
						<select value={this.state.item.owner} name="owner" onChange={this.handleChange}>
							{ this.state.users
								.map(user => (
									<option value={user._id}>{user.first} {user.last}</option>
								))
							}
						</select>
					</label>
          <input type="submit" value="Submit" />
        </form>
			</div>
    )
  }
}

export default Add
