'use strict';

// MODULES //

var betaln = require( 'compute-betaln/lib/number.js' ),
	isInteger = require( 'validate.io-integer' );


// FUNCTIONS //

var abs = Math.abs,
	ln = Math.log;


// BINOMCOEFLN //

/**
* FUNCTION: binomcoefln( n, k )
*	Computes the natural logarithm of the binomial coefficient of two numeric values.
*
* @param {Number} n - input value
* @param {Number} k - second input value
* @returns {Number} function value
*/

function binomcoefln( n , k  ) {
	if ( isInteger( n ) && isInteger( k ) ) {
		if ( k < 0 || n < k ) {
			return Number.NEGATIVE_INFINITY;
		} else if ( k === 0 ) {
			return 0;
		} else if ( k === 1 ) {
			return ln( abs( n ) );
		} else {
			if ( n - k < 2 ) {
				return binomcoefln( n, n - k );
			} else {
				return - ln( n + 1 ) - betaln( n - k + 1, k + 1 );
			}
		}
	} else {
		return - ln( n + 1 ) - betaln( n - k + 1, k + 1 );
	}
} // end FUNCTION binomcoefln()


// EXPORTS //

module.exports = binomcoefln;
