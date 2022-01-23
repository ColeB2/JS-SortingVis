

export function* bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			yield [arr, "compare", [j, j+1]]
			if (arr[j] > arr[j+1]) {
				yield [arr, "swap", [j, j+1]];
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, "swap", [j, j+1]];
			}
		}      		
	}
}

export function* selectionSort(arr) {
	for (let i = arr.length-1; i >= 0; i--) {
		let maxI = 0
		yield [arr, "compare", [maxI]]
		
		for (let j = 1; j <= i; j++) {
			yield [arr, "compare", [maxI, j]]
			
			if (arr[j] > arr[maxI]) {
				let maxI = j
			}
		}
		yield [arr, "swap", [i, maxI]]
		
		let temp = arr[i]
		arr[i] = arr[maxI]
		arr[maxI] = temp
		
		yield [arr, "swap", [i, maxI]]
	}
}