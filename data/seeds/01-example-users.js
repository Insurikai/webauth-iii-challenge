
exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {username: 'anthony', password: 'theTony', department: 'janitorial'},
        {username: 'samantha', password: '34asfoajf!!#', department: 'finances'},
        {username: 'abigail', password: 'pass', department: 'online security'}
      ]);
    });
};
