import { mutation, query } from './_generated/server';

export const add = mutation(({ db }, name, photo) => {
  db.insert('pups', {
    name,
    photo,
  });
});

export const get = query(async ({ db }) => {
  return await db.query('pups').collect();
});
