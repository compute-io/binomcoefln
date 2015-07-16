'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// FUNCTIONS //

var BINOMCOEFLN = require( './number.js' );


// BINOMCOEFLN FUNCTION //

/**
* FUNCTION: binomcoefln( out, n, k )
*	Computes the natural logarithm of the binomial coefficient for each typed-array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} n - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} k - either an array of equal length or a scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function  binomcoefln( out, n, k ) {
	var len = n.length,
		i;

	if ( isMatrixLike( k ) ) {
			throw new Error( 'binomcoefln()::invalid input argument. `k` has to be an array or scalar.' );
	} else if ( isTypedArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( ' binomcoefln()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
				out[ i ] = BINOMCOEFLN( n[ i ], k[ i ] );
		}
	} else if ( isArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( ' binomcoefln()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof k[ i ] === 'number' ) {
				out[ i ] = BINOMCOEFLN( n[ i ], k[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if (  typeof k === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = BINOMCOEFLN( n[ i ], k );
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION  binomcoefln()


// EXPORTS //

module.exports = binomcoefln;
