import * as cons from './constants.js'
import {bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort, shellSort} from './algorithms.js'


function updateCanvas(arr, context, compare=[], swap=[], focusElem=[], arrObj=[]) {
	context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
	arr.map(function(element, index) {
		if (compare.includes(element)) {
			context.fillStyle = myGlobal.colors["compareColor"]
		} else if (swap.includes(element)) {
			context.fillStyle = myGlobal.colors["swapColor"]
		} else if (focusElem.includes(element)) {
			context.fillStyle = myGlobal.colors["tertiaryColor"]
		} else if (arrObj.includes(element)){
			context.fillStyle = myGlobal.colors["arrayFocusColor"]
		} else {
			context.fillStyle = myGlobal.colors["arrayColor"]
		}
		context.fillRect( ((index * myGlobal.barWidth)), 0, myGlobal.barWidth-1, (2*element.Value))
	})
}

function _genArray() {
	return {Value: Math.ceil(Math.random() * 200)}
}

function generateArray() {
	if (!myGlobal.isRunning) {
		myGlobal.barWidth = Math.floor(cons.CANVAS_WIDTH/myGlobal.sliders.sizeRange.value)
		myGlobal.TEST_ARRAY = Array.from({length: myGlobal.sliders.sizeRange.value}, () => _genArray());
		updateCanvas(myGlobal.TEST_ARRAY, cons.CTX, [],[],[],myGlobal.TEST_ARRAY);
		// selectAlgo(myGlobal.algoSelected, myGlobal.TEST_ARRAY)
		myGlobal.generatorAlgo = myGlobal.algoSelected(myGlobal.TEST_ARRAY)
		
	}
}

const generateArrayButton = document.getElementById('generatearray')
generateArrayButton.addEventListener('click', generateArray, false)

function pauseLoop() {
	if (myGlobal.isRunning) {
		pauseButton.innerText = 'Start';
		pauseButton.classList.remove('button-paused')
	} else {
		pauseButton.innerText = 'Pause';
		pauseButton.classList.add('button-paused')
		algorithmSelectFunction()
	}
	myGlobal.isRunning = !myGlobal.isRunning;
	mainLoop();
}

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)


//Sliders
function changeSlider() {
	myGlobal.sliders[event.target.id]["htmlOutput"].innerHTML = this.value
	myGlobal.sliders[event.target.id]["value"] = this.value;
}

function createSliders() {
	for (let key in myGlobal.sliders) {
		console.log(key)
		let newSliderRange = document.getElementById(key)
		let newSliderOutput = document.getElementById(myGlobal.sliders[key]["htmlOutputName"])
		newSliderOutput.innerHTML = newSliderRange.value;
		newSliderRange.addEventListener('input',changeSlider, false)
		myGlobal.sliders[key]["htmlOutput"] = newSliderOutput
	}
}



//Color Selection Pickers
function colorChoice(event) {
	myGlobal.colors[event.target.id.toString()] = this.value
}

const colorSelects = ["compareColor", "swapColor", "tertiaryColor", "arrayFocusColor", "arrayColor"]
function createColorSelects() {
	colorSelects.forEach((color) => {
		let newSelect = document.getElementById(color)
		newSelect.addEventListener('input', colorChoice, false)
		myGlobal.colors[color] = newSelect.value
	})
}

//Algorithm Selection Drop Down
function selectAlgo(algo, array) {
	if (algo) {
	myGlobal.generatorAlgo = algo(array)
	}
}

const algoDict = {
	"bubblesort": bubbleSort,
	"selectionsort": selectionSort,
	"shellsort": shellSort,
	"insertionsort": insertionSort,
	"mergesort": mergeSort,
	"heapsort": heapSort,
	"quicksort": quickSort
	} 


const algorithmSelectMenu = document.getElementById('algorithm-menu')
function algorithmSelectFunction() {
	console.log("genAlgo")
	console.log(myGlobal.generatorAlgo)
	let option = algoDict[algorithmSelectMenu.options[algorithmSelectMenu.selectedIndex].value]
	if (myGlobal.generatorAlgo === null || option != myGlobal.generatorAlgo) {
		//myGlobal.algoSelected = option
		// selectAlgo(myGlobal.algoSelected, myGlobal.TEST_ARRAY)
		myGlobal.generatorAlgo = option(myGlobal.TEST_ARRAY)
	}
}

//Main Loop
function mainLoop() {	
	function main() {
		if (myGlobal.isRunning) {
			if (myGlobal.generatorAlgo !== null) {
				let algo_results = myGlobal.generatorAlgo.next()
				let val = algo_results['value']
				let done = algo_results['done']
				if (!done) {
					updateCanvas(val[0], cons.CTX, val[1], val[2], val[3], val[4])
					setTimeout( () => {
						window.requestAnimationFrame(main);
						}, myGlobal.sliders.delayRange.value)	
				} else {
					myGlobal.generatorAlgo = null;
					myGlobal.algoSelected = false;
					pauseLoop();
				}
				
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
myGlobal.colors = {}
myGlobal.sliders = {
	"sizeRange":  {
		"value": 20,
		"htmlOutputName": "sizeValue",
		"htmlOutput": null},
	"delayRange" :  {
		"value": 300,
		"htmlOutputName": "delayValue",
		"htmlOutput": null}
}
myGlobal.barWidth = Math.floor(cons.CANVAS_WIDTH/myGlobal.sliders.sizeRange.value)
myGlobal.TEST_ARRAY = Array.from({length: myGlobal.sliders.sizeRange.value}, () => _genArray())

createSliders()
createColorSelects()
updateCanvas(myGlobal.TEST_ARRAY, cons.CTX, [], [] ,[], myGlobal.TEST_ARRAY);
mainLoop();