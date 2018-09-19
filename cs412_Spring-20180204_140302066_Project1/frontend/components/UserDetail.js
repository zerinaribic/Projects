import React, { Component } from 'react'

import axios from 'axios'
import Header from './Header'

class UserDetail extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: '',
        email: ''
      }
    }
    this.getUserById = this.getUserById.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount () {
    this.getUserById(this.props.match.params.userId)
  }
  getUserById (userId) {
    axios.get('http://localhost:3000/userById?id='+userId)
        .then(response => this.setState({user: response.data}))
        //.then(response => console.log(response))
  }
  handleSubmit(e) {
    e.preventDefault()
  	e.stopPropagation()
    let name = e.target.name.value
    let email = e.target.email.value

    axios.post('http://localhost:3000/user/update', {user: {
      'id': this.props.match.params.userId,
      'name': name,
      'email': email
    }}).then(response => this.setState({user: response.data}))
  }
  handleChange(event,field) {
    switch (field) {
      case 'name':
      this.setState(
        {user: {
          name: event.target.value,
          email: this.state.user.email
        }});
        break;
      case 'email':
        this.setState(
          {user: {
            name:  this.state.user.name,
            email: event.target.value
          }});
        break;
      default:
      this.setState(
        {user: {
          name: this.state.user.name,
          email: this.state.user.email
        }});
        break;
    }
  }
  render () {
      return (
        <div>
        <Header />
         <h3>User detail page for user: {this.state.user.name}</h3>

         <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.user.name} onChange={(e) => this.handleChange(e, 'name')} />
          </label>
          <br/>
          <label>
            Email:
            <input type="text" name="email" value={this.state.user.email} onChange={(e) => this.handleChange(e, 'email')} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
         </form>
        </div>
     )
   }
 }
 export default UserDetail
