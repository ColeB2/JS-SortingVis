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
		context.fillRect( ((index * myGlobal.barWidth)+10), 0, myGlobal.barWidth-1, (2*element.Value))
	})
}

function _genArray() {
	return {Value: Math.ceil(Math.random() * 200)}
}

function generateArray() {
	if (!myGlobal.isRunning) {
		myGlobal.barWidth = Math.floor(cons.CANVAS_WIDTH/myGlobal.arrayLength)
		myGlobal.TEST_ARRAY = Array.from({length: myGlobal.arrayLength}, () => _genArray());
		updateCanvas(myGlobal.TEST_ARRAY, cons.CTX, [],[],[],myGlobal.TEST_ARRAY);
		selectAlgo(myGlobal.algoSelected, myGlobal.TEST_ARRAY)
		
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

// //Delay Range Slider
// function gameDelay() {
	// delayOutput.innerHTML = this.value;
	// myGlobal.delay = this.value;	
// }

// const delayRange = document.getElementById('delayRange');
// const delayOutput = document.getElementById('delayValue');
// delayOutput.innerHTML = delayRange.value;
// delayRange.addEventListener('input', gameDelay, false)


//Size of Array Range Slider
// function arraySize() {
	// sizeOutput.innerHTML = this.value;
	// myGlobal.arrayLength = this.value;
// }

// const sizeRange = document.getElementById('sizeRange');
// const sizeOutput = document.getElementById('sizeValue');
// sizeOutput.innerHTML = sizeRange.value;
// sizeRange.addEventListener('input', arraySize, false)


//////////////////////


const sliders = {
	"sizeRange": {
		//"function": arraySize, 
		"htmlOutput": "sizeValue",
		"globalVar": "arraySize"
		},
	"delayRange": {
		//"function": gameDelay,
		"htmlOutput": "delayValue",
		"globalVar": "delay"
	}
}

function changeSlider(value, htmlOutput, globalVariable) {
	console.log(value, htmlOutput, globalVariable, this)
	htmlOutput.innerHTML = this.value;
	myGlobal.sliderValues[globalVariable] = this.value;
	console.log(myGlobal.sliderValues)
	
}

function createSliders() {
	for (let key in sliders) {
		console.log(key)
		let newSliderRange = document.getElementById(key)
		let newSliderOutput = document.getElementById(sliders[key]["htmlOutput"])
		newSliderOutput.innerHTML = newSliderRange.value;
		newSliderRange.addEventListener(
		    'input',
		    function(event){changeSlider(newSliderRange.value, newSliderOutput, sliders[key]["globalVar"])},
			false)
		
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
	let option = algoDict[algorithmSelectMenu.options[algorithmSelectMenu.selectedIndex].value]
	if (myGlobal.algoSelected === false || option != myGlobal.algoSelected) {
		myGlobal.algoSelected = option
		selectAlgo(myGlobal.algoSelected, myGlobal.TEST_ARRAY)	
	}
}


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
						}, myGlobal.delay)	
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
myGlobal.delay = delayRange.value;
myGlobal.colors = {}
myGlobal.arrayLength = 20
myGlobal.barWidth = Math.floor(cons.CANVAS_WIDTH/myGlobal.arrayLength)
myGlobal.TEST_ARRAY = Array.from({length: myGlobal.arrayLength}, () => _genArray());

myGlobal.sliderValues = {
	"arraySize" : 20,
	"delay" : 300,
}
createSliders()
createColorSelects()
updateCanvas(myGlobal.TEST_ARRAY, cons.CTX, [], [] ,[], myGlobal.TEST_ARRAY);
mainLoop();