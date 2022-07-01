import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('genres').del();

  await knex('genres').insert([
    { id: 1, name: 'Novel' },
    { id: 2, name: 'Classic' },
    { id: 3, name: 'Comic' },
    { id: 4, name: 'Adventure' },
    { id: 5, name: 'History' },
    { id: 6, name: 'Fantasy' },
    { id: 7, name: 'Thriller' },
    { id: 8, name: 'Horror' },
    { id: 9, name: 'Other' },
  ]);
}
