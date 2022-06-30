import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('nations', table => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('genres', table => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('genres');
  await knex.schema.dropTable('nations');
}
