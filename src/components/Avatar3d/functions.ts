/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISections } from '@/contexts/sections/sectionsContext';
import { RootState } from '@react-three/fiber';
import { MutableRefObject } from 'react';
import { AnimationAction, MathUtils, Object3D, Object3DEventMap } from 'three';

export function getMouseDegrees(x: number, y: number, degreeLimit: number) {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;

  const w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)
  if (x <= w.x / 2) {
    xdiff = w.x / 2 - x;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }

  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }

  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = ((degreeLimit * 0.4 * yPercentage) / 100) * -1;
  }

  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * 0.5 * yPercentage) / 100;
  }

  return { x: dx, y: dy };
}

export function moveJoint(
  mouse: { x: number; y: number },
  joint: Object3D<Object3DEventMap>,
  degreeLimit: number,
  lerpFactor: number = 0.05, // Controls the speed of interpolation
) {
  const degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);

  // Gradually interpolate to the new rotation values
  const targetRotationX = MathUtils.degToRad(degrees.y);
  const targetRotationY = MathUtils.degToRad(degrees.x);

  joint.rotation.x = MathUtils.lerp(joint.rotation.x, targetRotationX, lerpFactor);
  joint.rotation.y = MathUtils.lerp(joint.rotation.y, targetRotationY, lerpFactor);
}

const mouse = [0, 0.5];

let neck: Object3D<Object3DEventMap> | undefined;
let spine: Object3D<Object3DEventMap> | undefined;
let spine1: Object3D<Object3DEventMap> | undefined;
let spine2: Object3D<Object3DEventMap> | undefined;
let head: Object3D<Object3DEventMap> | undefined;

export const setObjects = (object: Object3D<Object3DEventMap>) => {
  if (object.name === 'Neck') neck = object;
  if (object.name === 'Spine') spine = object;
  if (object.name === 'Spine1') spine1 = object;
  if (object.name === 'Spine2') spine2 = object;
  if (object.name === 'Head') head = object;
};

export const getObjects = () => {
  return { neck, spine, spine1, spine2, head };
};

