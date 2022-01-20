

export function* bubbleSort(arr) {
	algoRunning = true
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
	algoRunning = false
}