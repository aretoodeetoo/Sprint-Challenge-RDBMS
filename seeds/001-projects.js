
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'Accomplish Sprint MVP', description: 'You have three hours!', completed: false},
        {name: 'Accomplish Sprint Stretch', description: 'You have about one hour!', completed: false},
        {name: 'Go for a walk after the sprint!', description: 'You have an hour for lunch', completed: false}
      ]);
    });
};
