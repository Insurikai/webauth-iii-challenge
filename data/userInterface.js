const db = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');
module.exports = {
  add,
  find,
  findBy,
  findById
}

function add(user) {
  console.log(user)
  return db('user')
    .insert({ username: user.username, password: bcrypt.hashSync(user.password, 12), department: user.department})
    .then(ids => {
      return findById(ids[0]);
    }).catch(err => {
      console.log(err)
      return err
    });
}
function find(){
  return db('user')
}
function findBy(filter) {
  return db('user').where(filter).first();
}
function findById(id) {
  return db('user')
    .where({ id })
    .first();
}
/* function remove(id) {
  return db('user').where({id}).del();
} */