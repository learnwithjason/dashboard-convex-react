import { WithoutSystemFields } from "convex/server";
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const add = mutation({
	args: { name: v.string(), photo: v.string() },
	handler: async ({ db }, pup) => {
		await db.insert('pups', pup);
	},
});

export const get = query(async ({ db }) => {
	return await db.query('pups').collect();
});
