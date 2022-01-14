import * as cons from './constants.js'

const ARRAY_LENGTH = 20
Array.from(Array(ARRAY_LENGTH)).map(x=>Math.random())


const TEST_ARRAY = [100,25,95,15,48,16,20,17,55,69,72,83,14,28,30,22,78,69,38,45,56]



//TEST_ARRAY.map(function(element, index) {
//	cons.CTX.fillRect( ((index * cons.BAR_WIDTH)+10), 0, cons.BAR_WIDTH-1, (2*element))
//});


function drawArray(arr, context) {
	context.fillStyle = '#89FB92'
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

async function updateCanvas(arr, context) {
	updateVisuals(arr, context)
	await pause()
}


async function bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j+1]) {
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				
				//remove and abstract the update, pause portions.
				await updateCanvas(arr, cons.CTX)
			}
		}      		
	}
}

async function pause() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 2000)
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
}

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)

function animate(obj){
	let n = obj.length
	let i = 0
	if (i < n) {
		console.log("inside i< n")
		console.log(obj[i][0])
		updateCanvas(obj[i][0], cons.CTX)
		i ++;
		setTimeout(function() {
			console.log("inside timeout")
			window.requestAnimationFrame(function() {
				animate(obj);
			});
		}, 5000)
	}
}

function mainLoop() {
	if (isRunning) {
		let ani = bubbleSort(TEST_ARRAY)
		//updateCanvas(TEST_ARRAY, cons.CTX);
		animate(ani)
		setTimeout(()=> {
			window.requestAnimationFrame(mainLoop);
		}, 1000)
	}
}

updateCanvas(TEST_ARRAY, cons.CTX);
//let isRunning = true
//mainLoop();
bubbleSort(TEST_ARRAY)
//animate()