import * as cons from './constants.js'

const ARRAY_LENGTH = 20
Array.from(Array(ARRAY_LENGTH)).map(x=>Math.random())


const TEST_ARRAY = [100,25,95,15,48,16,20,17,55,69,72,83,14,28,30,22,78,69,38,45,55]



TEST_ARRAY.map(function(element, index) {
	cons.CTX.fillRect(index*BAR_WIDTH, 0, BAR_WIDTH, element)
});