import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    render () {
      return (
        <div>
        <header>CS412 Projekat1</header>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/departments">Departments</Link>
          </li>
          <footer>Ademir Babaic</footer>
       </div>

     )
   }
 }
export default Header
