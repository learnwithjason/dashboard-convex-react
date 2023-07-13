import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const ReactionType = v.union(
	v.literal("heart"),
	v.literal("cute"),
	v.literal("star_eyes")
);

export default defineSchema({
	pups: defineTable({
		name: v.string(),
		photo: v.string(),
	}),
	reactions: defineTable({
		pup: v.id("pups"),
		type: ReactionType,
	}),
});
