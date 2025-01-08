'use client';
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSections } from '@/contexts/sections/sectionsContext';
import { ContactShadows, Grid, GridProps, useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useEffect, useRef } from 'react';
import {
  AnimationAction,
  AnimationUtils,
  LoopOnce,
  LoopRepeat,
  Mesh,
  Object3D,
  Object3DEventMap,
} from 'three';
import { frameInitialize, moveJoint } from './functions';
useFBX.preload('/textures/avatarAnimations.fbx');
useGLTF.preload('/avatarAnimationsUpdate4.glb');
const mouse = [0, 0.5];
let neck: Object3D<Object3DEventMap> | undefined;
let spine: Object3D<Object3DEventMap> | undefined;
let spine1: Object3D<Object3DEventMap> | undefined;
let spine2: Object3D<Object3DEventMap> | undefined;
let head: Object3D<Object3DEventMap> | undefined;

export default function Model() {
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

  const group = useRef(null);
  const grid = useRef(null);

  const animationLevanta = useRef<AnimationAction | null>(null);
  const animationOla = useRef<AnimationAction | null>(null);
  const animationRespira = useRef<AnimationAction | null>(null);
  const animationReaccion = useRef<AnimationAction | null>(null);
  const animationWalkingLoop = useRef<AnimationAction | null>(null);

  const { animations, scene } = useGLTF('/avatarAnimationsUpdate4.glb');
  const { actions, clips, mixer } = useAnimations(animations, scene);

  const { currentSection, previousSection } = useSections();

  const reactOnMouseClick = (ev: MouseEvent) => {
    if (
      animationReaccion.current &&
      animationRespira.current &&
      animationRespira.current.isRunning()
    ) {
      const idleAction = animationRespira.current;
      const reactionAction = animationReaccion.current;
      reactionAction.clampWhenFinished = true;
      idleAction.fadeOut(0.1);
      reactionAction.reset().fadeIn(0.2).play();
      const mousecoords = { x: ev.clientX, y: ev.clientY };
      if (neck && head && spine && spine1 && spine2) {
        // console.log(neck);
        // console.log(head);
        moveJoint(mousecoords, neck, 50);
        moveJoint(mousecoords, head, 30);
        moveJoint(mousecoords, spine, 10);
        moveJoint(mousecoords, spine1, 10);
        moveJoint(mousecoords, spine2, 10);
      }
      setTimeout(() => {
        reactionAction.fadeOut(0.5);
        idleAction.reset().fadeIn(0.4).play();
      }, 1500);
    }
  };

  const walkingAction = (seconds: number) => {
    if (animationWalkingLoop.current && animationRespira.current) {
      const idleAction = animationRespira.current;
      const walkAction = animationWalkingLoop.current;
      animationWalkingLoop.current.reset().fadeIn(0.5).play().crossFadeFrom(idleAction, 0.5, true);

      setTimeout(() => {
        walkAction.fadeOut(0.5);
        idleAction.reset().fadeIn(0.4).play();
      }, seconds);
    }
  };

  // Função para alternar para a animação "Idle Breathing"
  const introduction = () => {
    if (
      animationOla.current &&
      animationLevanta.current &&
      animationRespira.current &&
      animationWalkingLoop.current
    ) {
      // // console.log(nodes);

      scene.traverse((child) => {
        if (child.type === 'Bone') {
          // console.log(child.name);
          if (child.name === 'Neck') {
            neck = child;
          }
          if (child.name === 'Spine') {
            spine = child;
          }
          if (child.name === 'Spine1') {
            spine1 = child;
          }
          if (child.name === 'Spine2') {
            spine2 = child;
          }
          if (child.name === 'Head') {
            head = child;
          }
        }

        if ((child as Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      animationLevanta.current.repetitions = 0;
      animationLevanta.current.clampWhenFinished = true;
      setTimeout(() => {
        window.dispatchEvent(new Event('animationIntroInit'));
      }, 1500);
      animationLevanta.current.reset().startAt(2).play();

      animationOla.current.clampWhenFinished = true;
      animationOla.current.repetitions = 0;

      animationWalkingLoop.current.clampWhenFinished = true;
      animationWalkingLoop.current.repetitions = Infinity;

      animationRespira.current.clampWhenFinished = true;
      // animationRespira.current.repetitions = Infinity;

      setTimeout(() => {
        if (animationLevanta.current && animationWalkingLoop.current) {
          animationWalkingLoop.current
            ?.reset()
            .play()
            .crossFadeFrom(animationLevanta.current, 1, true);
        }
      }, 3000);

      setTimeout(() => {
        if (animationWalkingLoop.current && animationRespira.current) {
          animationRespira.current
            .reset()
            .play()
            .crossFadeFrom(animationWalkingLoop.current, 0.5, true);
          window.addEventListener('click', reactOnMouseClick);
        }
      }, 5700);
    }
  };
  function onMouseMove(ev: MouseEvent) {
    mouse[0] = ev.clientX / window.innerWidth;
    mouse[1] = ev.clientY / window.innerHeight;

    const mousecoords = { x: ev.clientX, y: ev.clientY };
    if (neck && head && spine && spine1 && spine2) {
      // console.log(neck);
      // console.log(head);
      moveJoint(mousecoords, neck, 25);
      moveJoint(mousecoords, head, 15);
      moveJoint(mousecoords, spine, 5);
      moveJoint(mousecoords, spine1, 5);
      moveJoint(mousecoords, spine2, 5);
    }
  }

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

    animationRespira.current = mixer.clipAction(clipIdle).setLoop(LoopRepeat, Infinity);
    animationLevanta.current = mixer.clipAction(clipJumpEnter).setLoop(LoopOnce, 1);
    animationReaccion.current = mixer.clipAction(clipReaction_subblip).setLoop(LoopOnce, 1);
    animationOla.current = mixer.clipAction(clipGreeting);
    animationWalkingLoop.current = mixer.clipAction(clipWalkingLoop).setLoop(LoopRepeat, Infinity);

    if (document.visibilityState === 'visible') {
      introduction();
    }

    window.addEventListener('mousemove', onMouseMove);
  }, [actions, animations, clips]);

  // Configurações iniciais
  const xInicial = 0; // Posição inicial do avatar (no centro da sala)
  const xFinal = -0.8; // Posição final do avatar (no centro da sala)
  const zInicial = 0; // Posição inicial do avatar (no fundo da sala)
  const zFinal = 5; // Posição final do avatar (perto da câmera)
  const yInicial = 0.75; // Linha central do eixo
  const yFinal = 0; // Posição final do avatar (perto da câmera)

  const xAngleInicial = 0; // Rotação inicial do avatar
  const xAngleFinal = 0; // Rotação final do avatar
  const yAngleInicial = 0; // Rotação inicial do avatar
  const yAngleFinal = -0.4; // Rotação final do avatar
  const zAngleInicial = 0; // Rotação inicial do avatar
  const zAngleFinal = 0; // Rotação

  let progressoCaminhada = 0; // Vai de 0 a 1 (progresso da caminhada)
  let isRun = false;

  let qlq = 0;
  let indexY = 0;

  let xxx = 0;
  let yyy = 0;
  let zzz = 0;

  let xRot = 0;
  let yRot = 0;
  let zRot = 0;

  useEffect(() => {
    if (currentSection === 'aboutme' && previousSection === 'main') {
      walkingAction(2000);
    }
  }, [currentSection, previousSection]);
  useFrame((state) => {
    const refGrid = grid.current as unknown as GridProps & Mesh;
    const isJumping = animationLevanta.current?.isRunning();
    const isWalking = animationWalkingLoop.current?.isRunning();

    frameInitialize({
      state,
      isJumping: !!isJumping,
      isWalking: !!isWalking,
      refGrid,
      scene,
      currentSection,
      previousSection,
    });

    // if (indexY < 0.07 && isJumping) {
    //   indexY += 0.003;
    // } else if (indexY >= 0.07 && indexY < 1 && isJumping) {
    //   indexY += 0.1;
    // }
    // yyy = yInicial + (yFinal - yInicial) * indexY;

    // if (isWalking && !isRun) {
    //   setTimeout(() => {
    //     isRun = true;
    //   }, 800);
    // }

    // if (isRun && progressoCaminhada < 1) {
    //   progressoCaminhada += 0.008;

    //   zzz = zInicial + (zFinal - zInicial) * progressoCaminhada;
    // } else if (!isWalking && progressoCaminhada >= 1) {
    //   if (qlq < 1) {
    //     qlq += 0.01;
    //   }

    //   xxx = xInicial + (xFinal - xInicial) * qlq;
    //   xRot = xAngleInicial + (xAngleFinal - xAngleInicial) * qlq;
    //   yRot = yAngleInicial + (yAngleFinal - yAngleInicial) * qlq;
    //   zRot = zAngleInicial + (zAngleFinal - zAngleInicial) * qlq;
    // }

    // scene.rotation.set(xRot, yRot, zRot);
    // state.camera.rotation.set(-0.2, 0, 0);

    // scene.position.set(0, yyy, zzz);
    // state.camera.position.set(xxx, 1.5, 7);

    // if (refGrid) {
    //   refGrid.position.set(xxx, 0, 0);
    //   refGrid.rotation.set(xRot, yRot * -1, zRot);
    // }
  });

  return (
    <>
      <motion.group ref={group}>
        <primitive object={scene} scale={1} />
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
      </motion.group>
    </>
  );
}
