/*
 * When the database is first initialized, it will be empty. This is the pup
 * data we want to insert into the database. It can also be used as a
 * placeholder by adding a fake `_id` field, which is NOT used in the database.
 */
export const seedPups = [
	{
		_id: 1,
		name: 'Floof',
		photo:
			'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=faces',
	},
	{
		_id: 2,
		name: 'Bootsie',
		photo:
			'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=entropy',
	},
	{
		_id: 3,
		name: 'Daisy',
		photo:
			'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=top',
	},
	{
		_id: 4,
		name: 'Scraps',
		photo:
			'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=entropy',
	},
	{
		_id: 5,
		name: 'Pickles',
		photo:
			'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500',
	},
	{
		_id: 6,
		name: 'Moira',
		photo:
			'https://images.unsplash.com/photo-1588269845464-8993565cac3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=top',
	},
];

/*
 * The reaction types are used in several files throughout the app, so we
 * collect them here for reusability.
 */
export const reactionTypes = [
	{ name: 'heart', label: '💜' },
	{ name: 'cute', label: '🥺' },
	{ name: 'star_eyes', label: '🤩' },
] as const;

/*
 * Before the database is set up, we want to show how the app _should_ work, so
 * we have placeholder reaction data. This will only be used until the database
 * is created.
 */
export const getPlaceholderReactionData = () => {
	return reactionTypes.map((reaction) => {
		return {
			label: reaction.label,
			data: seedPups.map((pup) => {
				return {
					name: pup.name,
					count: Math.round(Math.random() * 40),
				};
			}),
		};
	});
};
