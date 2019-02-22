
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(tbl){
        tbl.increments();
        tbl.string('Name').notNullable();
        tbl.string('Action Description', 255).notNullable();
        tbl.string('Notes').notNullable();
        tbl.boolean('Action Completed');

        tbl
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
  
};
