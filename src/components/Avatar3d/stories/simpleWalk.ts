import { MutableRefObject } from 'react';
import { AnimationAction } from 'three';

const storySimpleWalk = ({
  actionWalkLoop,
  actionBreathing,
  seconds,
}: {
  actionBreathing: MutableRefObject<AnimationAction | null>;
  actionWalkLoop: MutableRefObject<AnimationAction | null>;
  seconds: number;
}) => {
  if (actionWalkLoop.current && actionBreathing.current) {
    const idleAction = actionBreathing.current;
    const walkAction = actionWalkLoop.current;
    walkAction.reset().play().crossFadeFrom(idleAction, 0.5, true);

    setTimeout(() => {
      // walkAction.fadeOut(0.5);
      idleAction.reset().play().crossFadeFrom(walkAction, 0.5, true);
    }, seconds);
  }
};

export default storySimpleWalk;
