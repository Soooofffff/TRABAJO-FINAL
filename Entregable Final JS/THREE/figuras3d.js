const scene = new THREE.Scene();

var loader = new THREE.TextureLoader();
loader.load('./Images/fondo.png', function(texture){
    scene.background = texture;
    
})
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.TorusGeometry( 1, 10, 16, 100 );

const textureLoader = new THREE.TextureLoader();

const matcap = textureLoader.load('./Images/galaxia.png')
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShading = true

const torus = new THREE.Mesh( geometry, material );
material.metalness = 0.3;
material.roughness = 0.7;
scene.add( torus );
torus.position.x = 2
torus.position.y = 8

const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('./robot/scene.gltf',
(gltf) =>{
    const loaderObjeto = gltf.scene;
    console.log('Carga Completa');
    scene.add (loaderObjeto);
    loaderObjeto.position.x = 4;
    loaderObjeto.position.y = 19;
    loaderObjeto.position.z = 25;

    var controls = new THREE.DragControls([loaderObjeto], camera,renderer.domElement)
}, ()=>{
    console.log ('cargando');
}, ()=>{
    console.log ('error');
}
);

const gltfLoader1 = new THREE.GLTFLoader();

gltfLoader1.load('./Simon/scene.gltf',
(gltf) =>{
    const loaderObjeto1 = gltf.scene;
    console.log('Carga Completa');
    scene.add (loaderObjeto1);
    loaderObjeto1.scale.set (25, 25, 25);
    loaderObjeto1.position.x = -55;
    loaderObjeto1.position.y = -25;
    loaderObjeto1.position.z = -15;

    var controls = new THREE.DragControls([loaderObjeto1], camera,renderer.domElement)
}, ()=>{
    console.log ('cargando');
}, ()=>{
    console.log ('error');
}
);

const light = new THREE.AmbientLight( 0xFFFFFF, 1 ); // soft white light
scene.add( light );

var controls = new THREE.DragControls([ gltfLoader,  gltfLoader1], camera,renderer.domElement)



camera.position.x = 8;
camera.position.y = 15;
camera.position.z = 50;

function animate() {
	requestAnimationFrame( animate );
    torus.rotation.x += 0.1;
    torus.rotation.y += 0.1;
    torus.rotation.z += 0.1;
    renderer.render( scene, camera );
}
animate();