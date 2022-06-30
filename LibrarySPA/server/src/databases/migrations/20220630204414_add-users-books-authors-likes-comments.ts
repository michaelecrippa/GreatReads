import Knex = require('knex');

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('sex');
    table.integer('age');
    table.string('nationality');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('token').nullable().unique();
  });

  await knex.schema.createTable('authors', table => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.integer('age');
    table.date('born');
    table.date('died');
    table.string('nationality');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('books', table => {
    table.increments('id').primary().notNullable();
    table.string('title').notNullable();
    table.integer('author').references('authors.id').notNullable();
    table.string('genre');
    table.integer('pages');
    table.date('date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.text('description').nullable();
  });

  await knex.schema.createTable('likes', table => {
    table.increments('id').primary().notNullable();
    table.integer('book_id').references('books.id').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('comments', table => {
    table.increments('id').primary().notNullable();
    table.integer('book_id').references('books.id').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.string('comment').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('comments');
  await knex.schema.dropTable('likes');
  await knex.schema.dropTable('books');
  await knex.schema.dropTable('authors');
  await knex.schema.dropTable('users');
}
