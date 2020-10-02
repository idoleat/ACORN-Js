/**
 * @file The k-th orderAdditive Congruential Random Number (ACORN) generator. More details at http://acorn.wikramaratna.org/concept.html
 */

'use strict';

/**
 * The k-th orderAdditive Congruential Random Number (ACORN) generator.
 */
function ACORN() {
    this.precision_multiplier = 1;
    this.K = 10000;
    this.N = 1;
    //this.M = Math.pow(2, 30*precision_multiplier);
    this.M = 1073741824*this.precision_multiplier;
}

const IsInputValid = function(seed, length) {
    if(Number.isNaN(seed) || seed%2 === 0 ) {
        console.log('Invalid seed. Must be odd.');
        return false;
    }
    if(length < 1){
        console.log('Invalid length. Must greater than 1.');
        return false;
    }

    return true;
}

/**
 * Modify precision and order. Default ones are 1 and 10000.
 * @param  {[type]} precision_multiplier Multipler to multiply the M value, which is 2^30 by default.
 * @param  {[type]} order                Order.
 */
ACORN.prototype.setProperty = function(precision_multiplier, order) {
    this.precision_multiplier = precision_multiplier;
    this.K = order;
};
/**
 * Generate an array from seed with specified length filled with number in [0,1). To avoid small first element, recommand to use the seed greater than 10^5.
 * @param  {number} seed   seed
 * @param  {integer} length Length of the returned array
 * @return {Array}        Generated numbers.
 */
ACORN.prototype.random = function(seed, length) {
    if(!IsInputValid(seed,length)) return undefined;
    seed = seed % this.M;
    this.N = length+1;

    let Y1 = [];
    let Y2 = [];
    for(let i=0; i<this.N; i++){
        Y1.push(seed); // [flag] Questionable
    }

    for(let i=0; i<=this.K; i++){
        Y2 = [];
        Y2.push(seed); // [flag] Questionable
        for(let j=1; j<this.N; j++){
            Y2[j] = (Y1[j] + Y2[j-1]) % this.M; // could use if as the alternative of mod
            Y1[j] = Y2[j];
        }
    }

    Y2.shift(); // remove the first element, which is seed, to fit the length.
    //Y2.forEach( (element, index) => { this[index] = element/this.M } , Y2);
    for(let i=0; i<length; i++){
        Y2[i] = Y2[i]/this;
    }
    return Y2;
}

module.exports = ACORN
