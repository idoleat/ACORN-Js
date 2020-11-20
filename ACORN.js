/**
 * @file The k-th order Additive Congruential Random Number (ACORN) generator. More details at http://acorn.wikramaratna.org/concept.html
 */

/*
TODO k is normally below 20
TODO initial values could be arbitary numbers, [0,M)
TODO seed is [1,M)
small k, large M could cause bad results?
TODO uesless constructor
TODO if seed isn't odd
 */

'use strict';
/**
 * The k-th order Additive Congruential Random Number (ACORN) generator.
 */
function ACORN() {
	// comments needed.
	this.precision_multiplier = 1;
	this.K = 10000;
	this.N = 1;
	this.M = Math.pow(2, 30*this.precision_multiplier);
	this.seed = undefined;
	this.auto_correct_seed = true;
	this.initial_value = undefined;
}

ACORN.prototype.isInputValid = function(seed, length) {
	if (Number.isNaN(seed)) {
		console.log('Invalid seed. Must be a number.');
		return false;
	}
	if (seed === 0){
		console.log('Invalid seed. Must > 0.');
		return false;
	}
	if (seed % 2 === 0) {
		// [flag] this may cause two seed with same result
		if (this.auto_correct_seed) this.seed -= 1;
		else {
			console.log('Invalid seed. Must be odd.');
			return false;
		}
	}
	if (length < 1) {
		console.log('Invalid length. Must >= 1.');
		return false;
	}
	if (!Number.isInteger(length)) {
		console.log('Invalid length. Must be integer.');
		return false;
	}

	return true;
}

/**
 * Modify precision, order and option to auto correct seed.
 * @param  {integer} precision_multiplier Multipler to multiply the M value, which is 2^30 by default. Default value is 1.
 * @param  {integer} order                Order. Default is 10000.
 * @param  {boolean} auto_correct_seed    An option to auto correct even seed. Default is true.
 */
ACORN.prototype.setProperty = function(precision_multiplier, order, auto_correct_seed) {
	this.precision_multiplier = precision_multiplier;
	this.K = order;
	this.auto_correct_seed = auto_correct_seed;
};
/**
 * [description]
 * @param  {array} initial_value [description]
 */
ACORN.prototype.setInitialValue = function(initial_value){
	this.K = initial_value.length;
	console.log('[acornJs] set initial_value length: ' + this.K);
	this.initial_value = initial_value;
}
/**
 * Generate an array from seed with specified length filled with number in [0,1). To avoid small first element, recommand to use the seed greater than 10^5.
 * @param  {number} seed    Seed. Becareful that using the seed greater than Number.MAX_SAFE_INT will make the seed become zero. BigInt not supported yet.
 * @param  {integer} length Length of the returned array
 * @return {Array}          Generated numbers.
 */
ACORN.prototype.random = function(seed, length) {
	this.seed = seed % this.M; // % in Js is mod or remainder? 100%3 = ? -100%3 = ?
	if (!this.isInputValid(this.seed, length)) return undefined;
	this.N = length + 1;

	let Y1 = [];
	let Y2 = [];
	for (let i = 0; i < this.N; i++) {
		Y1.push(this.seed); // [flag] Questionable
	}

	for (let i = 0; i < this.K; i++) {
		Y2 = [];
		Y2.push(this.seed); // [flag] Questionable
		if(this.initial_value != undefined) Y2[0] += this.initial_value[i];
		for (let j = 1; j < this.N; j++) {
			Y2[j] = (Y1[j] + Y2[j - 1]) % this.M; // could use if as the alternative of mod
			Y1[j] = Y2[j];
		}
	}

	Y2.shift(); // remove the first element, which is seed, to fit the length.
	for (let i = 0; i < length; i++) {
		Y2[i] = Y2[i] / this.M;
	}
	return Y2;
}
/*
const c = require('crypto');
const hash = require('crypto').createHash;
const Buf = require('../../../buffer');
let ac = new ACORN();
let abc = c.randomBytes(32);
let bcd = Buf.concat([abc,Buf.from([1,2,3])]);
//console.log(hash('sha256').update(abc).digest().length);
//console.log(hash('sha256').update(bcd).digest().length);
console.log(ac.random(Buf.decodeUInt32BE(hash('sha256').update(abc).digest()), 1));
console.log(ac.random(Buf.decodeUInt32BE(hash('sha256').update(abc).digest()), 10));
console.log(ac.random(Buf.decodeUInt32BE(hash('sha256').update(bcd).digest()), 1));
console.log(ac.random(Buf.decodeUInt32BE(hash('sha256').update(bcd).digest()), 10));*/

module.exports = ACORN;
