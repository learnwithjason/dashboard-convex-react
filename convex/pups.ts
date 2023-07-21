import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const add = mutation({
	args: { name: v.string(), photo: v.string() },
	handler: async ({ db }, { name, photo }) => {
		await db.insert('pups', {
			name,
			photo,
		});
	},
});

export const get = query(async ({ db }) => {
	return await db.query('pups').collect();
});
