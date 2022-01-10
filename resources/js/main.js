import * as cons from './constants.js'

const ARRAY_LENGTH = 20
Array.from(Array(ARRAY_LENGTH)).map(x=>Math.random())


const TEST_ARRAY = [100,25,95,15,48,16,20,17,55,69,72,83,14,28,30,22,78,69,38,45,55]



//TEST_ARRAY.map(function(element, index) {
//	cons.CTX.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
//});


function drawArray(arr, context) {
	arr.map(function(element, index) {
		context.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
	})
}

function updateCanvas(arr, context) {
	context.clearRect(0, 0, context.width, context.height);
	drawArray(arr, context)
}


function bubbleSort(arr) {	
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j+1]) {
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp			
			}
		}      		
	}
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
}

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)

function mainLoop() {
	if (isRunning) {
		bubbleSort(TEST_ARRAY)
		updateCanvas(TEST_ARRAY, cons.CTX);
		setTimeout( ()=> {
			window.requestAnimationFrame(mainLoop);
		}, 1000)
	}
}

updateCanvas(TEST_ARRAY, cons.CTX);
let isRunning = false
mainLoop();
