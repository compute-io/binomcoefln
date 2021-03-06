'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	isArrayLike = require( 'validate.io-array-like' );


// FUNCTIONS //

var BINOMCOEFLN = require( './number.js' );


// BINOMCOEFLN FUNCTION //

/**
* FUNCTION: binomcoefln( out, n, k )
*	Computes the natural logarithm of the binomial coefficient for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} n - input matrix
* @param {Matrix|Number} k - either a matrix of equal dimensions or a scalar
* @returns {Matrix} output matrix
*/
function binomcoefln( out, n, k ) {
	var len = n.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( 'binomcoefln()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	if ( isMatrixLike( k ) ) {
		M = n.shape[0];
		N = n.shape[1];
		if ( M !== n.shape[0] || N !== k.shape[1] ) {
			throw new Error( 'binomcoefln()::invalid input arguments. Both matrices must have the same number of rows and columns.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, BINOMCOEFLN( n.get( i, j ), k.get( i, j ) ) );
			}
		}
	} else if ( isArrayLike ( k ) ) {
		throw new Error( 'binomcoefln()::invalid input arguments. When provided a matrix, the other input has to be either a matrix of the same dimensionality or a scalar value.' );
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = BINOMCOEFLN( n.data[ i ], k );
		}
	}
	return out;
} // end FUNCTION binomcoefln()


// EXPORTS //

module.exports = binomcoefln;
