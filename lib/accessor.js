'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isObject = require( 'validate.io-object' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// FUNCTIONS //

var BINOMCOEFLN = require( './number.js' );


// BINOMCOEFLN FUNCTION //


/**
* FUNCTION: binomcoefln( out, n, k, accessor )
*	Computes the natural logarithm of the binomial coefficient for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} n - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} k - either an array of equal length or a scalar
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function binomcoefln( out, n, k, clbk ) {
	var len = n.length,
		i,
		nVal, kVal;

	if ( isMatrixLike( k ) ) {
			throw new Error( 'binomcoefln()::invalid input argument. `k` has to be an array or scalar.' );
	} else if ( isTypedArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( 'binomcoefln()::invalid input argument. Input arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			nVal = clbk( n[ i ], i, 0 );
			if ( typeof nVal === 'number' ) {
				out[ i ] = BINOMCOEFLN( nVal, k[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else if ( isArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( 'binomcoefln()::invalid input argument. Inputs arrays must have the same length.' );
		}
		if ( !isObject( k[ 0 ] ) ) {
			// Guess that k is a primitive array -> callback does not have to be applied
			for ( i = 0; i < len; i++ ) {
				nVal = clbk( n[ i ], i, 0 );
				if ( typeof k[ i ] === 'number' && typeof nVal === 'number' ) {
					out[ i ] = BINOMCOEFLN( nVal, k[ i ] );
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			// k is an object array, too -> callback is applied
			for ( i = 0; i < len; i++ ) {
				nVal = clbk( n[ i ], i, 0 );
				kVal = clbk( k[ i ], i, 1 );
				if ( typeof nVal === 'number' && typeof kVal  === 'number' ) {
					out[ i ] = BINOMCOEFLN( nVal, kVal );
				} else {
					out[ i ] = NaN;
				}
			}
		}
	} else {
		if ( typeof k === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				nVal = clbk( n[ i ], i );
				if ( typeof nVal === 'number' ) {
					out[ i ] = BINOMCOEFLN( nVal, k );
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION binomcoefln()


// EXPORTS //

module.exports = binomcoefln;
