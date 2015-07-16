'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var binomcoefln1 = require( './number.js' ),
	binomcoefln2 = require( './array.js' ),
	binomcoefln3 = require( './accessor.js' ),
	binomcoefln4 = require( './deepset.js' ),
	binomcoefln5 = require( './matrix.js' ),
	binomcoefln6 = require( './typedarray.js' );


/**
* FUNCTION: fill( n, val )
*	Creates an array of length n and fills it with the supplied value
* @param {Number} n - array length
* @param {*} val - value to fill the array with
* @returns {Array} array of length n
*/
function fill( n, val ) {
	var ret = new Array( n );
	for ( var i = 0; i < n; i++ ) {
		ret[ i ] = val;
	}
	return ret;
}


// BINOMCOEFLN FUNCTION //

/**
* FUNCTION: binomcoefln( n, k[, opts] )
*	Computes the natural logarithm of the binomial coefficient.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} n - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} k - either an array or matrix of equal dimension or a scalar
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} function value(s)
*/
function binomcoefln( n, k, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length < 2 ) {
		throw new Error( 'binomcoefln()::`k` argument is missing.' );
	}
	// Handle cases where first argument is a number
	if ( isNumber( n ) || isnan( n ) ) {
		for ( var key in options ) {
			if ( key !== 'dtype' ){
				throw new Error( 'binomcoefln()::only dtype option is applicable when first argument is not array- or matrix-like. Keys: `' + Object.keys( options ) + '`.' );
			}
		}
		if ( isMatrixLike( k ) ) {
			// Create a matrix holding n's:
			d = new Float64Array( fill( k.length, n ) );
			n = matrix( d, k.shape, 'float64' );
			return options ? binomcoefln( n, k, options ) : binomcoefln( n, k );
		}
		if ( isArrayLike( k ) ) {
			return options ? binomcoefln( fill( k.length, n ), k, options ) : binomcoefln( fill( k.length, n ), k );
		}
		if ( !isNumber( k ) ) {
			return NaN;
		}
		return binomcoefln1( n, k );
	}
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( n ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'binomcoefln()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( n.length );
			out = matrix( d, n.shape, dt );
		} else {
			out = n;
		}
		return binomcoefln5( out, n, k );
	}
	if ( isTypedArrayLike( n ) ) {
		if ( opts.copy === false ) {
			out = n;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'binomcoefln()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( n.length );
		}
		return binomcoefln6( out, n, k );
	}
	if ( isArrayLike( n ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return binomcoefln4( n, k, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = n;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'binomcoefln()::invalid input argument. Unrecognized/unsupported array-like object. Provide either a plain or typed array. Value: `' + n + '`.' );
			}
			out = new ctor( n.length );
		}
		else {
			out = new Array( n.length );
		}
		if ( opts.accessor ) {
			return binomcoefln3( out, n, k, opts.accessor );
		}
		return binomcoefln2( out, n, k );
	}
	return NaN;
} // end FUNCTION binomcoefln()

// EXPORTS //

module.exports = binomcoefln;
