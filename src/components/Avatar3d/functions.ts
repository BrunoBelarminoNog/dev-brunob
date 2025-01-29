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

  // Left
  if (x <= w.x / 2) {
    xdiff = w.x / 2 - x;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = ((degreeLimit * 0.7 * xPercentage) / 100) * -1;
  }

  // Right
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * 0.7 * xPercentage) / 100;
  }

  // Up
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = ((degreeLimit * 0.2 * yPercentage) / 100) * -1;
  }

  // Down
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
  lerpFactor: number = 0.05,
) {
  const degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);

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
    moveJoint(mousecoords, neck, 5);
    moveJoint(mousecoords, head, 5);
    moveJoint(mousecoords, spine, 2);
    moveJoint(mousecoords, spine1, 2);
    moveJoint(mousecoords, spine2, 2);
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
const xAngleFinal = 0.07; // Rotação final do avatar
const yAngleInicial = 0; // Rotação inicial do avatar
const yAngleFinal = -0.4; // Rotação final do avatar
const zAngleInicial = 0; // Rotação inicial do avatar
const zAngleFinal = 0.08; // Rotação

// MAIN - ABOUTME
const xInicialMainToAboutme = -0.8;
const xFinalMainToAboutme = 0.6;
let zInicialMainToAboutme = 5;
const zFinalMainToAboutme = 6;
const yInicialMainToAboutme = 0.05;
const yFinalMainToAboutme = -0.15;
const xAngleInicialMainToAboutme = xAngleFinal;
const xAngleFinalMainToAboutme = 0.1;
const yAngleInicialMainToAboutme = yAngleFinal;
const yAngleFinalMainToAboutme = 0.5;
const zAngleInicialMainToAboutme = zAngleFinal;
const zAngleFinalMainToAboutme = -0.1;

// MAIN - CONTACT
const xInicialMainToContact = -0.8;
const xFinalMainToContact = 0;
let zInicialMainToContact = 5;
const zFinalMainToContact = 6.75;
const yInicialMainToContact = 0.05;
const yFinalMainToContact = -0.3;
const xAngleInicialMainToContact = xAngleFinal;
const xAngleFinalMainToContact = -0.3;
const yAngleInicialMainToContact = yAngleFinal;
const yAngleFinalMainToContact = 0;
const zAngleInicialMainToContact = zAngleFinal;
const zAngleFinalMainToContact = 0;
const ygridInicialMainToContact = -0.7;
const ygridFinalMainToContact = -3;

// ABOUTME - CONTACT
const xInicialAboutmeToContact = 0.6;
const xFinalAboutmeToContact = 0;
const zInicialAboutmeToContact = 6;
const zFinalAboutmeToContact = 6.75;
const yInicialAboutmeToContact = -0.15;
const yFinalAboutmeToContact = -0.3;
const xAngleInicialAboutmeToContact = 0.1;
const xAngleFinalAboutmeToContact = -0.3;
const yAngleInicialAboutmeToContact = 0.5;
const yAngleFinalAboutmeToContact = 0;
const zAngleInicialAboutmeToContact = -0.1;
const zAngleFinalAboutmeToContact = 0;
const ygridInicialAboutmeToContact = -0.1;
const ygridFinalAboutmeToContact = -3;

let isRun = false;

let progressoCaminhadaMainInit = 0;
let progressoAngleMainInit = 0;
let progressoYMainInit = 0;

let progressoCaminhadaMainToAboutme = 0;
let progressoCaminhadaMainToContact = 0;
let progressoCaminhadaAboutmeToContact = 0;

let axisX = 0;
let axisY = 0;
let axisZ = 0;

let angleX = 0;
let angleY = 0;
let angleZ = 0;

let gridAngleX = 0;
let gridAngleY = 0;
let gridAngleZ = 0;

