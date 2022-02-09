

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
				yield [arr, [arr[i], arr[j]], [], [arr[k]], displayArr]
				if (leftSubArr[i].Value <= rightSubArr[j].Value) {
					yield [arr, [], [arr[k],arr[i]], [], displayArr]
					arr[k] = leftSubArr[i]
					yield [arr, [], [arr[k],arr[i]], [], displayArr]
					i++;
				} else {
					yield [arr, [], [arr[k],arr[j]], [], displayArr]
					arr[k] = rightSubArr[j]
					yield [arr, [], [arr[k],arr[j]], [], displayArr]
					j++;
				}
				k++;
			}
			while (i < leftN && j < rightN) {
				if (leftSubArr[i].Value <= rightSubArr[j].Value) {
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