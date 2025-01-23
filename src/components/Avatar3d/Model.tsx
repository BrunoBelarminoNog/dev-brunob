'use client';
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSections } from '@/contexts/sections/sectionsContext';
import {
  ContactShadows,
  Grid,
  GridProps,
  Preload,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AnimationAction, AnimationUtils, LoopOnce, LoopRepeat, Mesh } from 'three';
import { frameInitialize, onMouseMove } from './functions';
import storyIntroduction from './stories/introduction';
import storySimpleWalk from './stories/simpleWalk';
useGLTF.preload('/avatarAnimationsUpdate4.glb');
const gridConfig = {
  cellSize: 0.25,
  cellThickness: 1,
  cellColor: '#303030',
  sectionSize: 1,
  sectionThickness: 1,
  sectionColor: '#614251',
  fadeDistance: 60,
  fadeStrength: 5,
  followCamera: true,
  infiniteGrid: true,
};

export default function Model() {
  const group = useRef(null);
  const grid = useRef(null);

  // const { active, progress, errors, item, loaded, total } = useProgress();

  const actionEnterJump = useRef<AnimationAction | null>(null);
  const actionGreet = useRef<AnimationAction | null>(null);
  const actionBreathing = useRef<AnimationAction | null>(null);
  const actionShock = useRef<AnimationAction | null>(null);
  const actionWalkLoop = useRef<AnimationAction | null>(null);

  const { animations, scene } = useGLTF('/avatarAnimationsUpdate4.glb');

  const { clips, mixer } = useAnimations(animations, scene);

  const { currentSection, previousSection } = useSections();

  useEffect(() => {
    const clipIdle = clips[0];
    const clipJumpEnter = clips[1];
    const clipReaction = clips[3];
    const clipGreeting = clips[4];
    const clipWalkingLoop = clips[5];

    clipIdle.tracks.splice(3, 15);
    clipReaction.tracks.splice(3, 15);
    clipGreeting.tracks.splice(3, 15);
    clipWalkingLoop.tracks.splice(3, 15);

    const clipReaction_subblip = AnimationUtils.subclip(clipReaction, 'react', 30, 110);
    const clipGreeting_subblip = AnimationUtils.subclip(clipGreeting, 'greet', 30, 133);

    actionBreathing.current = mixer.clipAction(clipIdle).setLoop(LoopRepeat, Infinity);
    actionEnterJump.current = mixer.clipAction(clipJumpEnter).setLoop(LoopOnce, 1);
    actionShock.current = mixer.clipAction(clipReaction_subblip).setLoop(LoopOnce, 1);
    actionGreet.current = mixer.clipAction(clipGreeting_subblip).setLoop(LoopOnce, 1);
    actionWalkLoop.current = mixer.clipAction(clipWalkingLoop).setLoop(LoopRepeat, Infinity);

    if (document.visibilityState === 'visible') {
      storyIntroduction({
        actionBreathing,
        actionEnterJump,
        actionGreet,
        actionShock,
        actionWalkLoop,
        scene,
        currentSection,
        previousSection,
      });
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (currentSection === 'aboutme' && previousSection === 'main') {
      storySimpleWalk({ seconds: 2000, actionBreathing, actionWalkLoop });
      setTimeout(() => {
        window.dispatchEvent(new Event('playSectionAboutmeContent'));
      }, 1000);
    } else if (currentSection === 'aboutme' && previousSection === 'contact') {
      setTimeout(() => {
        window.dispatchEvent(new Event('playSectionAboutmeContent'));
      }, 400);
    } else if (currentSection === 'main' && previousSection === 'aboutme') {
      setTimeout(() => {
        window.dispatchEvent(new Event('playSectionInitContent'));
      }, 1000);
    } else if (currentSection === 'main' && previousSection === 'contact') {
      setTimeout(() => {
        window.dispatchEvent(new Event('playSectionInitContent'));
      }, 1000);
    } else if (currentSection === 'contact' && previousSection === 'main') {
      storySimpleWalk({ seconds: 2000, actionBreathing, actionWalkLoop });
      setTimeout(() => {
        window.dispatchEvent(new Event('playSectionContactContent'));
      }, 2000);
    } else if (currentSection === 'contact' && previousSection === 'aboutme') {
      setTimeout(() => {
        window.dispatchEvent(new Event('playSectionContactContent'));
      }, 1500);
    }
  }, [currentSection, previousSection]);

  useFrame((state, delta) => {
    const refGrid = grid.current as unknown as GridProps & Mesh;
    const isJumping = actionEnterJump.current?.isRunning();
    const isWalking = actionWalkLoop.current?.isRunning();

    frameInitialize({
      state,
      isJumping: !!isJumping,
      isWalking: !!isWalking,
      refGrid,
      scene,
      currentSection,
      previousSection,
    });
  });

  return (
    <>
      <group ref={group}>
        <primitive object={scene} scale={0} />
        <ContactShadows
          position={[0, 0, 0]}
          opacity={1}
          scale={10}
          blur={2}
          far={1}
          resolution={256}
        />
        <Grid ref={grid} args={[5, 5]} {...gridConfig} />
        {/* <GroundCamera /> */}
        <Preload all />
      </group>
    </>
  );
}
