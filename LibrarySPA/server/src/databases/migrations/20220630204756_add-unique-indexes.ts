import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('likes', table => {
    table.unique(['book_id', 'user_id']);
  });
  await knex.schema.table('comments', table => {
    table.unique(['book_id', 'user_id', 'comment']);
  });
  await knex.schema.table('authors', table => {
    table.unique(['name']);
  });
  await knex.schema.table('users', table => {
    table.unique(['name', 'email']);
  });
  await knex.schema.table('books', table => {
    table.unique(['title', 'author']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('likes', table => {
    table.dropUnique(['book_id', 'user_id']);
  });
  await knex.schema.table('comments', table => {
    table.dropUnique(['book_id', 'user_id', 'comment']);
  });
  await knex.schema.table('authors', table => {
    table.dropUnique(['name']);
  });
  await knex.schema.table('users', table => {
    table.dropUnique(['name', 'email']);
  });
  await knex.schema.table('books', table => {
    table.dropUnique(['title', 'author']);
  });
}
