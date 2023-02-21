import { defineSchema, defineTable, s } from 'convex/schema';

export default defineSchema({
	pups: defineTable({
		name: s.string(),
		photo: s.string(),
	}),
	reactions: defineTable({
		pup: s.id('pups'),
		type: s.union(
			s.literal('heart'),
			s.literal('cute'),
			s.literal('star_eyes'),
		),
	}),
});
