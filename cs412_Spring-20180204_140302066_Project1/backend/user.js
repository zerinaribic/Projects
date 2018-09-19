let bookshelf = require('./db')
class Department extends bookshelf.model.Model {
  get tableName () {
    return 'mac'
  }
  static all () {
    return this.forge().fetchAll()
  }
  static byDepartment(department) {
    return this.forge().query({where:{ 'mac.department': department }}).fetchAll()
  }

  static byId(id) {
    return this.forge().query({where:{ 'mac.id': id }}).fetchAll()
  }
}
module.exports = Department
