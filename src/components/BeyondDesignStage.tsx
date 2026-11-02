import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX } from 'lucide-react';

// ==========================================
// 1. 8-BIT RETRO SYNTHESIZER
// ==========================================
class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playShutter() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Shutter burst noise
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, t);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.045);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);

    // Mechanical click chirp
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t + 0.04);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.12);
    oscGain.gain.setValueAtTime(0.2, t + 0.04);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(t + 0.04);
    osc.stop(t + 0.14);
  }

  playStrengthChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [330, 440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t + idx * 0.05);
      gain.gain.setValueAtTime(0.16, t + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.05);
      osc.stop(t + idx * 0.05 + 0.13);
    });
  }

  playTicketChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const freqs = [440, 660, 550, 880];
    freqs.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t + i * 0.055);
      gain.gain.setValueAtTime(0.18, t + i * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.055 + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.055);
      osc.stop(t + i * 0.055 + 0.11);
    });
  }

  playHoverBlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(920, t);
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  }
}

const soundEngine = new RetroSoundEngine();

// ==========================================
// 2. RETRO PIXEL HEART SVG GENERATOR
// ==========================================
const heartGrid = [
  '011000110',
  '111101111',
  '111111111',
  '111111111',
  '011111110',
  '001111100',
  '000111000',
  '000010000',
];

function generateHeartSVG(isFull: boolean) {
  let rects = '';
  heartGrid.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell !== '1') return;
      const isEdge = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].some(([dx, dy]) => {
        return (heartGrid[y + dy] || '')[x + dx] !== '1';
      });
      const fillColor = isEdge ? '#ffffff' : isFull ? '#ff1f2a' : '#000000';
      rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fillColor}"/>`;
    });
  });
  return `<svg viewBox="0 0 9 8" class="w-6 h-5 md:w-8 md:h-7" style="shape-rendering: crispEdges;">${rects}</svg>`;
}

