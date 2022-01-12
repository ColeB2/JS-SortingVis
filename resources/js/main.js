import * as cons from './constants.js'

const ARRAY_LENGTH = 20
Array.from(Array(ARRAY_LENGTH)).map(x=>Math.random())


const TEST_ARRAY = [100,25,95,15,48,16,20,17,55,69,72,83,14,28,30,22,78,69,38,45,56]



//TEST_ARRAY.map(function(element, index) {
//	cons.CTX.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
//});


function drawArray(arr, context) {
	arr.map(function(element, index) {
		context.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
	})
}

function updateCanvas(arr, context) {
	context.clearRect(0, 0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
	drawArray(arr, context)
}


function bubbleSort(arr) {
	console.log(arr)
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j+1]) {
				updateCanvas(arr, cons.CTX)
				console.log(arr)
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
                console.log(arr)
			}
		}      		
	}
}

function bubbleSortR(arr, n) {
	if (n==1) {
		return
	}
	
	for (var i = 0; i < n - 1; i++)
        if (arr[i] > arr[i + 1])
        {
         
            // swap arr[i], arr[i+1]
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
	bubbleSort(arr, n-1)
}
function bubbleDriver(arr) {
	bubbleSortR(arr, arr.length)
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

let start, previousTimeStamp;

function animate(){
	bubbleSort(TEST_ARRAY)
	setTimeout(function() {
		requestAnimationFrame(animate);
	}, 1000)
	
}

function mainLoop() {
	if (isRunning) {
		//bubbleSort(TEST_ARRAY)
		//updateCanvas(TEST_ARRAY, cons.CTX);
		setTimeout(()=> {
			window.requestAnimationFrame(mainLoop);
		}, 1000)
	}
}

updateCanvas(TEST_ARRAY, cons.CTX);
//let isRunning = true
//mainLoop();
animate()