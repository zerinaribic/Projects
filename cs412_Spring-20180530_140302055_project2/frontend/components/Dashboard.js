import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { Segment } from 'semantic-ui-react'
import * as qs from 'query-string'
const urlParams = qs.parse(window.location.search)
const login = urlParams.login || null
class Dashboard extends Component {

    render () {
      return (
        <div>
          <Header />
          {login && 
            <Segment>
              User is signed in successfully!
            </Segment>}
       </div>
     )
   }
 }
 export default Dashboard