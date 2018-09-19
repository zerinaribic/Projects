import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import './App.css'
import Header from './Header'
import axios from 'axios'

class UserGrid extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick () {
    axios.get('http://localhost:3000/users')
        .then(response => this.setState({users: response.data}))
        //.then(response => console.log(response))
  }

  handleClear () {
    this.setState({users: []  })
  }

  handleSubmit(event) {
   event.preventDefault();
   let name = event.target.name.value
   console.log(name)
  axios.get('http://localhost:3000/userByName?name='+ name, { "name" : name } )
     .then(response => this.setState({users: response.data}))
 }

  render () {
    return (
      <div>
      <Header />
       <button className='button' onClick={this.handleClick}>Show all users</button>
       <br/>
       <form onSubmit={this.handleSubmit}>
         <label htmlFor="name">Enter the name to search</label>
         <input id="name" type="text" name="name" />
         <input type="submit" name="Filter by name" />
       </form>
       <table>
        <thead>
         <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
         </tr>
        </thead>
        <tbody>
         { this.state.users.map((user, key) => {
                   return (
                      <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><Link to={'/user/'+user.id}>edit</Link></td>
                      </tr>
                    )
                   })
         }
         </tbody>
        </table>
       </div>
    )
  }
}
export default UserGrid
