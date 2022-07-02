import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.dropColumn('nationality');
  });

  await knex.schema.alterTable('users', table => {
    table.integer('nationality');
  });

  await knex.schema.alterTable('books', table => {
    table.string('picture_uri');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('books', table => {
    table.dropColumn('picture_uri');
  });

  await knex.schema.alterTable('users', table => {
    table.dropColumn('nationality');
  });

  await knex.schema.alterTable('users', table => {
    table.string('nationality');
  });
}
