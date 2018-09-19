import React, { Component } from 'react'

import axios from 'axios'
import AppHeader from './Header'
import { Button, Form, Container, Header, Message } from 'semantic-ui-react'

//added
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions, loginActions } from '../actions'


class LoginPage extends Component {
  constructor (props) {
    super()
    this.state = {
      user: {
        logged: false,
        email: '',
        name: '',
        id: '',
        token: '',
        error: ''
      },
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: ''
    }
    this.props = props
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateFields(email, password){
    let hasErrors = false
    if(password.length <= 4) {
      this.setState({errorPassword:'Password must be larger then 4 chars'})
      hasErrors = true
    }
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validateEmail= regex.test(email)
    if(!validateEmail){
      this.setState({errorEmail:'Email is not in valid format example@ius.ba'})
      hasErrors = true
    }
    return hasErrors
  }
  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ errorEmail : '', errorPassword: ''})
    let email = e.target.email.value
    let password = e.target.password.value

    let hasErrors = this.validateFields(email,password)
    if(!hasErrors){
      this.props.actions.checkLoginDetails(email, password)
      .then(response => this.setState({user: response.data}))
  }
  }
  handleChange(event,field) {
    switch (field) {
      case 'email':
        this.setState(
          {
            email: event.target.value,
            password: this.state.password
          });
        break;
      case 'password':
          this.setState(
            {
              email: this.state.email,
              password: event.target.value
            });
          break;
      default:
      this.setState(
        {
          email: this.state.email,
          password: this.state.password
        });
        break;
    }
  }
  render () {
      return (
        <Container>
        <AppHeader user={this.props.loginProps.user} />
        {(this.props.loginProps.user.logged && this.props.loginProps.user.error === '')&&
         <Header as='h3'>Successfully logged in user with details : {`Name: ${this.props.loginProps.user.name}, Email:${this.props.loginProps.user.email} and user has token ${this.props.loginProps.user.token}`}</Header>
        }
        {(this.props.loginProps.user.error !== '') &&
          <Message
          color='red'
            header="Login error"
            content={`Error loggin in user with message : ${this.props.loginProps.user.error}`}
          />
        }
         <Form onSubmit={this.handleSubmit}>
          <Form.Field>
           <label>
            Email:
            <input type="text" name="email" required={true} value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} />
           </label>
           { this.state.errorEmail &&
            <Message
            color='red'
              header="Email field error"
              content={this.state.errorEmail }
            />
          }
          </Form.Field>
          <Form.Field>
          <label>
           Password:
           <input type="password" name="password" required={true} value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} />
          </label>
          { this.state.errorPassword &&
           <Message
           color='red'
             header="Passford field error"
             content={this.state.errorPassword }
           />
          }
          </Form.Field>
          <Button primary type='submit'>Login</Button>
          </Form>
         </Container>
     )
   }
 }
//  export default LoginPage
//change
function mapStateToProps (state) {
  return {
    user: state.user,
    loginProps: state.loginProps
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        userActions,
        loginActions
      ),
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
