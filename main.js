const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionando OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adiciona suavização aos movimentos
controls.dampingFactor = 0.25; // Controle de velocidade da suavização

let airplane;

// Carregando o modelo 3D do avião
const objLoader = new THREE.OBJLoader();
objLoader.load(
    './airplane.obj', // Caminho para o arquivo do modelo do avião
    function (object) {
        airplane = object; // Atribui o modelo carregado à variável airplane

        // Ajusta a rotação inicial do avião, se necessário
        airplane.rotation.x = Math.PI / 2; // Exemplo: rotação de 90 graus em torno do eixo X

        scene.add(airplane);

        // Adicionando iluminação ao avião
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiente
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direcional
        directionalLight.position.set(1, 1, 1); // Posição da luz direcional
        scene.add(directionalLight);
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar o modelo do avião', error);
    }
);

// Carregando as texturas da Skybox
const textureLoader = new THREE.CubeTextureLoader();
const skyboxTexture = textureLoader.load([
    './direita.png', // direita
    './esquerda.png', // esquerda
    './cima.png', // cima
    './baixo.png', // baixo
    './frente.png', // frente
    './tras.png'  // trás
]);

skyboxTexture.magFilter = THREE.LinearFilter;
skyboxTexture.minFilter = THREE.LinearFilter;

scene.background = skyboxTexture;

camera.position.z = 5;
camera.position.y = 5; // Posição inicial da câmera acima da cena

function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Atualiza os controles da câmera
    renderer.render(scene, camera);
}




animate();
