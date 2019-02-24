
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {name: 'Implement Knex functionality', project_id: 1},
        {name: 'Add endpoints for a basic API', project_id: 1},
        {name: 'Walk three miles', project_id: 3},
      ]);
    });
};
