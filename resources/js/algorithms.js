

export function* bubbleSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		let completed_arr = arr.slice(0,i+1)
		for (let j = 0; j < i; j++) {
			yield [arr, [j, j+1],[] ,[], completed_arr]
			if (arr[j] > arr[j+1]) {
				yield [arr, [], [j, j+1], [], completed_arr];
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				yield [arr, [], [j, j+1], [], completed_arr];
			}
		}      		
	}
}

export function* selectionSort(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		let completed_arr = arr.slice(0,i+1)
		var maxI = 0
		yield [arr, [maxI],[],[], completed_arr]
		
		for (let j = 1; j <= i; j++) {
			yield [arr, [maxI, j],[],[], completed_arr]
			
			if (arr[j] > arr[maxI]) {
				var maxI = j
				yield [arr, [maxI],[],[], completed_arr]
			}
		}
		yield [arr, [],[i, maxI],[], completed_arr]
		
		let temp = arr[i]
		arr[i] = arr[maxI]
		arr[maxI] = temp
		
		yield [arr, [],[i, maxI],[], completed_arr]
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

export function* merge(fullArr, arr, left, middle, right) {
	console.log("inside merge")
	
	var subArr1 = middle - left + 1
	var subArr2 = right - middle
	
	var LeftArr = new Array(subArr1)
	var RightArr = new Array(subArr2)
	
	//populate sub arrays
	for (let i = 0; i < subArr1; i++) {
		LeftArr[i] = arr[left+i]
	}
	for (let i = 0; i < right; i++) {
		RightArr[i] = arr[middle + 1 + i] 
	}
	
	
	//Initial index left, right subarrays  and merged sub array
	var i = 0
	var j = 0
	var k = left
	//-->Combine l and r sub array to replace arr for display purposes
	var displayArr = []
	displayArr.concat(LeftArr, RightArr)
	
	yield [displayArr, [],[], [], fullArr]
	console.log("Display Array")
	console.log(displayArr)
	while (i < subArr1 && j < subArr2) {
		yield [displayArr, [i, j],[], [], fullArr]
		if (LeftArr[i] <= RightArr[j]) {
			yield [displayArr, [],[i, k], [], fullArr]
			arr[k] = LeftArr[i]
			yield [displayArr, [],[i, k], [], fullArr]
			i++;
			
		} else {
			yield [displayArr, [],[j, k], [], fullArr]
			arr[k] = RightArr[j]
			yield [displayArr, [],[j, k], [], fullArr]
			j++;
		}
		k++;
	}
	
	//Copy remaining elements from i then j-
	while (i < subArr1) {
		yield [displayArr, [],[i, k], [], fullArr]
		arr[k] = LeftArr(i)
		yield [displayArr, [],[i, k], [], fullArr]
		i++
		k++
	}
	while (j < subArr2) {
		yield [displayArr, [],[j, k], [], fullArr]
		arr[k] = RightArr(j)
		yield [displayArr, [],[j, k], [], fullArr]
		j++
		k++
	}
	yield [displayArr, [],[], [], fullArr]
}

export function* mergeSort1(fullArr, arr=null, left=0, right=null) {
	if (arr === null) {
		arr = fullArr
	}
	if (right === null) {
		right = arr.length
	}
	
	//find middle
	yield [fullArr, [],[],[],[]]
	if (left >= right) {
		return
	} else {
		var middle = left + parseInt((right-left)/2)
		yield * mergeSort(fullArr, arr, middle)
		yield * mergeSort(fullArr, arr, middle + 1, right)
		yield * merge(fullArr, arr, left, middle, right)
	} 
	//divide in half repeatdy until 1 element each
	//merge elements together
	yield [fullArr, [],[j, k], []]
}

export function* mergeSort(arr) {
	console.log("Inside mergeSort")
	console.log(arr)
	yield [arr]
	function* mergeSortIn(left, right) {
		if ((right-left) > 1) {
			var middle = left + parseInt((right - left) / 2)
			var middle = Math.ceil(left + right)/2
			
			console.log("yield start vals (1st call, l, r, m)")
			console.log(left, right, middle)
			yield * mergeSortIn(left, middle)
			console.log("right:  left,right, middle vals")
			console.log(left, right, middle)
			//middle vs middle +1 --> Works with middle, but not as expected
			//both look @ (1 2 3 4 5) --> 1,2 then  4 5. Need to look @ 3 4
			//testing slice values change middle +1? try with both merge call on mid+1
			yield * mergeSortIn((middle), right)
			
			console.log("merging --> l, m , r values (used in slicing)")
			console.log(left, middle, right)
			var leftSubArr = arr.slice(left, middle)
			var leftN = leftSubArr.length
			var rightSubArr = arr.slice(middle, right)
			var rightN = rightSubArr.length
			
			var i = 0
			var j = 0
			var k = left
			console.log("left right sub array and i j k")
			console.log(leftSubArr, leftN, rightSubArr, rightN, i, j, k)
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
			console.log("after merge")
			console.log(arr)
		}
	
	}
	console.log("Calling mergeSortIn")
	yield* mergeSortIn(0, arr.length)
	console.log(arr)
	yield [arr]
	
}