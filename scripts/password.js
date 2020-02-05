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

function genRangeChar(lower, upper, quantity){
	let chars = [];
	for (let index = 0; (index < quantity); index += 1) {
		chars.push(String.fromCharCode(getRandomInt(lower, upper)));
	}
	return chars;
}

function generateSymbols(quantity) {
	return genRangeChar(33, 44, quantity);
}

function generateAscii(quantity){
	return genRangeChar(33, 127, quantity);
}


function generateWordsOffline(container, quantity){
	return wordsFromList(document.getElementById(container).value.split("\n"), quantity);
}

function wordsFromList(list, quantity){
	let words = [];
	for (let index = 0; (index < quantity); index += 1) {
		words.push(list[getRandomInt(0, list.length)]);
	}
	return words;
}


async function generateWords(listSize, quantity) {
	return wordsFromList(await grabFile(listSize), quantity);
}



async function grabFile(listSize) {
	return new Promise(function (resolve, reject) {
		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", "https://fredhappyface.github.io/PWA.PasswordGen/resources/" + listSize + ".txt");
		rawFile.onload = function () {
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
	const numbers = generateNumbers(grabValue("numbers", 2));
	// Get Symbols
	const symbols = generateSymbols(grabValue("symbols", 2));
	// Get ASCII
	const ascii = generateAscii(grabValue("ascii", 0));
	// Get Words
	const wordsQ = grabValue("words", 2);
	let words = await generateWords(grabValue("wordlist", "10k"), wordsQ);
	if(grabBool("customwl", false)){
		words = generateWordsOffline("list", wordsQ);
	}

	if (grabBool("uppercase", true)) {
		for (let index = 0; index < words.length; index++) {
			words[index] = capitaliseFirstLetter(words[index]);
		}
	}


	let everything = words.concat(numbers, symbols, ascii);

	if (grabBool("shuffle", false)) {
		everything = shuffle(everything);
	}

	document.getElementById("output").value = everything.join("")
}


function uploadWL() { // eslint-disable-line no-unused-vars
	fileData = upload(document.getElementById("files").files, ["list"]);
}
