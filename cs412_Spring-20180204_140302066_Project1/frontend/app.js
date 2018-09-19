import React from 'react'
import ReactDOM from 'react-dom'

import UserGrid from './components/UserGrid'
import UserDetail from './components/UserDetail'
import Dashboard from './components/Dashboard'
import Custom from './components/Custom'
import a140302066Grid from './components/a140302066Grid'

import { BrowserRouter, Route } from 'react-router-dom'

const router = (
  <BrowserRouter>
    <Route
      render={props => (
          <div>
          <Route location={location} path='/' exact component={Dashboard} />
          <Route location={location} path='/users' exact component={UserGrid} />
          <Route location={location} path='/user/:userId' exact component={UserDetail} />
          <Route location={location} path='/projekat1' exact component={a140302066Grid} />
          <Route location={location} path='/custom' exact component={Custom} />
          </div>
        )}
    />
  </BrowserRouter>
)

ReactDOM.render(router, document.getElementById('app'))
