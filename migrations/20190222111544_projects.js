
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(tbl){
    tbl.increments();
    tbl
        .string('Name', 150)
        .notNullable()
        .unique();
    tbl
        .string('Description')
        .notNullable();
        
    tbl.boolean('Completed');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
  
};
