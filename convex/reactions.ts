import { mutation, query } from './_generated/server';

export const add = mutation(({ db }, pup, type) => {
  db.insert('reactions', {
    pup,
    type,
  });
});

export const get = query(async ({ db }) => {
  const reactions = await db.query('reactions').collect();

  return Promise.all(
    reactions.map(async (reaction) => {
      const pupEntry = await db.get(reaction.pup);

      return { ...reaction, name: pupEntry?.name };
    }),
  );
});
