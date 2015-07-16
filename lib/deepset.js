'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,

	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),

	BINOMCOEFLN = require( './number.js' );


// BINOMCOEFLN FUNCTION //


/**
* FUNCTION: binomcoefln( arr, k, path[, sep] )
*	Computes the natural logarithm of the binomial coefficient for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} k - either an array of equal length or a scalar
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function binomcoefln( n, k, path, sep ) {
	var len = n.length,
		opts = {},
		dget,
		dset,
		v, i;

	if ( arguments.length > 3 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );

		if ( isMatrixLike( k ) ) {
				throw new Error( 'binomcoefln()::invalid input argument. `k` has to be an array or scalar.' );
		} else if ( isTypedArrayLike( k ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( n[ i ] );
				if ( typeof v === 'number' ) {
					dset( n[ i ], BINOMCOEFLN( v, k[ i ] ) );
				} else {
					dset( n[ i ], NaN );
				}
			}
		} else if ( isArrayLike( k ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( n[ i ] );
				if ( typeof v === 'number' && typeof k[ i ] === 'number' ) {
					dset( n[ i ], BINOMCOEFLN( v, k[ i ] ) );
				} else {
					dset( n[ i ], NaN );
				}
			}
		} else {
			if ( typeof k === 'number' ) {
				for ( i = 0; i < len; i++ ) {
					v = dget( n[ i ] );
					if ( typeof v === 'number' ) {
						dset( n[ i ], BINOMCOEFLN( v, k ) );
					} else {
						dset( n[ i ], NaN );
					}
				}
			} else {
				for ( i = 0; i < len; i++ ) {
					dset( n[ i ], NaN );
				}
			}
		}
	}
	return n;
} // end FUNCTION binomcoefln()


// EXPORTS //

module.exports = binomcoefln;
