import * as cons from './constants.js'

const ARRAY_LENGTH = 20
Array.from(Array(ARRAY_LENGTH)).map(x=>Math.random())


const TEST_ARRAY = [100,25,95,15,48,16,20,17,55,69,72,83,14,28,30,22,78,69,38,45,56]



//TEST_ARRAY.map(function(element, index) {
//	cons.CTX.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
//});


function drawArray(arr, context) {
	context.fillStyle = '#343A40'
	arr.map(function(element, index) {
		context.fillSt
		context.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
	})
}

function updateLogic(arr, context) {
	
}

function updateVisuals(arr, context) {
	context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
	drawArray(arr, context)
	
}

function updateCanvas(arr, context) {
	updateVisuals(arr, context)
}

function* bubbleSort(arr) {
	algoRunning = true
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j+1]) {
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, j, j+1];
			}
		}      		
	}
	algoRunning = false
}


function generatorRunner(generatorObj) {
	console.log(generatorObj)
	for (let value of generatorObj) {
		console.log("inside for loop genobj value of")
		console.log(value)
		updateCanvas(value[0], cons.CTX)

	}
}


function generatorRunner2(generatorObj) {
	
}

async function delay() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 1000)
	})
}


function pauseLoop() {
	if (isRunning) {
		pauseButton.innerText = 'Start';
		pauseButton.classList.remove('button-paused')
	} else {
		pauseButton.innerText = 'Pause';
		pauseButton.classList.add('button-paused')	
	}
	
	isRunning = !isRunning;
	mainLoop();
}

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)


function mainLoop() {
	if (generatorAlgo === null) {
		let generatorAlgo = bubbleSort(TEST_ARRAY)
	}
	
	
	console.log(generatorAlgo)
	
	function main() {
		if (isRunning) {
			let val = generatorAlgo.next()
			console.log(val)
			updateCanvas(val['value'][0], cons.CTX)
			//generatorRunner(generatorAlgo)
			setTimeout( () => {
				window.requestAnimationFrame(main);
			}, 1000)
		}	
	}
	window.requestAnimationFrame(main)
	
}

updateCanvas(TEST_ARRAY, cons.CTX);
let isRunning = false
let algoRunning = false;
let generatorAlgo = null;
mainLoop();
//bubbleSort(TEST_ARRAY)
//animate()