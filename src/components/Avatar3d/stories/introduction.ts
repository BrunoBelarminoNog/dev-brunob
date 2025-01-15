import { MutableRefObject } from 'react';
import { AnimationAction, Group, Mesh, Object3DEventMap } from 'three';
import { reactOnMouseClick, setObjects } from '../functions';

const storyIntroduction = ({
  actionBreathing,
  actionShock,
  actionEnterJump,
  actionGreet,
  actionWalkLoop,
  scene,
}: {
  actionShock: MutableRefObject<AnimationAction | null>;
  actionBreathing: MutableRefObject<AnimationAction | null>;
  actionGreet: MutableRefObject<AnimationAction | null>;
  actionEnterJump: MutableRefObject<AnimationAction | null>;
  actionWalkLoop: MutableRefObject<AnimationAction | null>;
  scene: Group<Object3DEventMap>;
}) => {
  if (
    actionGreet.current &&
    actionEnterJump.current &&
    actionBreathing.current &&
    actionWalkLoop.current
  ) {
    scene.traverse((child) => {
      if (child.type === 'Bone') {
        setObjects(child);
      }

      if ((child as Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    actionEnterJump.current.repetitions = 0;
    actionEnterJump.current.clampWhenFinished = true;
    scene.scale.set(1, 1, 1);
    setTimeout(() => {
      window.dispatchEvent(new Event('animationIntroInit'));
    }, 2500);
    actionEnterJump.current.reset().startAt(3).play();

    actionGreet.current.clampWhenFinished = true;
    actionGreet.current.repetitions = 0;

    actionWalkLoop.current.clampWhenFinished = true;
    actionWalkLoop.current.repetitions = Infinity;

    actionBreathing.current.clampWhenFinished = true;

    setTimeout(() => {
      if (actionEnterJump.current && actionWalkLoop.current) {
        actionWalkLoop.current?.reset().play().crossFadeFrom(actionEnterJump.current, 1, true);
      }
    }, 4000);

    setTimeout(() => {
      if (actionWalkLoop.current && actionBreathing.current) {
        actionBreathing.current.reset().play().crossFadeFrom(actionWalkLoop.current, 0.7, true);
      }
    }, 7600);

    setTimeout(() => {
      window.dispatchEvent(new Event('playSectionInitContent'));
    }, 8500);
    setTimeout(() => {
      if (actionGreet.current && actionBreathing.current) {
        actionGreet.current.reset().play().crossFadeFrom(actionBreathing.current, 1, true);
      }
    }, 9000);

    setTimeout(() => {
      if (actionGreet.current && actionBreathing.current) {
        actionBreathing.current.reset().play().crossFadeFrom(actionGreet.current, 0.7, true);
        window.addEventListener('click', (ev) =>
          reactOnMouseClick(ev, actionShock, actionBreathing),
        );
      }
    }, 11000);
  }
};

export default storyIntroduction;
