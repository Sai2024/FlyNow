import gsap from 'gsap'
import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'
import globe from '../images/globe.png'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	45,
	1000 / 500,
	0.1,
	1000
)
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas: document.querySelector('canvas'),
	alpha: true
})

// const globeContainer = document.querySelector('#globeContainer')



// Create a sphere

let sphereRadi = 5
let sphereSize = 50

const sphere = new THREE.Mesh(
	new THREE.SphereGeometry(sphereRadi, sphereSize, sphereSize),
	new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			globeTexture: {
				value: new THREE.TextureLoader().load(globe)
			}
		}
	})
)

// Creating Atmosphere

const atmosphere = new THREE.Mesh(
	new THREE.SphereGeometry(5, 50, 50),
	new THREE.ShaderMaterial({
		vertexShader: atmosphereVertexShader,
		fragmentShader: atmosphereFragmentShader,
		blending: THREE.AdditiveBlending,
		side: THREE.BackSide
	})
)

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere)


const group = new THREE.Group()
group.add(sphere)
scene.add(group)


camera.position.z = 15

const mouse = {
	x: null,
	y: null
}

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	sphere.rotation.y += 0.002
	gsap.to(group.rotation, {
		x: -mouse.y * 1.5,
		y: mouse.x * 1.5,
		duration: 2
	})
}
animate()

function getMouseCoordinatesWhileDown(callback) {
	let isMouseDown = false;

	document.addEventListener('mousedown', () => {
		isMouseDown = true;
	});

	document.addEventListener('mousemove', (event) => {
		if (isMouseDown) {
			const x = event.clientX;
			const y = event.clientY;
			callback(x, y);
		}
	});

	document.addEventListener('mouseup', () => {
		isMouseDown = false;
	});
}

getMouseCoordinatesWhileDown((x, y) => {
	console.log(`Mouse coordinates: (${x}, ${y})`);
	mouse.x = (x / innerWidth) * 2 - 1
	mouse.y = -(y / innerWidth) * 2 + 1
});

// addEventListener('mousedown', (event) => {
// 	console.log('NO')
// 	mouse.x = (event.clientX / innerWidth) * 2 - 1
// 	mouse.y = -(event.clientY / innerWidth) * 2 + 1
// })

// addEventListener('mouseup', () => {
// 	console.log('YES')
// })

const canvasWidth = (Math.PI * sphereRadi * sphereSize);
const canvasHeight = (Math.PI * sphereRadi * sphereSize)/2;

renderer.setSize(canvasWidth, canvasHeight)

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setClearColor( 0xffffff, 0 );