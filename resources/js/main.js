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


//Bubble Sort --: loop through list, get largest, move it to end, repeat until sorted.
//functional --> won't loop -- recursively return array w largest element moved to end
//keep track end so we know how much is sorted and when to terminate
function getLargest(arr) {
	
}

function bubbleSort(arr, arr_complete) {
	if (arr.length === 1) {
		return
	}
	
}

updateCanvas(TEST_ARRAY, CTX);