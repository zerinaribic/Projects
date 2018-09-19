import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class UserTable extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }

    render () {
      return (
      <Table >
       <Table.Header>
        <Table.Row>
         <Table.HeaderCell>Id</Table.HeaderCell>
         <Table.HeaderCell>Name</Table.HeaderCell>
         <Table.HeaderCell>Email</Table.HeaderCell>
         <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
       </Table.Header>
       <Table.Body>
        { this.state.users.map((user, key) => {
                  return (
                     <Table.Row key={key}>
                       <Table.Cell>{user.id}</Table.Cell>
                       <Table.Cell>{user.name}</Table.Cell>
                       <Table.Cell>{user.email}</Table.Cell>
                       <Table.Cell><Link to={'/user/edit/'+user.id}>edit</Link></Table.Cell>
                     </Table.Row>
                   )
                  })
        }
        </Table.Body>
       </Table>
     )
   }
 }
 export default UserTable
