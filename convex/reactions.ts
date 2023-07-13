import { mutation, query } from './_generated/server';
import { reactionTypes } from '../src/util/helpers';
import { v } from 'convex/values';
import { ReactionType } from './schema';

interface DataPoint {
	name: string;
	count: number;
}

interface DataSeries {
	label: string;
	data: DataPoint[];
}

export const add = mutation({
	args: { pup: v.id("pups"), type: ReactionType },
	handler: async ({ db }, { pup, type }) => {
		await db.insert('reactions', {
			pup,
			type,
		});
	},
});

export const getByPup = query(async ({ db }) => {
	const reactionsRaw = await db.query('reactions').collect();

	const reactions = await Promise.all(
		reactionsRaw.map(async (reaction) => {
			const pupEntry = await db.get(reaction.pup);

			return { ...reaction, name: pupEntry?.name };
		}),
	);

	return reactionTypes.reduce<DataSeries[]>((dataseries, { name, label }) => {
		return [
			...dataseries,
			{
				label,
				data: reactions
					.filter((r) => r.type === name)
					.reduce<DataPoint[]>((datapoints, r) => {
						const index = datapoints.findIndex((d) => d.name === r.name);

						if (index >= 0) {
							datapoints[index].count += 1;
						} else if (r.name) {
							datapoints.push({
								name: r.name,
								count: 1,
							});
						}

						return datapoints;
					}, []),
			},
		];
	}, []);
});
