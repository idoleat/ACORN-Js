/**
 * @file The k-th order Additive Congruential Random Number (ACORN) generator. More details at http://acorn.wikramaratna.org/concept.html
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
    this.seed = undefined;
    this.auto_correct_seed = true;

    // constructor
    function ACORN(precision_multiplier, order, auto_correct_seed) {
        this.precision_multiplier = precision_multiplier;
        this.K = order;
        this.auto_correct_seed = auto_correct_seed;
    }
}

ACORN.prototype.IsInputValid = function(seed, length) {
    if(Number.isNaN(seed)) {
        console.log('Invalid seed. Must be a number.');
        return false;
    }
    if(seed%2 === 0 ) {
        if(this.auto_correct_seed) this.seed -= 1;
        else {
            console.log('Invalid seed. Must be odd.');
            return false;
        }
    }
    if(length < 1){
        console.log('Invalid length. Must greater than 1.');
        return false;
    }
    if(!Number.isInteger(length)){
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
 * Generate an array from seed with specified length filled with number in [0,1). To avoid small first element, recommand to use the seed greater than 10^5.
 * @param  {number} seed    Seed. Becareful that using the seed greater than Number.MAX_SAFE_INT will make the seed become zero. BigInt not supported yet.
 * @param  {integer} length Length of the returned array
 * @return {Array}          Generated numbers.
 */
ACORN.prototype.random = function(seed, length) {
    seed = seed % this.M;
    this.seed = seed;
    if(!this.IsInputValid(this.seed,length)) return undefined;
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
    for(let i=0; i<length; i++){
        Y2[i] = Y2[i]/this.M;
    }
    return Y2;
}

module.exports = ACORN
