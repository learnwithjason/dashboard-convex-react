import { useQuery, useMutation } from '../../convex/_generated/react';
import { seedPups, reactionTypes } from '../util/helpers';

export function List() {
	const pups = useQuery('pups:get');
	const addPup = useMutation('pups:add');
	const addReaction = useMutation('reactions:add');

	if (!pups) {
		return null;
	}

	if (Array.isArray(pups) && pups.length === 0) {
		seedPups.forEach((pup) => {
			addPup(pup.name, pup.photo);
		});
	}

	return (
		<div className="pups">
			{pups?.map((pup) => {
				return (
					<div className="pup" key={pup._id.toString()}>
						<h2>{pup.name}</h2>
						<img src={pup.photo} alt={pup.name} />

						<div className="reactions">
							{reactionTypes.map((reaction) => {
								return (
									<button
										onClick={() => addReaction(pup._id, reaction.name)}
										key={reaction.label + pup._id}
									>
										<span role="img" aria-label={reaction.name}>
											{reaction.label}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