let gridY = -0.1;
let animationIntroMainInitJump = true;
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
  previousSection: ISections | undefined;
}) {
  zInicialMainToAboutme = 5;

  if (currentSection === 'main' && previousSection === 'main') {
    if (!animationIntroMainInitJump && progressoYMainInit < 1 && isJumping) {
      progressoYMainInit += 0.1;
    }

    if (animationIntroMainInitJump && isJumping) {
      animationIntroMainInitJump = false;
      window.dispatchEvent(new Event('animationIntroInit'));
    }

    axisY = yInicial + (yFinal - yInicial) * progressoYMainInit;
    if (isRun && progressoCaminhadaMainInit < 1) {
      progressoCaminhadaMainInit += 0.0045;
      axisZ = zInicial + (zFinal - zInicial) * progressoCaminhadaMainInit;
    } else if (!isWalking && progressoCaminhadaMainInit >= 1) {
      if (progressoAngleMainInit < 1) {
        progressoAngleMainInit += 0.01;
      }

      axisX = xInicial + (xFinal - xInicial) * progressoAngleMainInit;
      angleX = xAngleInicial + (xAngleFinal - xAngleInicial) * progressoAngleMainInit;
      angleY = yAngleInicial + (yAngleFinal - yAngleInicial) * progressoAngleMainInit;
      angleZ = zAngleInicial + (zAngleFinal - zAngleInicial) * progressoAngleMainInit;
      gridY = -0.1 + (-0.7 - -0.1) * progressoAngleMainInit;
      gridAngleX = angleX;
      gridAngleY = angleY;
      gridAngleZ = 0;
    }

    if (isWalking && !isRun) {
      setTimeout(() => {
        isRun = true;
      }, 250);
    }
  }

  if (currentSection === 'aboutme' && previousSection === 'aboutme') {
    zInicialMainToAboutme = 3;
    if (progressoCaminhadaMainToAboutme < 1) {
      progressoCaminhadaMainToAboutme += 0.008;

      axisZ =
        zInicialMainToAboutme +
        (zFinalMainToAboutme - zInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      axisX =
        xInicialMainToAboutme +
        (xFinalMainToAboutme - xInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      axisY =
        yInicialMainToAboutme +
        (yFinalMainToAboutme - yInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      angleX =
        xAngleInicialMainToAboutme +
        (xAngleFinalMainToAboutme - xAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      angleY =
        yAngleInicialMainToAboutme +
        (yAngleFinalMainToAboutme - yAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
      angleZ =
        zAngleInicialMainToAboutme +
        (zAngleFinalMainToAboutme - zAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

      gridY = -0.1;
      gridAngleX = angleX;
      gridAngleY = angleY;
      gridAngleZ = 0;
    }
    zInicialMainToAboutme = 5;
  }

  if (
    (currentSection === 'main' && previousSection === 'aboutme') ||
    (currentSection === 'aboutme' && previousSection === 'main')
  ) {
    const limit = currentSection === 'main' && previousSection === 'aboutme' ? 0 : 1;

    if (limit === 0 && progressoCaminhadaMainToAboutme > limit) {
      progressoCaminhadaMainToAboutme -= 0.03;
      progressoCaminhadaAboutmeToContact = 1;
    } else if (limit === 1 && progressoCaminhadaMainToAboutme < limit) {
      progressoCaminhadaMainToAboutme += 0.008;
      progressoCaminhadaAboutmeToContact = 0;
    }
    gridY = 0;
    axisZ =
      zInicialMainToAboutme +
      (zFinalMainToAboutme - zInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
    axisX =
      xInicialMainToAboutme +
      (xFinalMainToAboutme - xInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

    axisY =
      yInicialMainToAboutme +
      (yFinalMainToAboutme - yInicialMainToAboutme) * progressoCaminhadaMainToAboutme;

    angleX =
      xAngleInicialMainToAboutme +
      (xAngleFinalMainToAboutme - xAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
    angleY =
      yAngleInicialMainToAboutme +
      (yAngleFinalMainToAboutme - yAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
    angleZ =
      zAngleInicialMainToAboutme +
      (zAngleFinalMainToAboutme - zAngleInicialMainToAboutme) * progressoCaminhadaMainToAboutme;
    gridY = -0.7 + (-0.1 - -0.7) * progressoCaminhadaMainToAboutme;
    gridAngleX = angleX;
    gridAngleY = angleY;
    gridAngleZ = 0;
  }

  if (
    (currentSection === 'contact' && previousSection === 'main') ||
    (currentSection === 'main' && previousSection === 'contact')
  ) {
    const limit = currentSection === 'main' && previousSection === 'contact' ? 0 : 1;

    if (limit === 0 && progressoCaminhadaMainToContact > limit) {
      progressoCaminhadaMainToContact -= 0.02;
      progressoCaminhadaMainToAboutme = progressoCaminhadaMainToContact;
      progressoCaminhadaAboutmeToContact = progressoCaminhadaMainToContact;
    } else if (limit === 1 && progressoCaminhadaMainToContact < limit) {
      progressoCaminhadaMainToContact += 0.008;
      progressoCaminhadaMainToAboutme = progressoCaminhadaMainToContact;
      progressoCaminhadaAboutmeToContact = progressoCaminhadaMainToContact;
    }

    axisZ =
      zInicialMainToContact +
      (zFinalMainToContact - zInicialMainToContact) * progressoCaminhadaMainToContact;
    axisX =
      xInicialMainToContact +
      (xFinalMainToContact - xInicialMainToContact) * progressoCaminhadaMainToContact;
    axisY =
      yInicialMainToContact +
      (yFinalMainToContact - yInicialMainToContact) * progressoCaminhadaMainToContact;
    angleX =
      xAngleInicialMainToContact +
      (xAngleFinalMainToContact - xAngleInicialMainToContact) * progressoCaminhadaMainToContact;
    angleY =
      yAngleInicialMainToContact +
      (yAngleFinalMainToContact - yAngleInicialMainToContact) * progressoCaminhadaMainToContact;
    angleZ =
      zAngleInicialMainToContact +
      (zAngleFinalMainToContact - zAngleInicialMainToContact) * progressoCaminhadaMainToContact;

    gridY =
      ygridInicialMainToContact +
      (ygridFinalMainToContact - ygridInicialMainToContact) * progressoCaminhadaMainToContact;
    gridAngleX = 0.07 + (-0.3 - 0.07) * progressoCaminhadaMainToContact;
    gridAngleY = -0.4 + (0 - -0.4) * progressoCaminhadaMainToContact;
    gridAngleZ = 0;
  }

  if (
    (currentSection === 'contact' && previousSection === 'aboutme') ||
    (currentSection === 'aboutme' && previousSection === 'contact')
  ) {
    const limit = currentSection === 'aboutme' && previousSection === 'contact' ? 0 : 1;

    if (limit === 0 && progressoCaminhadaAboutmeToContact > limit) {
      progressoCaminhadaAboutmeToContact -= 0.025;
      progressoCaminhadaMainToContact = progressoCaminhadaAboutmeToContact;
    } else if (limit === 1 && progressoCaminhadaAboutmeToContact < limit) {
      progressoCaminhadaAboutmeToContact += 0.02;
      progressoCaminhadaMainToContact = progressoCaminhadaAboutmeToContact;
    }

    axisZ =
      zInicialAboutmeToContact +
      (zFinalAboutmeToContact - zInicialAboutmeToContact) * progressoCaminhadaAboutmeToContact;

    axisX =
      xInicialAboutmeToContact +
      (xFinalAboutmeToContact - xInicialAboutmeToContact) * progressoCaminhadaAboutmeToContact;
    axisY =
      yInicialAboutmeToContact +
      (yFinalAboutmeToContact - yInicialAboutmeToContact) * progressoCaminhadaAboutmeToContact;
    angleX =
      xAngleInicialAboutmeToContact +
      (xAngleFinalAboutmeToContact - xAngleInicialAboutmeToContact) *
        progressoCaminhadaAboutmeToContact;
    angleY =
      yAngleInicialAboutmeToContact +
      (yAngleFinalAboutmeToContact - yAngleInicialAboutmeToContact) *
        progressoCaminhadaAboutmeToContact;
    angleZ =
      zAngleInicialAboutmeToContact +
      (zAngleFinalAboutmeToContact - zAngleInicialAboutmeToContact) *
        progressoCaminhadaAboutmeToContact;

    gridY =
      ygridInicialAboutmeToContact +
      (ygridFinalAboutmeToContact - ygridInicialAboutmeToContact) *
        progressoCaminhadaAboutmeToContact;

    gridAngleX = 0.1 + (-0.3 - 0.1) * progressoCaminhadaMainToContact;
    gridAngleY = 0.5 + (0 - 0.5) * progressoCaminhadaMainToContact;
    gridAngleZ = 0;
  }

  if (currentSection === 'contact' && previousSection === 'contact') {
    if (progressoCaminhadaMainToContact < 1) {
      progressoCaminhadaMainToContact += 0.006;
      progressoCaminhadaMainToAboutme = progressoCaminhadaMainToContact;
      progressoCaminhadaAboutmeToContact = progressoCaminhadaMainToContact;
    }

    zInicialMainToContact = 4;
    axisZ =
      zInicialMainToContact +
      (zFinalMainToContact - zInicialMainToContact) * progressoCaminhadaMainToContact;

    axisX = 0;
    axisY = -0.3;
    angleX = 0 + (-0.3 - 0) * progressoCaminhadaMainToContact;
    angleY = 0;
    angleZ = 0;
    gridY = -3;
    zInicialMainToContact = 5;

    gridAngleX = -0.2 + (-0.3 - -0.2) * progressoCaminhadaMainToContact;
    gridAngleY = 0.05 + (0 - 0.05) * progressoCaminhadaMainToContact;
    gridAngleZ = angleZ;
  }

  scene.rotation.set(angleX, angleY, angleZ);
  state.camera.rotation.set(-0.2, 0, 0);

  scene.position.set(0, axisY, axisZ);
  state.camera.position.set(axisX, 1.5, 7);

  if (refGrid) {
    refGrid.position.set(axisX, gridY, 0);
    refGrid.rotation.set(gridAngleX, gridAngleY * -1, gridAngleZ);
  }
}
