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
    return(
      <div className={"select " + (this.props.error ? 'error' : '')}>
				<label htmlFor={this.props.name} className="form-label">
	        {this.props.title}
	      </label>
        <select
          name={this.props.name}
          value={this.props.value || ''}
					className="selectBox"
          onChange={this.props.handleChange}
					disabled={ this.props.disabled && 'disabled'}
          >
          <option disabled={true} value=''>{this.props.placeholder}</option>
          { this.props.extraOptions && this.props.extraOptions
            .map(option => (
              <option key={option} value={option}>{option}</option>
            ))
          }
          { this.state.programs
            .map(program => (
              <option key={program.code} value={program.code}>{program.name}</option>
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

export default ProgramSelect
