import * as THREE from 'three';
//import "style.css";
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
let renderer, scene, camera, stats, meshKnot;
let lightProbe;


// lightProbe = new THREE.LightProbe();
// 		scene.add( lightProbe );

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    // Camera setup
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(50, 5,-15);

    // Scene setup
    scene = new THREE.Scene();

    // Initialize RectAreaLightUniforms
    RectAreaLightUniformsLib.init();

    // RectAreaLight setup
    const rectLights = [
        { color: 0xff0000, position: [-5, 5, 5] },
        { color: 0x00ff00, position: [0, 5, 5] },
        { color: 0x0000ff, position: [5, 5, 5] }
    ];

    rectLights.forEach(lightConfig => {
        const rectLight = new THREE.RectAreaLight(lightConfig.color, 5, 4, 10);
        rectLight.position.set(...lightConfig.position);
        scene.add(rectLight);
        scene.add(new RectAreaLightHelper(rectLight));
    });

    // Floor setup
    const geoFloor = new THREE.BoxGeometry(100, 0.1, 100);
    const matStdFloor = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 0.1, metalness: 0 });
    const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
    scene.add(mshStdFloor);

    // TorusKnot setup
    const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
    const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0 });
    meshKnot = new THREE.Mesh(geoKnot, matKnot);
    meshKnot.position.set(0, 5, 0);
    scene.add(meshKnot);

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true
    controls.target.copy(meshKnot.position);
    controls.autoRotate= true;


    //hdr
    // const hdrTextureURL = new URL('citrus_orchard_1k.hdr',import.meta.url);
    // const loader =new RGBELoader();
    // loader.load(hdrTextureURL, function(texture) {
    //     scene.background = texture;
    //     scene.environment = texture;
    // })

    const loader = new FBXLoader();
    loader.load('/static/models/fbx/Bed.fbx', function (object) {
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(20, 0, 0);
        scene.add(object);
    }, undefined, function (error) {
        console.error(error);
    });
    

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    // Stats setup
    stats = new Stats();
    document.body.appendChild(stats.dom);


    const geometry = new THREE.SphereGeometry( 4, 32, 16 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xfaabf56,roughness: 0.1, metalness: 2 } ); 
const sphere = new THREE.Mesh( geometry, material ); 
sphere.position.set(7,5,0)   
scene.add( sphere );

const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( -9, 4, 0 );
light.castShadow = true;
scene.add( light );




function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animation(time) {
    //meshKnot.position.x -= 0.001;
    controls.update();

    meshKnot.rotation.y = time / 1000;
    renderer.render(scene, camera);
    stats.update();
    //camera.position.x -= 0.1;
}
