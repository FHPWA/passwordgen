// jQuery.ajaxSetup({async:false});
/* jshint esversion: 6 */

/**
 * return a string with the fist letter capitalized
 *
 * @param {string} string
 * @return {string} string with the fist letter capitalized
 */
function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Get a list of random numbers between 0 and 9
 *
 * @param {int} quantity
 * @return {string[]} list of random ints between 0-9
 */
function generateNumbers(quantity) {
	numbers = [];
	for (let index = 0; (index < quantity); index += 1) {
		numbers.push(getRandomInt(0, 10).toString());
	}
	return numbers;
}

/**
 * Get a list of random chars in a range lower to upper
 *
 * @param {int} lower
 * @param {int} upper
 * @param {int} quantity
 * @return {string[]} list of random chars in the range specified
 */
function genRangeChar(lower, upper, quantity) {
	const chars = [];
	for (let index = 0; (index < quantity); index += 1) {
		chars.push(String.fromCharCode(getRandomInt(lower, upper)));
	}
	return chars;
}

/**
 * Get a list of random symbols
 *
 * @param {int} quantity
 * @return {string[]} list of random symbols
 */
function generateSymbols(quantity) {
	return genRangeChar(33, 44, quantity);
}

/**
 * Get a list of random ascii chars
 *
 * @param {int} quantity
 * @return {string[]} list of random ascii chars
 */
function generateAscii(quantity) {
	return genRangeChar(33, 127, quantity);
}

/**
 * Get a list of random words from the custom words-list dump
 *
 * @param {string} container elementId of the text field containing words
 * @param {int} quantity
 * @return {string[]} list of random words
 */
function generateWordsOffline(container, quantity) {
	return wordsFromList(
		document.getElementById(container).value.split("\n"), quantity);
}

/**
 * Get a list of random words from a list of words
 *
 * @param {string[]} list a list of words to choose from
 * @param {int} quantity
 * @return {string[]} list of random words
 */
function wordsFromList(list, quantity) {
	const words = [];
	for (let index = 0; (index < quantity); index += 1) {
		words.push(list[getRandomInt(0, list.length)]);
	}
	return words;
}

/**
 * Get a list of random words from an online words-list
 *
 * @param {string} listSize an online file containing words
 * @param {int} quantity
 * @return {string[]} list of random words
 */
async function generateWords(listSize, quantity) {
	return wordsFromList(await grabFile(listSize), quantity);
}

/**
 * Get a .txt file from https://fhpwa.github.io/passwordgen/resources/
 *
 * @param {string} listSize
 * @return {promise} file
 */
async function grabFile(listSize) {
	return new Promise(function(resolve, _reject) {
		const rawFile = new XMLHttpRequest();
		rawFile.open("GET", "resources/" + listSize + ".txt");
		rawFile.onload = function() {
			resolve(rawFile.responseText.split("\n"));
		};
		rawFile.send(null);
	});
}

/**
 * Try and get the value for an element. If it fails, return the default value
 *
 * @param {string} elementId
 * @param {const} def
 * @return {var} value
 */
function grabValue(elementId, def) {
	let value = def;
	try {
		value = document.getElementById(elementId).value.replace(/\s/g, "");
	} catch (error) {
	}
	return value;
}

/**
 * Try and get the boolean value for an element. If it fails, return the default
 * value
 *
 * @param {string} elementId
 * @param {boolean} def
 * @return {boolean} boolean value
 */
function grabBool(elementId, def) {
	let bool = def;
	try {
		bool = document.getElementById(elementId).checked;
	} catch (error) {
	}
	return bool;
}

/**
 * Calculate the shannon entropy * length for a given password
 *
 * @param {string} password
 * @return {double} strength
 */
function calcPasswordStrength(password) {
	const frequencies = password.split("")
		.reduce(function(carry, current) {
			carry[current] = (carry[current] || 0) + 1;
			return carry;
		}, {});

	const entropy = Object.keys(frequencies)
		.reduce(function(carry, current) {
			const p = frequencies[current] / password.length;
			carry = carry - (Math.log(p) / Math.log(2) * p);
			return carry;
		}, 0);

	return entropy * password.length;
}

/**
 * Entry point to generate a password
 */
async function start() { // eslint-disable-line no-unused-vars
	// Get Numbers
	const numbers = generateNumbers(grabValue("numbers", 2));
	// Get Symbols
	const symbols = generateSymbols(grabValue("symbols", 2));
	// Get ASCII
	const ascii = generateAscii(grabValue("ascii", 0));
	// Get Words
	const wordsQ = grabValue("words", 2);
	let words = await generateWords(grabValue("wordlist", "10k"), wordsQ);
	if (grabBool("customwl", false)) {
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

	const password = everything.join("");

	document.getElementById("output").value = password;

	document.getElementById("password-strength").value =
	calcPasswordStrength(password);
}

/**
 * 'upload' a custom words-list
 */
function uploadWL() { // eslint-disable-line no-unused-vars
	fileData = upload(document.getElementById("files").files, ["list"]);
}

/**
 * Entry point to check a password
 */
function check() { // eslint-disable-line no-unused-vars
	document.getElementById("password-strength").value =
	calcPasswordStrength(grabValue("input", ""));
}