export const reactOnMouseClick = (
  ev: MouseEvent,
  actionShock: MutableRefObject<AnimationAction | null>,
  actionBreathing: MutableRefObject<AnimationAction | null>,
) => {
  if (actionShock.current && actionBreathing.current && actionBreathing.current.isRunning()) {
    const idleAction = actionBreathing.current;
    const reactionAction = actionShock.current;
    reactionAction.clampWhenFinished = true;
    idleAction.fadeOut(0.1);
    reactionAction.reset().fadeIn(0.2).play();
    const mousecoords = { x: ev.clientX, y: ev.clientY };
    if (neck && head && spine && spine1 && spine2) {
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

export function onMouseMove(ev: MouseEvent) {
  mouse[0] = ev.clientX / window.innerWidth;
  mouse[1] = ev.clientY / window.innerHeight;

  const mousecoords = { x: ev.clientX, y: ev.clientY };
  if (neck && head && spine && spine1 && spine2) {
    moveJoint(mousecoords, neck, 25);
    moveJoint(mousecoords, head, 15);
    moveJoint(mousecoords, spine, 5);
    moveJoint(mousecoords, spine1, 5);
    moveJoint(mousecoords, spine2, 5);
  }
}

// Configurações iniciais
const xInicial = 0; // Posição inicial do avatar (no centro da sala)
const xFinal = -0.8; // Posição final do avatar (no centro da sala)
const zInicial = 0; // Posição inicial do avatar (no fundo da sala)
const zFinal = 5; // Posição final do avatar (perto da câmera)
const yInicial = 0.75; // Linha central do eixo
const yFinal = 0.05; // Posição final do avatar (perto da câmera)

const xAngleInicial = 0; // Rotação inicial do avatar
const xAngleFinal = 0; // Rotação final do avatar
const yAngleInicial = 0; // Rotação inicial do avatar
const yAngleFinal = -0.4; // Rotação final do avatar
const zAngleInicial = 0; // Rotação inicial do avatar
const zAngleFinal = 0; // Rotação

const xInicialMainToAboutme = -0.8;
const xFinalMainToAboutme = 0.6;
const zInicialMainToAboutme = 5;
const zFinalMainToAboutme = 6;
const yInicialMainToAboutme = 0.05;
const yFinalMainToAboutme = -0.15;

const xAngleInicialMainToAboutme = 0;
const xAngleFinalMainToAboutme = 0.1;
const yAngleInicialMainToAboutme = -0.4;
const yAngleFinalMainToAboutme = 0.5;
const zAngleInicialMainToAboutme = 0;
const zAngleFinalMainToAboutme = -0.1;

const xInicialAboutmeToMain = 0.9;
const xFinalAboutmeToMain = -0.8;
const zInicialAboutmeToMain = 6;
const zFinalAboutmeToMain = 5;
const yInicialAboutmeToMain = 0;
const yFinalAboutmeToMain = 0;

let progressoCaminhada = 0; // Vai de 0 a 1 (progresso da caminhada)
let isRun = false;

let progressoCaminhadaMainToAboutme = 0;
const progressoAngleMainToAboutme = 0;

let qlq = 0;
let indexY = 0;

let xxx = 0;
let yyy = 0;
let zzz = 0;

let xRot = 0;
let yRot = 0;
let zRot = 0;

export function frameInitialize({
  state,
  isJumping,
  isWalking,
  refGrid,
  scene,
  currentSection,
  previousSection,
}: {
  state: RootState;
  isJumping: boolean;
  isWalking: boolean;
  refGrid: Object3D<Object3DEventMap>;
  scene: Object3D<Object3DEventMap>;
  currentSection: ISections;
  previousSection: ISections;
}) {
  if (currentSection === 'main' && previousSection === 'main') {
    if (indexY < 0.07 && isJumping) {
      indexY += 0.003;
    } else if (indexY >= 0.07 && indexY < 1 && isJumping) {
      indexY += 0.1;
    }
    yyy = yInicial + (yFinal - yInicial) * indexY;

    if (isWalking && !isRun) {
      setTimeout(() => {
        isRun = true;
      }, 700);
    }

    if (isRun && progressoCaminhada < 1) {
      progressoCaminhada += 0.0055;

      zzz = zInicial + (zFinal - zInicial) * progressoCaminhada;
    } else if (!isWalking && progressoCaminhada >= 1) {
      if (qlq < 1) {
        qlq += 0.01;
      }

      xxx = xInicial + (xFinal - xInicial) * qlq;
      xRot = xAngleInicial + (xAngleFinal - xAngleInicial) * qlq;
      yRot = yAngleInicial + (yAngleFinal - yAngleInicial) * qlq;
      zRot = zAngleInicial + (zAngleFinal - zAngleInicial) * qlq;
    }
  }

  if (currentSection === 'aboutme' && previousSection === 'main') {
    if (progressoCaminhadaMainToAboutme < 1) {
      progressoCaminhadaMainToAboutme += 0.008;

      zzz =
        zInicialMainToAboutme +
        (zFinalMainToAboutme - zInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      xxx =
        xInicialMainToAboutme +
        (xFinalMainToAboutme - xInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      yyy =
        yInicialMainToAboutme +
        (yFinalMainToAboutme - yInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      xRot =
        xAngleInicialMainToAboutme +
        (xAngleFinalMainToAboutme - xAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      yRot =
        yAngleInicialMainToAboutme +
        (yAngleFinalMainToAboutme - yAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      zRot =
        zAngleInicialMainToAboutme +
        (zAngleFinalMainToAboutme - zAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
    }
  }

  if (currentSection === 'main' && previousSection === 'aboutme') {
    if (progressoCaminhadaMainToAboutme > 0) {
      progressoCaminhadaMainToAboutme -= 0.008;

      zzz =
        zInicialMainToAboutme +
        (zFinalMainToAboutme - zInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      xxx =
        xInicialMainToAboutme +
        (xFinalMainToAboutme - xInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      yyy =
        yInicialMainToAboutme +
        (yFinalMainToAboutme - yInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      xRot =
        xAngleInicialMainToAboutme +
        (xAngleFinalMainToAboutme - xAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      yRot =
        yAngleInicialMainToAboutme +
        (yAngleFinalMainToAboutme - yAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      zRot =
        zAngleInicialMainToAboutme +
        (zAngleFinalMainToAboutme - zAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
    }
  }

  scene.rotation.set(xRot, yRot, zRot);
  state.camera.rotation.set(-0.2, 0, 0);

  scene.position.set(0, yyy, zzz);
  state.camera.position.set(xxx, 1.5, 7);

  if (refGrid) {
    refGrid.position.set(xxx, 0, 0);
    refGrid.rotation.set(xRot, yRot * -1, zRot);
  }
}
