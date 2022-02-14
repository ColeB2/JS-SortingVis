

export function* bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			let completed_arr = arr.slice(0, i+1)
			yield [arr, [arr[j], arr[j+1]],[] ,[], completed_arr];
			if (arr[j].Value > arr[j+1].Value) {
			yield [arr, [], [arr[j], arr[j+1]], [], completed_arr];
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, [], [arr[j], arr[j+1]], [], completed_arr];
			}
		}      		
	}
}

export function* selectionSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		let completed_arr = arr.slice(0, i+1)
		var maxI = 0
		yield [arr, [arr[maxI]],[],[], completed_arr]
		
		for (let j = 1; j <= i; j++) {
			yield [arr, [arr[maxI], arr[j]],[],[], completed_arr]
			
			if (arr[j].Value > arr[maxI].Value) {
				var maxI = j
				yield [arr, [arr[maxI]],[],[], completed_arr]
			}
		}
		yield [arr, [],[arr[i], arr[maxI]],[], completed_arr]
		
		let temp = arr[i]
		arr[i] = arr[maxI]
		arr[maxI] = temp
		
		yield [arr, [],[arr[i], arr[maxI]],[], completed_arr]
	}
}

export function* insertionSort(arr) {
	yield [arr, [],[],[0]]
	for (let i = 1; i <= arr.length; i++) {
		let arrayFocus = arr.slice(0,i+1)
		var item = arr[i]
		var j = i - 1;
		yield [arr, [],[],[arr[i]], arrayFocus]

		while (j >= 0 && item.Value < arr[j].Value) {
			yield [arr, [arr[j], arr[j+1]],[],[arr[i]], arrayFocus]
			yield [arr, [],[arr[j], arr[j+1]],[arr[i]], arrayFocus]

			let temp = arr[j+1]
			arr[j+1] = arr[j]
			arr[j] = temp

			yield [arr, [],[arr[j], arr[j+1]],[arr[i]], arrayFocus]

			j-=1;
		}
		arr[j+1] = item

		yield [arr, [],[],[arr[i]], arrayFocus]
	}
}

export function* mergeSort(arr) {
	yield [arr]
	function* mergeSortIn(left, right) {
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
			yield [arr, [], [], [], displayArr]
			while (i < leftN && j < rightN) {
				yield [arr, [],[], [arr[k]], displayArr]
				yield [arr, [leftSubArr[i], rightSubArr[j]], [], [arr[k]], displayArr]
				if (leftSubArr[i].Value <= rightSubArr[j].Value) {
					yield [arr, [arr[k], leftSubArr[i]], [], [], displayArr]
					yield [arr, [], [arr[k], leftSubArr[i]], [], displayArr]
					//val left subarray i = temp, and swap? do inplace?
					arr.splice(k, 0, leftSubArr[i])
					let index = arr.indexOf(leftSubArr[i], k+1)
					arr.splice(index, 1)
					
					console.log(arr)
					//arr[k] = leftSubArr[i]
					yield [arr, [], [arr[k],leftSubArr[i]], [], displayArr]
					i++;
				} else {
					yield [arr, [], [arr[k],rightSubArr[j]], [], displayArr]
					//arr[k] = rightSubArr[j]
					arr.splice(k, 0, rightSubArr[j])
					let index = arr.indexOf(rightSubArr[j], k+1)
					arr.splice(index, 1)
					
					yield [arr, [], [arr[k],rightSubArr[j]], [], displayArr]
					j++;
				}
				k++;
			}
			while (i < leftN) {
				yield [arr, [],[], [arr[k]], displayArr]
				arr[k] = leftSubArr[i]
				i++;
				k++;
			}
			while (j < rightN) {
				yield [arr, [],[], [arr[k]], displayArr]
				arr[k] = rightSubArr[j]
				j++;
				k++;
			}
		}
	
	}
	yield* mergeSortIn(0, arr.length)
	yield [arr]
}

export function* heapSort(arr) {
	//Build Heap,
	yield [arr]
	for (let i = 0; i < arr.length; i++) {
		yield [arr, [], [], [arr[i]], arr]
		if (arr[i].Value > arr[parseInt((i-1)/2)].Value) {
			var j = i
			//While object j is larger than its parent, swap em up.
			while (arr[j].Value > arr[parseInt((j-1)/2)].Value) {
				console.log(j, arr[j].Value, (parseInt((j-1)/2)), arr[parseInt((j-1)/2)].Value)
				yield [arr, [arr[j], arr[parseInt((j-1)/2)]], [], [], arr]
				let temp = arr[j]
				arr[j] = arr[parseInt((j-1)/2)]
				arr[parseInt((j-1)/2)] = temp
				yield [arr, [], [arr[j], arr[parseInt((j-1)/2)]], [], arr]
				
				j = parseInt((j-1)/2)	
			}
		}
		
	}
	yield [arr, [], [], [], arr]
	//Sort --> Take 0 index element(max) and put it to end of array, and reheap
	for (let i = arr.length-1; i > 0; i--) {
		completed_arr = arr.slice(0, i+1)
		
		yield [arr, [], [arr[i], arr[0]], [], completed_arr]
		let temp = arr[i]
		arr[i] = arr[0]
		arr[0] = temp
		yield [arr, [], [arr[i], arr[0]], [], completed_arr]
		
		var j = 0
		var index = 0
		
		
		//Heap Maintaining
		while (true) {
			index = 2 * j + 1
			yield [arr, [arr[index], arr[index+1]], [], [], completed_arr]
			if (index < (i - 1) && arr[index].Value < arr[index + 1].Value) {
				index++;
			}
			yield [arr, [arr[j], arr[index]], [], [], completed_arr]
			if (index < i && arr[j].Value < arr[index].Value) {
				yield [arr, [], [arr[j], arr[index]], [], completed_arr]
				let temp = arr[j]
				arr[j] = arr[index]
				arr[index] = temp
				yield [arr, [], [arr[j], arr[index]], [], completed_arr]
			}
			
			var j = index
			if (index >= i) {
				break
			} 
			
		}
	}
	yield [arr]	
}