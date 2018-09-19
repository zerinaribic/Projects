let bookshelf = require('./db')
class Task extends bookshelf.model.Model {
  get tableName () {
    return 'tasks'
  }
  static all () {
    return this.forge().fetchAll()
  }
  static byName(name) {
    return this.forge().query({where:{ 'name': name }}).fetchAll()
  }
  static byId(id) {
    return this.forge().query({where:{ 'id': id }}).fetch()
  }
  static byStatus(status) {
    return this.forge().query({where:{ 'status': status }}).fetchAll()
  }
  static byUserId(userId) {
    return this.forge().query({where:{ 'userId': userId }}).fetchAll()
  }
}
module.exports = Task
