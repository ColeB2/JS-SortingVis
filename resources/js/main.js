

//Delay Range Slider
function gameDelay() {
	delayOutput.innerHTML = this.value;
	mainGame.delay = this.value;	
}

const delayRange = document.getElementById('delayRange');
const delayOutput = document.getElementById('delayValue');
delayOutput.innerHTML = delayRange.value;
delayRange.addEventListener('input', gameDelay, false)