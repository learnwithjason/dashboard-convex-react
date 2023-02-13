import { useQuery, useMutation } from '../../convex/_generated/react';
import { reactionTypes } from './bar-chart';
import { seedData } from '../util/seed-pups';

export function List() {
  const pups = useQuery('pups:get');
  const addReaction = useMutation('reactions:add');

  if (Array.isArray(pups) && pups.length === 0) {
    seedData();
  }

  if (!pups) {
    return null;
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
