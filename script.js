import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * LA TOTALE - Engine de Interação 3D
 */

let scene, camera, renderer, carModel;
const container = document.querySelector('#canvas-container');

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 10);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Iluminação Profissional
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xf18f23, 10);
    orangeLight.position.set(5, 5, 5);
    scene.add(orangeLight);

    const blueLight = new THREE.PointLight(0x1b5395, 10);
    blueLight.position.set(-5, 5, 5);
    scene.add(blueLight);

    loadCarModel();
}

function loadCarModel() {
    const loader = new GLTFLoader();
    
    // Caminho para o modelo 3D (ex: assets/carro.glb)
    loader.load('assets/carro.glb', 
        (gltf) => {
            carModel = gltf.scene;
            scene.add(carModel);
            setupScrollAnimations();
            hideLoader();
        },
        undefined,
        (err) => {
            console.warn("Usando Placeholder 3D.");
            createLuxuryPlaceholder();
            hideLoader();
        }
    );
}

function createLuxuryPlaceholder() {
    carModel = new THREE.Group();
    const geometry = new THREE.BoxGeometry(4, 1.2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 1, roughness: 0.1 });
    const body = new THREE.Mesh(geometry, material);
    carModel.add(body);

    for(let i = 0; i < 15; i++) {
        const part = new THREE.Mesh(
            new THREE.BoxGeometry(Math.random(), 0.2, Math.random()),
            new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xd63d2d : 0x1b5395, metalness: 1 })
        );
        part.position.set(Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5);
        part.userData.originalPos = new THREE.Vector3(Math.random() * 3 - 1.5, 0.8, Math.random() * 1.5 - 0.75);
        carModel.add(part);
    }
    scene.add(carModel);
    setupScrollAnimations();
}

function setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    });

    tl.to(carModel.rotation, { y: Math.PI * 2 }, 0);

    carModel.children.forEach((child) => {
        if(child.userData.originalPos) {
            tl.to(child.position, {
                x: child.userData.originalPos.x,
                y: child.userData.originalPos.y,
                z: child.userData.originalPos.z,
                ease: "power2.inOut"
            }, 0);
        }
    });

    gsap.to(".hero-overlay", {
        scrollTrigger: { trigger: "#hero", start: "20% top", scrub: true },
        opacity: 0, y: -100
    });
}

function hideLoader() {
    gsap.to("#loader", { opacity: 0, duration: 1, onComplete: () => document.getElementById('loader').style.display = 'none' });
}

function animate() {
    requestAnimationFrame(animate);
    if(carModel) carModel.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init3D();
animate();
