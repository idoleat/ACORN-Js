# ACORN-Js
A JavaScript implementation of ACORN, a k-th order Additive Congruential Random Number (ACORN) generator. More details at http://acorn.wikramaratna.org/concept.html

It's only a nodejs module now. More ToDos below.

## Usage
### `ACORN.prototype.random = function(seed, length)`
Generate an array from seed with specified length filled with number in [0,1). To avoid small first element, I recommand to use the seed greater than 10^5.
* `seed`: Seed for generator. Becareful that using the seed greater than Number.MAX_SAFE_INT will make the seed become zero. BigInt not supported yet.
* `length`: Length of the returned array.
* Returns an array of generated numbers.

### `ACORN.prototype.setProperty = function(precision_multiplier, order, auto_correct_seed)`
Modify precision, order and option to auto correct seed. For more info about these propertiees please check the link at the begin.
* `precision_multiplier`: Multipler to multiply the M value, which is 2^30 by default. Default value is 1.
* `order`: Order. Default is 10000.
* `auto_correct_seed`: An boolean option to auto correct even seed. Default is true.

## ToDo
* A script version for browsers.
* Upload to a CDN for easy include in browsers.
* Make it to npm.
* Unit test for eaier futher development.
    * Monte Carlo value for Pi
    * Arithmetic mean value of data bytes
    * Serial correlation coefficient
* Demo site.
* Visualized result.
