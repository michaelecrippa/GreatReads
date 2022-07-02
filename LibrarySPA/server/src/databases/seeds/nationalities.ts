import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('nations').del();

  await knex('nations').insert([
    { id: 1, name: 'Bulgaria' },
    { id: 2, name: 'Albania' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'Chine' },
    { id: 5, name: 'Hungary' },
    { id: 6, name: 'Germany' },
    { id: 7, name: 'Greece' },
    { id: 8, name: 'Vietnam' },
    { id: 9, name: 'Ukraine' },
    { id: 10, name: 'Egypt' },
  ]);
}
