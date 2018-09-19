import React, { Component } from 'react'

import axios from 'axios'
import AppHeader from './Header'
import { Button, Form, Container, Header, Message } from 'semantic-ui-react'


class SignupPage extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: '',
        email: '',
        password: ''
      },
      errorName: '',
      errorEmail: '',
      errorPassword: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateFields(name, email, password){
    let hasErrors = false
    if(name.length <= 4) {
      this.setState({errorName:'Name must be larger then 4 chars'})
      hasErrors = true
    }
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
    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value

    let hasErrors = this.validateFields(name,email,password)
    if(!hasErrors){
      axios.post('http://localhost:3000/user/create', {user: {
        'name': name,
        'email': email,
        'password': password
      }}).then(response => this.props.history.push("/?login=true"))
  }
  }
  handleChange(event,field) {
    switch (field) {
      case 'name':
      this.setState(
        {user: {
          name: event.target.value,
          email: this.state.user.email,
          password: this.state.user.password
        }});
        break;
      case 'email':
        this.setState(
          {user: {
            name:  this.state.user.name,
            email: event.target.value,
            password: this.state.user.password
          }});
        break;
      case 'password':
          this.setState(
            {user: {
              name:  this.state.user.name,
              email: this.state.user.email,
              password: event.target.value
            }});
          break;
      default:
      this.setState(
        {user: {
          name: this.state.user.name,
          email: this.state.user.email,
          password: this.state.user.password
        }});
        break;
    }
  }
  render () {
      return (
        <Container>
        <AppHeader />
         <Header as='h3'>User detail page for user: {this.state.user.name}</Header>

         <Form onSubmit={this.handleSubmit}>
          <Form.Field>
           <label>
            Name:
            <input type="text" name="name" required={true} value={this.state.user.name} onChange={(e) => this.handleChange(e, 'name')} />
            </label>
            { this.state.errorName &&
              <Message
                color='red'
                header="Name field error"
                content={this.state.errorName }
              />
            }
          </Form.Field>
          <Form.Field>
           <label>
            Email:
            <input type="text" name="email" required={true} value={this.state.user.email} onChange={(e) => this.handleChange(e, 'email')} />
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
           <input type="password" name="password" required={true} value={this.state.user.password} onChange={(e) => this.handleChange(e, 'password')} />
          </label>
          { this.state.errorPassword &&
           <Message
           color='red'
             header="Passford field error"
             content={this.state.errorPassword }
           />
          }
          </Form.Field>
          <Button primary type='submit'>Signup</Button>
          </Form>
         </Container>
     )
   }
 }
 export default SignupPage
