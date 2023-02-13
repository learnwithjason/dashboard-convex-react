import { useQuery, useMutation } from '../../convex/_generated/react';
import { reactionTypes } from './bar-chart';

const seedPuppers = [
  {
    name: 'Floof',
    photo:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=faces',
  },
  {
    name: 'Bootsie',
    photo:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=entropy',
  },
  {
    name: 'Daisy',
    photo:
      'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=top',
  },
  {
    name: 'Scraps',
    photo:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=entropy',
  },
  {
    name: 'Pickles',
    photo:
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500',
  },
  {
    name: 'Moira',
    photo:
      'https://images.unsplash.com/photo-1588269845464-8993565cac3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80&h=500&crop=top',
  },
];

export function List() {
  const pups = useQuery('pups:get');
  const addReaction = useMutation('reactions:add');

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
