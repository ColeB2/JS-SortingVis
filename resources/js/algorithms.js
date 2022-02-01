

export function* bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			yield [arr, [j, j+1],[] ,[]]
			if (arr[j] > arr[j+1]) {
				yield [arr, [], [j, j+1], []];
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, [], [j, j+1], []];
			}
		}      		
	}
}

export function* selectionSort(arr) {
	for (let i = arr.length-1; i >= 0; i--) {
		var maxI = 0
		yield [arr, [maxI],[],[]]
		
		for (let j = 1; j <= i; j++) {
			yield [arr, [maxI, j],[],[]]
			
			if (arr[j] > arr[maxI]) {
				var maxI = j
				yield [arr, [maxI],[],[]]
			}
		}
		yield [arr, [],[i, maxI],[]]
		
		let temp = arr[i]
		arr[i] = arr[maxI]
		arr[maxI] = temp
		
		yield [arr, [],[i, maxI],[]]
	}
}

export function* insertionSort(arr) {
	for (let i = 1; i <= arr.length; i++) {
		var item = arr[i]
		var j = i - 1;
		yield [arr, [],[],[i]]
		
		while (j >= 0 && item < arr[j]) {
			yield [arr, [j, j+1],[],[i]]
			yield [arr, [],[j, j+1],[i]]
			
			let temp = arr[j+1]
			arr[j+1] = arr[j]
			arr[j] = temp
			
			yield [arr, [],[j, j+1],[i]]
			
			j-=1;
		}
		arr[j+1] = item
		yield [arr, [],[],[i]]
	}
}