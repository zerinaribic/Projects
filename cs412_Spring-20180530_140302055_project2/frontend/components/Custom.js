import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

class Custom extends Component {

    render () {
      return (
        <div>
        <Header />
          <h3>
            Hi! Nice to see you in custom.
          </h3>
          <p> If you want to go back use links bellow</p>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/custom">Custom</Link>
          </li>
       </div>
     )
   }
 }
 export default Custom
