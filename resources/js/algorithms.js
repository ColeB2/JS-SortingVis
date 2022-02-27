

export function* bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		let swap = false;
		for (let j = 0; j < i; j++) {
			let completed_arr = arr.slice(0, i+1)
			yield [arr, [arr[j], arr[j+1]],[] ,[], completed_arr];
			if (arr[j].Value > arr[j+1].Value) {
				swap = true
				yield [arr, [], [arr[j], arr[j+1]], [], completed_arr];
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, [], [arr[j], arr[j+1]], [], completed_arr];
			}
		}
		if (swap === false) {
			break
		}
	}
	yield [arr]
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
	yield [arr]
}

export function* insertionSort(arr) {
	yield [arr, [],[],[0]]
	for (let i = 1; i < arr.length; i++) {
		let arrayFocus = arr.slice(0,i+1)
		var item = arr[i]
		var j = i - 1;
		yield [arr, [],[],[arr[i]], arrayFocus]

		while (j >= 0 && item.Value < arr[j].Value) {
			//Old Color set up, swaps DOWN continously
			//yield [arr, [arr[j], arr[j+1]],[],[arr[i]], arrayFocus]
			//yield [arr, [],[arr[j], arr[j+1]],[arr[i]], arrayFocus]

			//let temp = arr[j+1]
			//arr[j+1] = arr[j]
			//arr[j] = temp

			//yield [arr, [],[arr[j], arr[j+1]],[arr[i]], arrayFocus]
			
			yield [arr, [arr[j], item], [], arr.slice(j+1, i), arrayFocus]

			j-=1;
		}
		let copyArr = arr.slice(j+1, i)
		yield [arr, [], [arr[j+1], item], copyArr, arrayFocus]
		
		arr.splice(i,1)
		
		console.log(arr)
		arr.splice(j+1, 0, item)
		console.log(arr)
					
		//arr[j+1] = item

		yield [arr, [],[arr[j+1], item], copyArr, arrayFocus]
	}
	yield [arr]
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
		yield [arr, [arr[parseInt((i-1)/2)]], [], [arr[i]], arr]
		if (arr[i].Value > arr[parseInt((i-1)/2)].Value) {
			var j = i
			//While object j is larger than its parent, swap em up.
			yield [arr, [arr[i], arr[parseInt((i-1)/2)]], [], [], arr]
			while (arr[j].Value > arr[parseInt((j-1)/2)].Value) {
				yield [arr, [], [arr[j], arr[parseInt((j-1)/2)]], [], arr]
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
		var completed_arr = arr.slice(0, i+1)
		
		
		yield [arr, [], [arr[i], arr[0]], [], completed_arr]
		let temp = arr[i]
		arr[i] = arr[0]
		arr[0] = temp
		var completed_arr = arr.slice(0, i)
		yield [arr, [], [arr[i], arr[0]], [], completed_arr]
		
		var j = 0
		var index = 0
		
		
		//Heap Maintaining
		while (true) {
			index = 2 * j + 1
			
			let compare_arr = []
			completed_arr.includes(arr[index])? compare_arr.push(arr[index]) : null
			completed_arr.includes(arr[index+1])? compare_arr.push(arr[index+1]) : null
			
			yield [arr, compare_arr, [], [arr[j]], completed_arr]
			if (index < (i - 1) && arr[index].Value < arr[index + 1].Value) {
				index++;
			}
			
			let compare_arr2 = []
			completed_arr.includes(arr[index])? compare_arr2.push(arr[index]) : null
			completed_arr.includes(arr[j])? compare_arr2.push(arr[j]) : null
			
			yield [arr, compare_arr2, [], [], completed_arr]
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


export function* shellSort2(arr) {
	let n = arr.length
	
	let gap = n >> 1
	
	while (gap > 0) {
		
		for (let i = 0; i < gap; i++) {
			let displayArr = []
			for (let index = i; index < n; index += gap) {
				displayArr.push(arr[index])	
			} 
			for (let j = i+gap; j < n; j += gap) {
				let current_value = arr[j]
				let position = j
				
				let swap = false
				
				yield [arr, [arr[position-gap], arr[j]], [], [], displayArr]
				while (position >= gap && arr[position-gap].Value > current_value.Value) {
					yield [arr, [],[arr[position-gap], arr[position]],[],displayArr]
					let temp = arr[position-gap]
					arr[position-gap] = arr[position]
					arr[position] = temp
					yield [arr, [],[arr[position-gap], arr[position]],[], displayArr]
					
					position -= gap
					yield [arr, [arr[position-gap], arr[position]],[],[], displayArr]
					
				}
				
			}
		}
		gap = gap >> 1
	}
	yield [arr]
}

export function* shellSort(arr) {
	//Sedgewicks 1986 gaps
	let n = arr.length
	
	let sedgewickGap = [41,19,5,1]
	let gap = 0
	//Code that skips gaps bigger than the array.
	for (let gapI = 0; gap < sedgewickGap.length-1; gapI++) {
		if (sedgewickGap[gapI] < n) {
			gap = gapI
			break
		}
	}

	while (gap <= sedgewickGap.length) {
		let gapValue = sedgewickGap[gap]
		
		for (let i = 0; i < gapValue; i++) {
			let displayArr = []
			for (let index = i; index < n; index += gapValue) {
				displayArr.push(arr[index])	
			} 
			for (let j = i+gapValue; j < n; j += gapValue) {
				let current_value = arr[j]
				let position = j
				
				let swap = false
				
				yield [arr, [arr[position-gapValue], arr[j]], [], [], displayArr]
				while (position >= gapValue && arr[position-gapValue].Value > current_value.Value) {
					yield [arr, [],[arr[position-gapValue], arr[position]],[],displayArr]
					let temp = arr[position-gapValue]
					arr[position-gapValue] = arr[position]
					arr[position] = temp
					yield [arr, [],[arr[position-gapValue], arr[position]],[], displayArr]
					
					position -= gapValue
					yield [arr, [arr[position-gapValue], arr[position]],[],[], displayArr]
					
				}
				
			}
		}
		gap++;
	}
	yield [arr]
}

function* quickSortHelper(arr, left, right) {
	let displayArr = arr.slice(left, right+1)
	if (left < right) {
		let i = left - 1
		let pivot = arr[right] // last element as pivot
		yield [arr, [],[], [pivot, arr[i]], displayArr]
		for (let j = left; j < right; j++) {
			yield [arr, [arr[j], pivot], [], [arr[i+1]], displayArr]
			if (arr[j].Value < pivot.Value) {
				i++;
				
				if (i == j) {
					continue
				}
				yield [arr, [],[arr[i], arr[j]],[],displayArr]
				let temp = arr[i]
				arr[i] = arr[j]
				arr[j] = temp
				yield [arr, [],[arr[i], arr[j]],[],displayArr]
			}
		}
		
		if (i+1 != right) {
			yield [arr, [],[arr[i+1], arr[right]],[],displayArr]
			let temp = arr[i+1]
			arr[i+1] = arr[right]
			arr[right] = temp
			yield [arr, [],[arr[i+1], arr[right]],[],displayArr]
		}
			
		let pivot_index = i + 1
		
		yield* quickSortHelper(arr, left, pivot_index-1)
		yield* quickSortHelper(arr, pivot_index+1, right)
		
	}	
}

export function* quickSort(arr) {
	
	let n = arr.length
	yield [arr, [],[],[], arr]
	yield* quickSortHelper(arr, 0, n-1)
	yield [arr]
}