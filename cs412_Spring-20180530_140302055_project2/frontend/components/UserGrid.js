import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import './App.css'
import Header from './Header'
import axios from 'axios'
import { zButton, Form, Table, Container } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../actions'

class UserGrid extends Component {
  constructor (props) {
    super()
    this.state = {
      users: []
    }
    this.props = props
    console.log(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick () {
    this.props.actions.fetchUsers().then(response => this.setState({users: response.data}))
    // axios.get('http://localhost:3000/users')
    //     .then(response => this.setState({users: response.data}))
    //     //.then(response => console.log(response))
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
      <Container>
      <Header />
       <Button primary className='button' onClick={this.handleClick}>Show all users</Button>
       <Button secondary><Link to={'/user/create'}>Create New User</Link></Button>
       <br/><br/>
       <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label htmlFor="name">Enter the name to search</label>
          <input id="name" type="text" name="name" />
        </Form.Field>
        <Button type='submit'>Filter by name</Button>
       </Form>
       <br/>
       <Table celled padded>
        <Table.Header>
         <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
         </Table.Row>
        </Table.Header>
        <Table.Body>
         { this.props.users.map((user, key) => {
                   return (
                      <Table.Row key={key}>
                        <Table.Cell>{user.id}</Table.Cell>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.token}</Table.Cell>
                        <Table.Cell><Link to={'/user/edit/'+user.id}>edit</Link></Table.Cell>
                      </Table.Row>
                    )
                   })
         }
         </Table.Body>
        </Table>
       </Container>
    )
  }
}
const mapStateToProps = ({user}) => user
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        userActions
      ),
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserGrid)
