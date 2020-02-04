//jQuery.ajaxSetup({async:false});
/*jshint esversion: 6 */

// returns a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
	let rand = window.crypto.getRandomValues(new Uint8Array(1)) / 256
	return Math.floor(rand * (max - min)) + min;
}

function shuffle(array) {
	for (let index = array.length - 1; index > 0; index--) {
		const swap = getRandomInt(0, array.length);
		[array[index], array[swap]] = [array[swap], array[index]];
	}
	return array;
}
// return a string with the fist letter capitalised
function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


function generateNumbers(quantity) {
	numbers = [];
	for (let index = 0; (index < quantity); index += 1) {
		numbers.push(getRandomInt(0, 10).toString());
	}
	return numbers;
}

function generateSymbols(quantity) {
	let symbols = [];
	for (let index = 0; (index < quantity); index += 1) {
		symbols.push(String.fromCharCode(getRandomInt(33, 44)));
	}
	return symbols;
}


async function generateWords(listSize, quantity) {
	let words = [];
	lines = await grabFile(listSize);
	for (let index = 0; (index < quantity); index += 1) {
		words.push(lines[getRandomInt(0, lines.length)]);
	}
	return words;
}

async function grabFile(listSize) {
	return new Promise(function (resolve, reject) {
		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", "https://fredhappyface.github.io/PWA.PasswordGen/resources/" + listSize + ".txt");
		rawFile.onload = function () {
			console.log("GRAB FILE")
			resolve(rawFile.responseText.split("\n"))
		}
		rawFile.send(null)
	});
}

function grabValue(elementId, def) {
	let value = def;
	try {
		value = document.getElementById(elementId).value.replace(/\s/g, "");
	}
	catch{
	}
	return value;
}

function grabBool(elementId, def) {
	let bool = def;
	try {
		bool = document.getElementById(elementId).checked;
	}
	catch{
	}
	return bool;
}

async function start() {
	// Get Numbers
	let numbers = generateNumbers(grabValue("numbers", 2));
	// Get Symbols
	let symbols = generateSymbols(grabValue("symbols", 2));
	// Get Words
	let words = await generateWords("10k", grabValue("words", 2));

	if (grabBool("uppercase", true)) {
		for (let index = 0; index < words.length; index++) {
			words[index] = capitaliseFirstLetter(words[index]);
		}
	}


	let everything = words.concat(numbers, symbols);

	if (grabBool("shuffle", false)) {
		everything = shuffle(everything);
	}

	document.getElementById("output").value = everything.join("")
}
