/**
 * LA TOTALE - High Performance Interaction Script
 * Engine: Three.js + GSAP ScrollTrigger
 */

// 1. Configuração da Cena Three.js
const canvas = document.querySelector('#car-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Iluminação Estilo Estúdio Porsche
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(0, 10, 0);
scene.add(topLight);

const rimLight = new THREE.SpotLight(0xffffff, 5);
rimLight.position.set(5, 5, 5);
scene.add(rimLight);

// Placeholder para o Carro (Substituir pelo seu .glb)
// No modelo real, cada peça (capô, portas, etc) deve ser um Mesh separado
const carGroup = new THREE.Group();
scene.add(carGroup);

// Simulação de peças do carro (BoxGeometry como placeholder)
const parts = [];
for(let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(2, 0.5, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x333333, 
        metalness: 1, 
        roughness: 0.5 
    });
    const part = new THREE.Mesh(geometry, material);
    
    // Posição inicial "desmontada"
    part.position.set(Math.random() * 5 - 2.5, Math.random() * 5, Math.random() * 5 - 2.5);
    part.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    
    carGroup.add(part);
    parts.push(part);
}

camera.position.z = 8;

// 2. GSAP & ScrollTrigger - A Mágica da Reconstrução
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

// Animação de Reconstrução
parts.forEach((part, index) => {
    tl.to(part.position, {
        x: 0,
        y: index * 0.6 - 1, // Alinha as peças verticalmente no centro
        z: 0,
        ease: "power2.inOut"
    }, 0);

    tl.to(part.rotation, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.inOut"
    }, 0);

    // Mudança de material: De fosco/danificado para brilho espelhado
    tl.to(part.material, {
        roughness: 0.1,
        metalness: 1,
        color: "#d1d1d1" // Prata cromado
    }, 0.5);
});

// Rotação contínua do grupo para visualização 360
tl.to(carGroup.rotation, { y: Math.PI * 2 }, 0);

// 3. Animações de Interface
gsap.from(".reveal-text", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.5
});

// 4. Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    gsap.to(".progress", { 
        width: "100%", 
        duration: 1, 
        onComplete: () => {
            gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
        } 
    });
});

// 5. Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

/** 
 * NOTA PARA O DESENVOLVEDOR:
 * Para implementar o modelo real:
 * 1. Use o GLTFLoader do Three.js.
 * 2. No callback 'onLoad', itere sobre as 'children' do modelo.
 * 3. Armazene as posições originais (as 'montadas') em variáveis.
 * 4. Use o GSAP para interpolar entre uma posição 'offset' e a original.
 */
