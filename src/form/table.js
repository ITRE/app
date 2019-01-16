import React, { Component } from 'react'
import Checkbox from '../form/checkbox.js'
import Swal from 'sweetalert2'

const jwt = require('jsonwebtoken')

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: [],
      items: {},
      filterOptions: [],
      filters: [],
      user: jwt.decode(localStorage.getItem('access token'))
    }
    this.checkOut = this.checkOut.bind(this)
    this.checkIn = this.checkIn.bind(this)
    this.edit = this.edit.bind(this)
    this.info = this.info.bind(this)
  }

  checkOut() {
    this.props.checkOut(this.props.position)
  }

  checkIn() {
    this.props.checkIn(this.props.position)
  }

  edit() {
    this.props.edit(this.props.data)
  }

  info(data) {
    let message = '<ul class="popup_info">'
    for (let key in data) {
      if (key.substring(0, 1) === '_') { continue }
      const keyLabel = key.replace('_', ' ').split(" ").map(a=>a.substring(0,1).toUpperCase()+a.substring(1)).join(' ')
      if (typeof data[key] === 'string') {
        message += '<li><strong>' + keyLabel + ':</strong> ' + data[key] + '</li>'
      } else if (typeof data[key] === 'boolean') {
        message += '<li><strong>' + keyLabel + ':</strong> ' + data[key] + '</li>'
      } else {
        message += '<strong>' + keyLabel + ':</strong><br /><ul class="subinfo">'
        for (let subkey in data[key]) {
          if (subkey.substring(0, 1) === '_' || subkey === 'password') { continue }
          const subkeyLabel = subkey.replace('_', ' ').split(" ").map(a=>a.substring(0,1).toUpperCase()+a.substring(1)).join(' ')
          if (typeof data[key][subkey] === 'string') {
            message += '<li><strong>' + subkeyLabel + ':</strong> ' + data[key][subkey] + '</li>'
          }
        }
        message += '</ul>'
      }
    }
    message += '</ul>'
    Swal({
      title: data.itreID + ' Information',
      type: 'info',
      customClass: 'info',
      html: message,
    })
  }

  componentDidMount() {
		this.setState({
		  headers: this.props.headers ? this.props.headers : [],
		  items: this.props.items ? this.props.items : {},
		  filters: this.props.filterOptions ? this.props.filterOptions : [],
		  filterOptions: this.props.filterOptions ? this.props.filterOptions : []
		})
	}

  render() {
		return (
      <div>
				{this.props.filterOptions &&
          <section className="field-group">
  					<h2>Filter</h2>
  						<Checkbox
  							title=''
  							name='filters'
  							options={this.props.filterOptions}
  							selectedOptions={this.props.filters}
  							handleChange={this.props.change}
  							buttons={true}
  						/>
  				</section>
        }

				<div className="field-group">
					<div className="flex headers">
            { this.state.headers && this.state.headers
              .map((header, index) => <p key={index} className={"table_column header " + header.toLowerCase()}>{header}</p>)
            }
					</div>
          { this.state.items.length > 0 && this.state.items
        		.filter(a => {
              if(this.props.filterOptions) {
                return this.props.filters.indexOf(a[this.props.filterCategory]) >= 0
              } else {
                return true
              }
            })
            .map((item, index) => {
              let items = []
              for (let key in item) {
                if (key === 'position') { continue }
                if (key === 'id') {
                  items.push(<button className="link table_column" key={key} onClick={ () => {this.info(item[key].data)} }>{item[key].label}</button>)
                  continue
                }
                if (key.substring(0, 6) === 'button') {
                  items.push(<p key={key} className="table_column">
                    <button className="table_column" disabled={item[key].click === null ? 'disabled' : ''} onClick={ item[key].click }>
                      {item[key].label}
                    </button>
                  </p>)
                  continue
                }
                items.push(<p key={key} className={"table_column " + key}>{item[key]}</p>)
              }
              return (<div key={index} className="line-item">{items}</div>)
            })
           }
           { this.state.items.length <= 0 && <p className="line-item">No equipment matches your search</p>}
				</div>
			</div>
    );
  }

}

export default Table
