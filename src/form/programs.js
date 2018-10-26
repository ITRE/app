import React, { Component } from 'react'
import axios from 'axios'

class ProgramSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			programs: []
		}
	}

  componentDidMount() {
    axios.get('http://api.ems.test/programs')
    .then(res => {
      this.setState({
        programs: res.data.data
      });
    })
    .catch(error => {
      alert(error)
    })
  }

  render() {
		let value = this.props.value ? this.props.value : '5ba10e8bab1a991b9b327ab3'
    return(
      <div className="form-group">
				<label htmlFor={this.props.name} style={this.props.error ? {color:'red'} : {}} className="form-label">
	        {this.props.title}
	        {this.props.message && <span style={{fontSize: '12px'}}><br />{this.props.message}</span>}
	      </label>
        <select
          name={this.props.name}
          value={value}
					className="selectBox"
          onChange={this.props.handleChange}
					disabled={ this.props.disabled && 'disabled'}
          >
          <option value="" disabled>{this.props.placeholder}</option>
          { this.props.extraOptions && this.props.extraOptions
            .map(option => (
              <option key={option} value={option}>{option}</option>
            ))
          }
          { this.state.programs
            .map(program => (
              <option key={program._id} value={program._id}>{program.name}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

export default ProgramSelect
