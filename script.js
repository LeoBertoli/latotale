import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * LA TOTALE - Engine de Interação 3D
 */

let scene, camera, renderer, carModel;
const container = document.querySelector('#canvas-container');

function init3D() {
    // 1. Cena e Câmera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 8);

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Iluminação de Estúdio
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(0xffffff, 4);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    loadCarModel();
}

function loadCarModel() {
    const loader = new GLTFLoader();
    
    // Substitua 'assets/carro.glb' pelo caminho real do seu modelo
    loader.load('assets/carro.glb', 
        (gltf) => {
            carModel = gltf.scene;
            
            // Centralização automática
            const box = new THREE.Box3().setFromObject(carModel);
            const center = box.getCenter(new THREE.Vector3());
            carModel.position.sub(center);

            scene.add(carModel);
            setupScrollAnimations();
            hideLoader();
        },
        undefined,
        (error) => {
            console.warn('Modelo 3D não encontrado. Gerando placeholder técnico...');
            createPlaceholderCar();
            hideLoader();
        }
    );
}

function createPlaceholderCar() {
    carModel = new THREE.Group();
    
    // Criamos várias peças para simular a reconstrução
    for(let i = 0; i < 15; i++) {
        const geometry = new THREE.BoxGeometry(Math.random() * 2, 0.5, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            metalness: 0.9, 
            roughness: 0.1 
        });
        const part = new THREE.Mesh(geometry, material);
        
        // Posição final (montada)
        part.userData.originalPos = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
            z: (Math.random() - 0.5) * 2
        };
        
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
            scrub: 1.2,
        }
    });

    // Rotação cinematográfica
    tl.to(carModel.rotation, { y: Math.PI * 2, ease: "none" }, 0);

    // Lógica de Reconstrução das Peças
    carModel.traverse((child) => {
        if (child.isMesh) {
            // Estado inicial: Peças espalhadas e invisíveis
            const scatterX = (Math.random() - 0.5) * 15;
            const scatterY = (Math.random() - 0.5) * 15;
            const scatterZ = (Math.random() - 0.5) * 15;

            gsap.set(child.position, { x: scatterX, y: scatterY, z: scatterZ });
            gsap.set(child.material, { opacity: 0, transparent: true });

            // Animação para posição original (0,0,0 relativo ao grupo)
            tl.to(child.position, {
                x: 0, y: 0, z: 0,
                ease: "power3.inOut"
            }, 0);

            tl.to(child.material, {
                opacity: 1,
                duration: 0.4
            }, 0.2);
        }
    });

    // Fade out do texto hero
    gsap.to(".hero-overlay", {
        scrollTrigger: {
            trigger: "#hero",
            start: "20% top",
            end: "60% top",
            scrub: true
        },
        opacity: 0,
        y: -100
    });
}

function hideLoader() {
    gsap.to("#loader", { 
        opacity: 0, 
        duration: 1, 
        onComplete: () => document.getElementById('loader').style.display = 'none' 
    });
}

// Loop de Renderização
function animate() {
    requestAnimationFrame(animate);
    if (carModel) {
        // Movimento sutil de flutuação
        carModel.position.y += Math.sin(Date.now() * 0.002) * 0.0005;
    }
    renderer.render(scene, camera);
}

// Redimensionamento Responsivo
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init3D();
animate();
