import * as cons from './constants.js'
import {bubbleSort, selectionSort} from './algorithms.js'


function drawArray(arr, context) {
	context.fillStyle = '#343A40'
	arr.map(function(element, index) {
		context.fillRect( ((index * myGlobal.barWidth)+10), 0, myGlobal.barWidth-1, (2*element))
	})
}

function updateCanvas(arr, context, choice=null, arr2=[]) {
	context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
	drawArray(arr, context)
	if (choice === "compare") {
		context.fillStyle = '#89FB92'
		arr2.map(function(element, index) {
			context.fillRect(
			    ((element * myGlobal.barWidth)+10),
			    0, myGlobal.barWidth-1, (2*arr[element]))
		})
		context.fillStyle = '#343A40'
	}
	if (choice === "swap") {
		context.fillStyle = '#CE050F'
		arr2.map(function(element, index) {
			context.fillRect(
			    ((element * myGlobal.barWidth)+10),
				0, myGlobal.barWidth-1, (2*arr[element]))
		})
		context.fillStyle = '#343A40'
	}
	
}


function generateArray() {
	if (!myGlobal.isRunning) {
		myGlobal.barWidth = Math.floor(cons.CANVAS_WIDTH/myGlobal.arrayLength)
		myGlobal.TEST_ARRAY = Array.from({length: myGlobal.arrayLength}, () => Math.ceil(Math.random() * 200));
		updateCanvas(myGlobal.TEST_ARRAY, cons.CTX);
		selectAlgo(myGlobal.algoSelected, myGlobal.TEST_ARRAY)
		
	}
}

const generateArrayButton = document.getElementById('generatearray')
generateArrayButton.addEventListener('click', generateArray, false)

function pauseLoop() {
	if (myGlobal.isRunning) {
		pauseButton.innerText = 'Start';
		pauseButton.classList.remove('button-paused')
		
		algorithmButtons.forEach((btn) => {
			btn.removeAttribute("disabled")
		})

	} else {
		pauseButton.innerText = 'Pause';
		pauseButton.classList.add('button-paused')
		
		algorithmButtons.forEach((btn) => {
			btn.disabled = 'true';
			})
	}
	myGlobal.isRunning = !myGlobal.isRunning;
	mainLoop();
}

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)

function gameDelay() {
	delayOutput.innerHTML = this.value;
	myGlobal.delay = this.value;	
}

const delayRange = document.getElementById('delayRange');
const delayOutput = document.getElementById('delayValue');
delayOutput.innerHTML = delayRange.value;
delayRange.addEventListener('input', gameDelay, false)

function arraySize() {
	sizeOutput.innerHTML = this.value;
	myGlobal.arrayLength = this.value;
}

const sizeRange = document.getElementById('sizeRange');
const sizeOutput = document.getElementById('sizeValue');
sizeOutput.innerHTML = sizeRange.value;
sizeRange.addEventListener('input', arraySize, false)

function selectAlgo(algo, array) {
	if (algo) {
	myGlobal.generatorAlgo = algo(array)
	}
}

function sortFunction(buttonObj, algoFunction, arr,) {
	radioButton(buttonObj)
	myGlobal.algoSelected = algoFunction
	selectAlgo(myGlobal.algoSelected, arr)
	buttonObj.classList.add('button-paused')
}

function radioButton(buttonCalling) {
	algorithmButtons.forEach((btn) => {
		if (buttonCalling != btn) {
			btn.classList.remove('button-paused')
			btn.removeAttribute("disabled")
		}
	})
}


//ALGORITHM BUTTONS
let algorithmButtons = []

const bubbleSortButton = document.getElementById('bubblesort')
algorithmButtons.push(bubbleSortButton)
bubbleSortButton.addEventListener('click', (event) => sortFunction(bubbleSortButton, bubbleSort, myGlobal.TEST_ARRAY), false)

const selectionSortButton = document.getElementById('selectionsort')
algorithmButtons.push(selectionSortButton)
selectionSortButton.addEventListener('click', (event) => sortFunction(selectionSortButton, selectionSort, myGlobal.TEST_ARRAY), false)


function mainLoop() {	
	function main() {
		if (myGlobal.isRunning) {
			if (myGlobal.generatorAlgo !== null) {
				let algo_results = myGlobal.generatorAlgo.next()
				let val = algo_results['value']
				let done = algo_results['done']
				console.log(val)
				console.log(done)
				updateCanvas(val[0], cons.CTX, val[1], val[2])
				setTimeout( () => {
					window.requestAnimationFrame(main);
					}, myGlobal.delay)	
			}
			
		}	
	}
	window.requestAnimationFrame(main)	
}

//Main
//Global Variales
var myGlobal = {}
myGlobal.isRunning = false
myGlobal.generatorAlgo = null;
myGlobal.algoSelected = false;
myGlobal.delay = delayRange.value;
myGlobal.arrayLength = 20
myGlobal.barWidth = Math.floor(cons.CANVAS_WIDTH/myGlobal.arrayLength)
myGlobal.TEST_ARRAY = Array.from({length: myGlobal.arrayLength}, () => Math.ceil(Math.random() * 200));
updateCanvas(myGlobal.TEST_ARRAY, cons.CTX);
mainLoop();