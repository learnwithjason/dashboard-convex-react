import { mutation, query } from './_generated/server';
import { reactionTypes } from '../src/util/helpers';

interface DataPoint {
	name: string;
	count: number;
}

interface DataSeries {
	label: string;
	data: DataPoint[];
}

export const add = mutation(({ db }, pup, type) => {
	db.insert('reactions', {
		pup,
		type,
	});
});

export const getByPup = query(async ({ db }) => {
	const reactionsRaw = await db.query('reactions').collect();

	const reactions = await Promise.all(
		reactionsRaw.map(async (reaction) => {
			const pupEntry = await db.get(reaction.pup);

			return { ...reaction, name: pupEntry?.name };
		}),
	);

	return reactionTypes.reduce<DataSeries[]>((acc, { name, label }) => {
		return [
			...acc,
			{
				label,
				data: reactions
					.filter((r) => r.type === name)
					.reduce<DataPoint[]>((acc2, r) => {
						const index = acc2.findIndex((d) => d.name === r.name);

						if (index >= 0) {
							acc2[index].count += 1;
						} else if (r.name) {
							acc2.push({
								name: r.name,
								count: 1,
							});
						}

						return acc2;
					}, []),
			},
		];
	}, []);
});
