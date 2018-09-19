import React, { Component } from 'react'

import axios from 'axios'
import Header from './Header'

class TaskDetail extends Component {
  constructor () {
    super()
    this.state = {
      task: {
        name: '',
        description: '',
        status: ''
      }
    }
    this.getTaskById = this.getTaskById.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount () {
    this.getTaskById(this.props.match.params.taskId)
  }
  getTaskById (taskId) {
    axios.get('http://localhost:3000/task/id/?id='+taskId)
        .then(response => this.setState({task: response.data}))
        //.then(response => console.log(response))
  }
  handleSubmit(e) {
    e.preventDefault()
  	e.stopPropagation()
    let name = e.target.name.value
    let description = e.target.description.value
    let status = e.target.status.value

    axios.post('http://localhost:3000/task/update', {task: {
      'id': this.props.match.params.taskId,
      'name': name,
      'description': description,
      'status': status
    }}).then(response => this.setState({task: response.data}))
  }
  handleChange(event,field) {
    switch (field) {
      case 'name':
      this.setState(
        {task: {
          name: event.target.value,
          description: this.state.task.description,
          status: this.state.task.status
        }});
        break;
      case 'description':
        this.setState(
          {task: {
            name:  this.state.task.name,
            description: event.target.value,
            status: this.state.task.status
          }});
        break      
      case 'status':
        this.setState(
          {task: {
            name:  this.state.task.name,
            description: this.state.task.description,
            status: event.target.value
          }});
        break;
      default:
      this.setState(
        {task: {
          name: this.state.task.name,
          description: this.state.task.description,
          status: this.state.task.status
        }});
        break;
    }
  }
  render () {
      return (
        <div>
        <Header />
         <h3>Tasks detail page for specific task: name :{this.state.task.name}</h3>
         <h3>description {this.state.task.description}</h3>
         <h3>status {this.state.task.status}</h3>
         <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.task.name} onChange={(e) => this.handleChange(e, 'name')} />
          </label>
          <br/>
          <label>
            Description:
            <input type="text" name="description" value={this.state.task.description} onChange={(e) => this.handleChange(e, 'description')} />
          </label>
          <label>
          Status:
          <input type="text" name="status" value={this.state.task.status} onChange={(e) => this.handleChange(e, 'status')} />
        </label>
          <br/>
          <input type="submit" value="Submit" />
         </form>
        </div>
     )
   }
 }
 export default TaskDetail
