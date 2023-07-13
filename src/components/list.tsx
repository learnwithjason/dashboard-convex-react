import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { seedPups, reactionTypes } from '../util/helpers';

export function List() {
	// TODO hook these up to the Convex database
	const pups = useQuery(api.pups.get);
	const addPup = useMutation(api.pups.add);
	const addReaction = useMutation(api.reactions.add);

	if (!pups) {
		return null;
	}

	if (Array.isArray(pups) && pups.length === 0) {
		seedPups.forEach((pup) => {
			addPup(pup);
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
										onClick={() => addReaction({ pup: pup._id, type: reaction.name })}
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