// ==========================================
// 3. MAIN 3D COMPONENT
// ==========================================
export default function BeyondDesignStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tooltipTextRef = useRef<HTMLSpanElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const triggerInteractionRef = useRef<((id: string) => void) | null>(null);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
    if (next) soundEngine.playStrengthChime();
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const mainTooltip = tooltipRef.current;
    const flashOverlay = flashRef.current;
    if (!container || !canvas || !mainTooltip || !flashOverlay) return;

    // Palette constants
    const COLOR_WHITE = 0xffffff;
    const COLOR_BLACK = 0x000000;
    const COLOR_RED = 0xff1f2a;

    // Renderer setup with nearest pixelation
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(COLOR_BLACK);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 100);

    // Quantized 3-step toon material gradient
    const gradientData = new Uint8Array([95, 175, 255]);
    const gradientTexture = new THREE.DataTexture(gradientData, 3, 1, THREE.RedFormat);
    gradientTexture.minFilter = THREE.NearestFilter;
    gradientTexture.magFilter = THREE.NearestFilter;
    gradientTexture.needsUpdate = true;

    // Lights
    scene.add(new THREE.AmbientLight(COLOR_WHITE, 0.8));
    const sunLight = new THREE.DirectionalLight(COLOR_WHITE, 0.9);
    sunLight.position.set(-3, 6, 8);
    scene.add(sunLight);

    // Materials & Caches
    const materialCache: Record<number, THREE.MeshToonMaterial> = {};
    const getMaterial = (colorHex: number) => {
      if (!materialCache[colorHex]) {
        materialCache[colorHex] = new THREE.MeshToonMaterial({
          color: colorHex,
          gradientMap: gradientTexture,
        });
      }
      return materialCache[colorHex];
    };
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: COLOR_WHITE,
      side: THREE.BackSide,
    });

    const getRandom = (seed: number) => {
      const sin = Math.sin(seed * 12.9898) * 43758.5453;
      return sin - Math.floor(sin);
    };

    // Geometries
    const createBox = (width: number, height: number, depth: number) => new THREE.BoxGeometry(width, height, depth);
    const createSphere = (radius: number) => new THREE.SphereGeometry(radius, 10, 8);
    const createCylinder = (radius: number, height: number, segments = 10) =>
      new THREE.CylinderGeometry(radius, radius, height, segments);

    function addMesh(
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      colorHex: number,
      x = 0,
      y = 0,
      z = 0,
      options: { rotation?: [number, number, number]; scale?: [number, number, number]; noOutline?: boolean; outlineScale?: number } = {}
    ) {
      const mesh = new THREE.Mesh(geometry, getMaterial(colorHex));
      mesh.position.set(x, y, z);
      if (options.rotation) mesh.rotation.set(...options.rotation);
      if (options.scale) mesh.scale.set(...options.scale);
      parent.add(mesh);

      if (!options.noOutline) {
        const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
        outlineMesh.scale.setScalar(options.outlineScale || 1.08);
        mesh.add(outlineMesh);
      }
      return mesh;
    }

    // Characters & hitboxes
    interface CharacterConfig {
      charId: string;
      pants: number;
      shirt: number;
      torsoWidth?: number;
      torsoDepth?: number;
      hasGlasses?: boolean;
      sleeve?: number;
      forearm?: number;
    }

    const characters: THREE.Group[] = [];
    const hitboxes: THREE.Mesh[] = [];

    function createCharacter(xPosition: number, config: CharacterConfig) {
      const group = new THREE.Group();
      group.position.x = xPosition;
      scene.add(group);

      const body = new THREE.Group();
      group.add(body);

      const torsoWidth = config.torsoWidth || 1.25;
      const torsoDepth = config.torsoDepth || 0.6;

      addMesh(body, createBox(0.42, 1.5, 0.42), config.pants, -0.27, 0.75, 0);
      addMesh(body, createBox(0.42, 1.5, 0.42), config.pants, 0.27, 0.75, 0);
      addMesh(body, createBox(torsoWidth, 1.35, torsoDepth), config.shirt, 0, 2.1, 0);
      addMesh(body, createCylinder(0.16, 0.3), COLOR_WHITE, 0, 2.85, 0);

      const head = new THREE.Group();
      head.position.y = 3.2;
      body.add(head);

      addMesh(head, createSphere(0.4), COLOR_WHITE);
      addMesh(head, createSphere(0.4), COLOR_BLACK, 0, -0.15, 0.07, { scale: [0.92, 0.58, 0.9], noOutline: true });
      addMesh(head, createBox(0.16, 0.03, 0.03), COLOR_WHITE, 0, -0.12, 0.41, { noOutline: true });

      if (config.hasGlasses) {
        addMesh(head, createBox(0.3, 0.17, 0.06), COLOR_BLACK, -0.17, 0.05, 0.38, { noOutline: true });
        addMesh(head, createBox(0.3, 0.17, 0.06), COLOR_BLACK, 0.17, 0.05, 0.38, { noOutline: true });
        addMesh(head, createBox(0.1, 0.04, 0.06), COLOR_BLACK, 0, 0.07, 0.38, { noOutline: true });
      } else {
        [-1, 1].forEach((side) => {
          addMesh(head, createBox(0.07, 0.08, 0.04), COLOR_BLACK, side * 0.14, 0.05, 0.375, { noOutline: true });
          addMesh(head, createBox(0.16, 0.035, 0.04), COLOR_BLACK, side * 0.14, 0.15, 0.38, {
            noOutline: true,
            rotation: [0, 0, -side * 0.2],
          });
        });
      }

      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        addMesh(
          head,
          createSphere(0.19 + getRandom(i) * 0.05),
          COLOR_BLACK,
          Math.cos(angle) * 0.34,
          0.27 + 0.13 * Math.sin(angle) + getRandom(i + 9) * 0.06,
          Math.sin(angle) * 0.32 - 0.02
        );
      }
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        addMesh(head, createSphere(0.2), COLOR_BLACK, Math.cos(angle) * 0.17, 0.52, Math.sin(angle) * 0.17 - 0.04);
      }

      function createArm(sideMultiplier: number) {
        const armLength = 0.8;
        const shoulder = new THREE.Group();
        shoulder.position.set(sideMultiplier * (torsoWidth / 2 + 0.1), 2.7, 0);
        body.add(shoulder);

        addMesh(shoulder, createSphere(0.22), config.sleeve || config.shirt, 0, 0, 0, { noOutline: true });
        addMesh(shoulder, createBox(0.34, armLength, 0.34), config.sleeve || config.shirt, 0, -armLength / 2, 0);

        const elbow = new THREE.Group();
        elbow.position.y = -armLength;
        shoulder.add(elbow);

        addMesh(elbow, createBox(0.3, 0.75, 0.3), config.forearm || config.sleeve || config.shirt, 0, -0.37, 0);
        addMesh(elbow, createSphere(0.19), COLOR_WHITE, 0, -0.82, 0);

        return { shoulder, elbow };
      }

      const leftArm = createArm(-1);
      const rightArm = createArm(1);

      // Hitbox for raycasting
      const hitbox = new THREE.Mesh(createBox(3, 5, 3), new THREE.MeshBasicMaterial({ visible: false }));
      hitbox.position.y = 2.5;
      group.add(hitbox);
      hitboxes.push(hitbox);

      group.userData = {
        body,
        head,
        leftArm,
        rightArm,
        initX: xPosition,
        hitbox,
        charId: config.charId,
      };
      characters.push(group);
      return group;
    }

    // --- Character 1: Photographer ---
    const photographer = createCharacter(-3.1, {
      charId: 'photographer',
      pants: COLOR_BLACK,
      shirt: COLOR_WHITE,
      torsoWidth: 1.5,
      torsoDepth: 0.8,
    });
    {
      const bodyObj = photographer.userData.body;
      addMesh(bodyObj, createBox(1.15, 1.4, 0.5), COLOR_RED, 0, 2.1, -0.65);
      [-1, 1].forEach((s) => addMesh(bodyObj, createBox(0.2, 1.15, 0.06), COLOR_RED, s * 0.46, 2.2, 0.43));
      addMesh(bodyObj, new THREE.TorusGeometry(0.42, 0.14, 6, 12), COLOR_WHITE, 0, 2.82, -0.02, {
        rotation: [Math.PI / 2.4, 0, 0],
      });

      const { leftArm, rightArm } = photographer.userData;
      leftArm.shoulder.rotation.set(-0.5, 0, 0.55);
      rightArm.shoulder.rotation.set(-0.5, 0, -0.55);
      leftArm.elbow.rotation.x = -1.5;
      rightArm.elbow.rotation.x = -1.5;

      const cameraGroup = new THREE.Group();
      cameraGroup.position.set(0, 2.4, 1.1);
      bodyObj.add(cameraGroup);
      addMesh(cameraGroup, createBox(0.95, 0.55, 0.4), COLOR_BLACK, 0, 0, 0);
      addMesh(cameraGroup, createBox(0.35, 0.2, 0.3), COLOR_BLACK, 0, 0.35, 0);
      addMesh(cameraGroup, createCylinder(0.24, 0.32, 12), COLOR_WHITE, 0, 0, 0.3, {
        rotation: [Math.PI / 2, 0, 0],
      });
      addMesh(cameraGroup, createCylinder(0.15, 0.34, 12), COLOR_RED, 0, 0, 0.3, {
        rotation: [Math.PI / 2, 0, 0],
        noOutline: true,
      });
      photographer.userData.cameraObj = cameraGroup;
    }

    // --- Character 2: Gym Bro ---
    const lifter = createCharacter(0, {
      charId: 'gymbro',
      pants: COLOR_BLACK,
      shirt: COLOR_BLACK,
      torsoWidth: 1.4,
      sleeve: COLOR_BLACK,
      forearm: COLOR_WHITE,
    });
    {
      const bodyObj = lifter.userData.body;
      addMesh(bodyObj, createBox(1.55, 0.24, 0.85), COLOR_RED, 0, 2.8, 0);
      [-1, 1].forEach((s) => addMesh(bodyObj, createBox(0.42, 1.15, 0.12), COLOR_RED, s * 0.5, 2.25, 0.4));
      addMesh(bodyObj, createBox(0.34, 0.05, 0.03), COLOR_WHITE, 0, 2.25, 0.33, {
        noOutline: true,
        rotation: [0, 0, -0.12],
      });
      addMesh(bodyObj, createBox(1.1, 0.07, 0.03), COLOR_WHITE, 0, 1.5, 0.32, { noOutline: true });

      const { leftArm, rightArm } = lifter.userData;
      leftArm.shoulder.rotation.set(-0.3, 0, -0.2);
      rightArm.shoulder.rotation.set(0, 0, 0.14);
      rightArm.elbow.rotation.x = -0.15;

      const dumbbell = new THREE.Group();
      dumbbell.position.y = -0.82;
      leftArm.elbow.add(dumbbell);
      addMesh(dumbbell, createCylinder(0.07, 0.7), COLOR_WHITE, 0, 0, 0, { rotation: [0, 0, Math.PI / 2] });
      [-1, 1].forEach((s) =>
        addMesh(dumbbell, createCylinder(0.3, 0.26, 12), COLOR_BLACK, s * 0.4, 0, 0, {
          rotation: [0, 0, Math.PI / 2],
        })
      );
      lifter.userData.curlElbow = leftArm.elbow;
    }

    // --- Character 3: Peripatetic ---
    const curator = createCharacter(3.1, {
      charId: 'peripatetic',
      pants: COLOR_BLACK,
      shirt: COLOR_BLACK,
      torsoWidth: 1.4,
      hasGlasses: true,
    });
    {
      const bodyObj = curator.userData.body;
      addMesh(bodyObj, createBox(0.58, 1.15, 0.05), COLOR_WHITE, 0, 2.1, 0.32, { noOutline: true });
      addMesh(bodyObj, createBox(1.45, 0.1, 0.64), COLOR_BLACK, 0, 1.45, 0);
      addMesh(bodyObj, createBox(0.2, 0.13, 0.05), COLOR_WHITE, 0, 1.45, 0.34, { noOutline: true });
      [-1, 1].forEach((s) =>
        addMesh(bodyObj, createBox(0.3, 0.55, 0.1), COLOR_BLACK, s * 0.3, 2.68, 0.33, {
          rotation: [0, 0, s * 0.3],
        })
      );
      addMesh(bodyObj, createBox(0.2, 2.2, 0.06), COLOR_RED, 0, 2.1, 0.36, {
        rotation: [0, 0, -0.72],
        noOutline: true,
      });
      addMesh(bodyObj, createBox(0.62, 0.58, 0.32), COLOR_RED, -0.75, 1.15, 0.12, { rotation: [0, 0, 0.2] });

      const { leftArm, rightArm } = curator.userData;
      leftArm.shoulder.rotation.set(0, 0, -0.18);
      leftArm.elbow.rotation.x = -0.12;
      rightArm.shoulder.rotation.set(-0.15, 0, 0.12);
      rightArm.elbow.rotation.x = -0.45;
    }

    // --- Backdrop & Environment ---
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(70, 50), new THREE.MeshBasicMaterial({ color: COLOR_BLACK }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -12;
    scene.add(ground);

    const massiveSun = new THREE.Mesh(new THREE.CircleGeometry(16, 64), new THREE.MeshBasicMaterial({ color: COLOR_RED }));
    massiveSun.position.set(4, 14, -28);
    scene.add(massiveSun);

    function createMountain(x: number, z: number, radius: number, height: number) {
      const mesh = addMesh(scene, new THREE.ConeGeometry(radius, height, 5), COLOR_BLACK, x, height / 2, z);
      addMesh(scene, new THREE.ConeGeometry(radius * 0.4, height * 0.4, 5), COLOR_WHITE, x, height * 0.8, z);
      return mesh;
    }
    createMountain(-10, -14, 6, 7.5);
    createMountain(-4.5, -19, 5, 5);
    createMountain(10.5, -14, 5.5, 6.5);
    createMountain(2.5, -20, 5.5, 4);
    createMountain(15, -16, 5, 5.5);

    // Pine trees
    for (let i = 0; i < 7; i++) {
      const x = -8.2 + i * 0.75 + getRandom(i) * 0.4;
      const z = -5 - getRandom(i + 3) * 3;
      for (let j = 0; j < 3; j++) {
        addMesh(scene, new THREE.ConeGeometry(0.85 - j * 0.2, 1.2, 6), COLOR_BLACK, x, 0.9 + j * 0.8, z);
      }
    }

    // Clouds
    const cloudPositions = [
      [-8, 6.8, -14],
      [-1, 8.4, -18],
      [3.5, 6.4, -16],
      [10, 6.6, -14],
      [-12, 4.8, -18],
      [12, 8, -20],
    ];
    const cloudGroups = cloudPositions.map(([x, y, z], i) => {
      const group = new THREE.Group();
      group.position.set(x, y, z);
      const scale = 1 + getRandom(i) * 0.5;
      [
        [0, 0, 2.4, 0.42],
        [0.3, 0.4, 1.5, 0.4],
        [-0.2, 0.75, 0.8, 0.35],
      ].forEach(([a, b, w, h]) => {
        addMesh(group, createBox(w * scale, h * scale, 0.4), COLOR_WHITE, a * scale, b * scale, 0, { noOutline: true });
      });
      scene.add(group);
      return group;
    });

    // Grass blades
    const grassGeometry = new THREE.ConeGeometry(0.08, 0.8, 3);
    const grassBlades: THREE.Mesh[] = [];
    for (let i = 0; i < 130; i++) {
      const isWhite = i % 3 === 0;
      const grassMesh = new THREE.Mesh(grassGeometry, getMaterial(isWhite ? COLOR_WHITE : COLOR_BLACK));
      const inFront = i < 95;
      grassMesh.position.set(
        (getRandom(i) - 0.5) * 22,
        0.38,
        inFront ? 1.4 + getRandom(i + 5) * 3 : -1 - getRandom(i + 7) * 4
      );
      grassMesh.scale.y = 0.6 + getRandom(i + 2) * 1.1;
      scene.add(grassMesh);
      grassBlades.push(grassMesh);
    }

    // --- Camera & Orbit Controls ---
    let targetYaw = 0;
    let targetPitch = 0.06;
    let currentYaw = 0;
    let currentPitch = 0.06;

    let isPointerDown = false;
    let pointerMoveDistance = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let activeTooltipChar: THREE.Group | null = null;
    let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

    function showTooltipFor(charObj: THREE.Group, text: string) {
      if (!mainTooltip) return;
      if (tooltipTextRef.current) {
        tooltipTextRef.current.textContent = text;
      } else {
        mainTooltip.innerText = text;
      }
      mainTooltip.classList.remove('opacity-0', 'pointer-events-none');
      mainTooltip.classList.add('opacity-100');
      activeTooltipChar = charObj;

      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        mainTooltip.classList.remove('opacity-100');
        mainTooltip.classList.add('opacity-0', 'pointer-events-none');
        activeTooltipChar = null;
      }, 4500);
    }

    function triggerInteraction(charId: string) {
      if (charId === 'photographer') {
        soundEngine.playShutter();
        flashOverlay.classList.remove('opacity-0');
        flashOverlay.classList.add('opacity-100');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            flashOverlay.classList.remove('opacity-100');
            flashOverlay.classList.add('opacity-0');
          });
        });
        photographer.userData.cameraObj.position.z = 0.95;
        setTimeout(() => {
          photographer.userData.cameraObj.position.z = 1.1;
        }, 150);
        showTooltipFor(photographer, 'Clicks a good picture 3 out of 10 times');
      } else if (charId === 'gymbro') {
        soundEngine.playStrengthChime();
        lifter.userData.isCurling = true;
        setTimeout(() => {
          lifter.userData.isCurling = false;
        }, 2500);
        showTooltipFor(lifter, 'Can live inside a gym');
      } else if (charId === 'peripatetic') {
        soundEngine.playTicketChime();
        showTooltipFor(curator, 'Always open for design shows, galleries basically anything interactive');
      }
    }

    triggerInteractionRef.current = triggerInteraction;

    // Pointer events on canvas
    const handlePointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      pointerMoveDistance = 0;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const deltaX = e.clientX - lastPointerX;
      const deltaY = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      pointerMoveDistance += Math.abs(deltaX) + Math.abs(deltaY);

      targetYaw = Math.max(-0.7, Math.min(0.7, targetYaw - deltaX * 0.004));
      targetPitch = Math.max(-0.05, Math.min(0.35, targetPitch + deltaY * 0.003));
    };

    const handlePointerUp = (e: PointerEvent) => {
      isPointerDown = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      // Tap tolerance relaxed to < 15px for touch screens
      if (pointerMoveDistance < 15) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(hitboxes);
        if (intersects.length > 0) {
          const hitChar = characters.find((c) => c.userData.hitbox === intersects[0].object);
          if (hitChar && hitChar.userData.charId) {
            triggerInteraction(hitChar.userData.charId);
          }
        }
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);

    // Responsive resize handler with dynamic mobile FOV
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const pixelScale = Math.max(2, Math.round(height / 230));
      renderer.setSize(Math.round(width / pixelScale), Math.round(height / pixelScale), false);

      const aspect = width / height;
      camera.aspect = aspect;
      if (aspect < 1) {
        // Keep a consistent horizontal frame on narrow screens so every character remains visible.
        camera.fov = width <= 768
          ? (2 * Math.atan(Math.tan((25 * Math.PI) / 180) / aspect) * 180) / Math.PI
          : Math.min(65, 42 * (1 / aspect) * 0.72);
      } else if (aspect < 16 / 9) {
        camera.fov = (2 * Math.atan((Math.tan((21 * Math.PI) / 180) * (16 / 9)) / aspect) * 180) / Math.PI;
      } else {
        camera.fov = 42;
      }
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    handleResize();

    // --- Render Loop ---
    const clock = new THREE.Clock();
    const cameraTarget = new THREE.Vector3(0, 2, 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;

    const renderLoop = () => {
      const time = prefersReducedMotion ? 0 : clock.getElapsedTime();

      currentYaw += (targetYaw - currentYaw) * 0.1;
      currentPitch += (targetPitch - currentPitch) * 0.1;

      const animatedYaw = currentYaw + Math.sin(time * 0.4) * 0.04;
      const orbitRadius = 9.5;

      camera.position.set(
        Math.sin(animatedYaw) * orbitRadius * Math.cos(currentPitch),
        2 + Math.sin(currentPitch) * orbitRadius,
        Math.cos(animatedYaw) * orbitRadius * Math.cos(currentPitch)
      );
      camera.lookAt(cameraTarget);

      characters.forEach((char) => {
        const data = char.userData;
        data.body.position.y = Math.sin(time * 1.8 + data.initX) * 0.03;
        data.head.rotation.z = Math.sin(time * 0.9 + data.initX) * 0.03;
      });

      // Gym bro curl animation
      if (lifter.userData.isCurling) {
        lifter.userData.curlProgress = Math.min(1, (lifter.userData.curlProgress || 0) + 0.1);
      } else {
        lifter.userData.curlProgress = Math.max(0, (lifter.userData.curlProgress || 0) - 0.05);
      }
      lifter.userData.curlElbow.rotation.x = -0.15 - 1.7 * (lifter.userData.curlProgress || 0);

      // Cloud drift
      cloudGroups.forEach((cloud, index) => {
        cloud.position.x += 0.004 * (1 + index * 0.1) * (prefersReducedMotion ? 0 : 1);
        if (cloud.position.x > 16) cloud.position.x = -16;
      });

      // Sun breathing pulse
      massiveSun.scale.setScalar(1 + Math.sin(time * 1.2) * 0.015);

      // Grass blade sway
      grassBlades.forEach((blade, index) => {
        blade.rotation.z = Math.sin(time * 1.5 + index) * 0.07 + (getRandom(index + 4) - 0.5) * 0.3;
      });

      // 3D head-tracked tooltip projection relative to container
      if (activeTooltipChar && mainTooltip.classList.contains('opacity-100')) {
        const vector = new THREE.Vector3();
        activeTooltipChar.userData.head.getWorldPosition(vector);
        vector.y += 0.95; // Lift well above head in 3D world space before projection
        vector.project(camera);
        const rect = container.getBoundingClientRect();
        const x = (vector.x * 0.5 + 0.5) * rect.width;
        const y = (-vector.y * 0.5 + 0.5) * rect.height;

        mainTooltip.style.left = `${x}px`;
        mainTooltip.style.top = `${y}px`;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);

      renderer.dispose();
      gradientTexture.dispose();
      outlineMaterial.dispose();
      Object.values(materialCache).forEach((m) => m.dispose());
      scene.clear();
    };
  }, []);

  const handleLabelClick = useCallback((charId: string) => {
    if (triggerInteractionRef.current) {
      triggerInteractionRef.current(charId);
    }
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-[650px] md:h-[800px] bg-black overflow-hidden select-none border-t border-zinc-900 font-pixel"
      aria-label="Beyond Design - Interactive 3D Retro Stage"
    >
      {/* 3D WebGL Canvas with pixelated rendering */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ imageRendering: 'pixelated' as any }}
      />

      {/* Camera Shutter Flash Overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0 transition-opacity duration-150 z-20"
      />

      {/* 3D Tracked Tooltip (Centered above head with downward beak) */}
      <div
        ref={tooltipRef}
        className="absolute z-40 bg-black border-[3px] border-white px-3.5 py-2.5 text-center pointer-events-none opacity-0 transition-opacity duration-200 -translate-x-1/2 -translate-y-full shadow-[4px_4px_0_#ff1f2a]"
        style={{
          maxWidth: 'min(280px, 85vw)',
          fontSize: 'clamp(8px, 1.1vw, 11px)',
          lineHeight: '1.45',
          willChange: 'left, top, opacity',
        }}
      >
        <span ref={tooltipTextRef} className="block text-white font-pixel" />
        <div
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-white"
          aria-hidden="true"
        />
      </div>

      {/* RETRO VIEWFINDER HUD OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10">

        {/* Responsive Red Corner Brackets */}
        <div
          className="absolute border-t-[6px] md:border-t-[10px] border-l-[6px] md:border-l-[10px] border-[#ff1f2a]"
          style={{
            left: 'clamp(12px, 3vw, 32px)',
            top: 'clamp(12px, 3vw, 32px)',
            width: 'clamp(24px, 5vw, 48px)',
            height: 'clamp(24px, 5vw, 48px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute border-t-[6px] md:border-t-[10px] border-r-[6px] md:border-r-[10px] border-[#ff1f2a]"
          style={{
            right: 'clamp(12px, 3vw, 32px)',
            top: 'clamp(12px, 3vw, 32px)',
            width: 'clamp(24px, 5vw, 48px)',
            height: 'clamp(24px, 5vw, 48px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute border-b-[6px] md:border-b-[10px] border-l-[6px] md:border-l-[10px] border-[#ff1f2a]"
          style={{
            left: 'clamp(12px, 3vw, 32px)',
            bottom: 'clamp(12px, 3vw, 32px)',
            width: 'clamp(24px, 5vw, 48px)',
            height: 'clamp(24px, 5vw, 48px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute border-b-[6px] md:border-b-[10px] border-r-[6px] md:border-r-[10px] border-[#ff1f2a]"
          style={{
            right: 'clamp(12px, 3vw, 32px)',
            bottom: 'clamp(12px, 3vw, 32px)',
            width: 'clamp(24px, 5vw, 48px)',
            height: 'clamp(24px, 5vw, 48px)',
          }}
          aria-hidden="true"
        />

        {/* Top HUD Row */}
        <div className="flex items-center justify-between w-full pointer-events-auto pt-2 px-2 md:px-6">
          {/* Top-Left: 3 Pixel-Art Hearts */}
          <div
            className="flex items-center gap-2"
            title="HP: 2/3"
            dangerouslySetInnerHTML={{
              __html: generateHeartSVG(true) + generateHeartSVG(true) + generateHeartSVG(false),
            }}
          />

          {/* Top-Right: Sound Toggle + LV. 26 Badge */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white bg-black/80 px-2 py-1 border border-zinc-700 text-[8px] md:text-[10px] tracking-wider uppercase transition-colors"
              title={soundEnabled ? 'Mute 8-Bit Audio' : 'Enable 8-Bit Audio'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-[#ff1f2a]" />
                  <span className="hidden sm:inline">SFX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-zinc-500" />
                  <span className="hidden sm:inline">SFX: OFF</span>
                </>
              )}
            </button>

            <span className="font-pixel text-white text-xs md:text-base tracking-widest bg-black px-2 py-1 border border-zinc-700 shadow-[2px_2px_0_#ff1f2a]">
              LV. 26
            </span>
          </div>
        </div>

        {/* Bottom Character Name Badges */}
        <div
          className="w-full flex justify-around items-end px-2 md:px-8 pointer-events-none z-30"
          style={{
            marginBottom: 'calc(env(safe-area-inset-bottom, 0px) + 3vh)',
          }}
        >
          <button
            type="button"
            onClick={() => handleLabelClick('photographer')}
            onMouseEnter={() => soundEnabled && soundEngine.playHoverBlip()}
            className="pointer-events-auto min-w-0 flex-1 sm:min-w-max sm:flex-initial text-center whitespace-nowrap text-white hover:text-[#ff1f2a] transition-all duration-200 hover:-translate-y-1 drop-shadow-[2px_2px_0_#000000] focus:outline-none focus:text-[#ff1f2a] px-0.5 py-2 tracking-[0.02em] sm:px-1.5 sm:py-1 sm:tracking-wider"
            style={{ fontSize: 'clamp(6px, 2.1vw, 12px)' }}
          >
            PHOTOGRAPHER
          </button>

          <button
            type="button"
            onClick={() => handleLabelClick('gymbro')}
            onMouseEnter={() => soundEnabled && soundEngine.playHoverBlip()}
            className="pointer-events-auto min-w-0 flex-1 sm:min-w-max sm:flex-initial text-center whitespace-nowrap text-white hover:text-[#ff1f2a] transition-all duration-200 hover:-translate-y-1 drop-shadow-[2px_2px_0_#000000] focus:outline-none focus:text-[#ff1f2a] px-0.5 py-2 tracking-[0.02em] sm:px-1.5 sm:py-1 sm:tracking-wider"
            style={{ fontSize: 'clamp(6px, 2.1vw, 12px)' }}
          >
            GYM BRO
          </button>

          <button
            type="button"
            onClick={() => handleLabelClick('peripatetic')}
            onMouseEnter={() => soundEnabled && soundEngine.playHoverBlip()}
            className="pointer-events-auto min-w-0 flex-1 sm:min-w-max sm:flex-initial text-center whitespace-nowrap text-white hover:text-[#ff1f2a] transition-all duration-200 hover:-translate-y-1 drop-shadow-[2px_2px_0_#000000] focus:outline-none focus:text-[#ff1f2a] px-0.5 py-2 tracking-[0.02em] sm:px-1.5 sm:py-1 sm:tracking-wider"
            style={{ fontSize: 'clamp(6px, 2.1vw, 12px)' }}
          >
            PERIPATETIC
          </button>
        </div>

      </div>
    </section>
  );
}
