import * as cons from './constants.js'
import {bubbleSort} from './algorithms.js'

const ARRAY_LENGTH = 20
Array.from(Array(ARRAY_LENGTH)).map(x=>Math.random())


const TEST_ARRAY = [100,25,95,15,48,16,20,17,55,69,72,83,14,28,30,22,78,69,38,45,56]


function drawArray(arr, context) {
	context.fillStyle = '#343A40'
	arr.map(function(element, index) {
		context.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
	})
}

function updateCanvas(arr, context, choice=null, arr2=[]) {
	context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
	drawArray(arr, context)
	if (choice === "compare") {
		context.fillStyle = '#89FB92'
		arr2.map(function(element, index) {
			context.fillRect(
			    ((element * cons.BAR_WIDTH)+10),
			    0, cons.BAR_WIDTH-1, (2*arr[element]))
		})
		context.fillStyle = '#343A40'
	}
	if (choice === "swap") {
		context.fillStyle = '#CE050F'
		arr2.map(function(element, index) {
			context.fillRect(
			    ((element * cons.BAR_WIDTH)+10),
				0, cons.BAR_WIDTH-1, (2*arr[element]))
		})
		context.fillStyle = '#343A40'
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
	mainLoop();
}

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)

function selectAlgo(algo, array) {
	generatorAlgo = algo(array)
}

function radioButton() {
	for (btn in algorithmButtons) {
		btn.classList.remove('button-paused')
	}	
}

let algorithmButtons = []

const bubbleSortButton = document.getElementById('bubblesort')
algorithmButtons.push(bubbleSortButton)
bubbleSortButton.addEventListener('click', (event) => {
	radioButton()
	selectAlgo(bubbleSort, TEST_ARRAY)
	bubbleSortButton.classList.add('button-paused')
	
},false)


function mainLoop() {
	if (generatorAlgo === null) {
		//generatorAlgo = bubbleSort(TEST_ARRAY)
	}
	
	
	function main() {
		if (isRunning) {
			let val = generatorAlgo.next()
			updateCanvas(val['value'][0], cons.CTX, val['value'][1], val['value'][2])
			setTimeout( () => {
				window.requestAnimationFrame(main);
			}, 1000)
		}	
	}
	window.requestAnimationFrame(main)
	
}


//Main
updateCanvas(TEST_ARRAY, cons.CTX);
let isRunning = false
var generatorAlgo = null;
var algoSelected = false;
mainLoop();