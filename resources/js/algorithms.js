

export function* bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			yield [arr, [j, j+1],[] ,[], [], [0, i+1]]
			if (arr[j] > arr[j+1]) {
				yield [arr, [], [j, j+1], [], [], [0, i+1]];
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, [], [j, j+1], [], [], [0, i+1]];
			}
		}      		
	}
}

export function* selectionSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		var maxI = 0
		yield [arr, [maxI],[],[], [], [0,i+1]]
		
		for (let j = 1; j <= i; j++) {
			yield [arr, [maxI, j],[],[], [], [0,i+1]]
			
			if (arr[j] > arr[maxI]) {
				var maxI = j
				yield [arr, [maxI],[],[], [], [0,i+1]]
			}
		}
		yield [arr, [],[i, maxI],[], [], [0,i+1]]
		
		let temp = arr[i]
		arr[i] = arr[maxI]
		arr[maxI] = temp
		
		yield [arr, [],[i, maxI],[], [], [0,i+1]]
	}
}

export function* insertionSort(arr) {
	yield [arr, [],[],[0]]
	for (let i = 1; i <= arr.length; i++) {
		let arrayFocus = arr.slice(0,i+1)
		var item = arr[i]
		var j = i - 1;
		yield [arr, [],[],[i], arrayFocus]
		
		while (j >= 0 && item < arr[j]) {
			yield [arr, [j, j+1],[],[i], arrayFocus]
			yield [arr, [],[j, j+1],[i], arrayFocus]
			
			let temp = arr[j+1]
			arr[j+1] = arr[j]
			arr[j] = temp
			
			yield [arr, [],[j, j+1],[i], arrayFocus]
			
			j-=1;
		}
		arr[j+1] = item
		
		yield [arr, [],[],[i], arrayFocus]
	}
}

export function* mergeSort(arr) {
	yield [arr]
	function* mergeSortIn(left, right) {
		console.log("initial l r")
		console.log(left, right)
		if ((right-left) > 1) {
			var middle = Math.ceil((left + right)/2)
			yield * mergeSortIn(left, middle)

			yield * mergeSortIn((middle), right)
			
			var leftSubArr = arr.slice(left, middle)
			var leftN = leftSubArr.length
			var rightSubArr = arr.slice(middle, right)
			var rightN = rightSubArr.length
			
			var i = 0
			var j = 0
			var k = left
			
			var displayArr = leftSubArr.concat(rightSubArr)
			//yield [arr, [], [], [], displayArr]
			console.log("before pass l r")
			console.log(left, right)
			yield [arr, [], [], [], [], [left, right]]
			while (i < leftN && j < rightN) {
				if (leftSubArr[i] <= rightSubArr[j]) {
					arr[k] = leftSubArr[i]
					i++;
				} else {
					arr[k] = rightSubArr[j]
					j++;
				}
				k++;
			}
			while (i < leftN && j < rightN) {
				if (leftSubArr[i] <= rightSubArr[j]) {
					arr[k] = leftSubArr[i]
					i++;
				} else {
					arr[k] = rightSubArr[j]
					j++;
				}
				k++;
			}
			while (i < leftN) {
				arr[k] = leftSubArr[i]
				i++;
				k++;
			}
			while (j < rightN) {
				arr[k] = rightSubArr[j]
				j++;
				k++;
			}
		}
	
	}
	yield* mergeSortIn(0, arr.length)
	yield [arr]
	
}