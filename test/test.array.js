/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	binomcoefln = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array binomcoefln', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoefln ).to.be.a( 'function' );
	});

	it( 'should evaluate the function when y is a scalar', function test() {
			var data, actual, expected;

			data = [
				1,
				2,
				3,
				4,
				5
			];
			actual = new Array( data.length );

			actual = binomcoefln( actual, data, 1 );

			expected = [
				0,
				0.693147180559945,
				1.09861228866811,
				1.38629436111989,
				1.6094379124341
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = binomcoefln( actual, data, 1 );
			expected = new Int32Array( expected );

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
		});

		it( 'should evaluate the function when y is an array', function test() {
			var data, actual, expected, y;

			data = [
				0,
				1,
				2,
				3,
				4
			];

		 	y = [
				0,
				1,
				2,
				3,
				4
			];
			actual = new Array( data.length );

			actual = binomcoefln( actual, data, y );

			expected = [
				0, 0, 0, 0, 0
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = binomcoefln( actual, data, y );
			expected = new Int32Array( expected );

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
		});

		it( 'should return an empty array if provided an empty array', function test() {
			assert.deepEqual( binomcoefln( [], [], 1 ), [] );
			assert.deepEqual( binomcoefln( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
		});

		it( 'should handle non-numeric values by setting the element to NaN', function test() {
			var data, actual, expected, y;

			data = [ true, null, [], {} ];
			actual = new Array( data.length );
			actual = binomcoefln( actual, data, 1 );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			actual = new Array( data.length );
			y = [ 1, 2, 3, 4 ];
			actual = binomcoefln( actual, data, y );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, 2, 3 ];
			y = null;
			actual = new Array( data.length );
			actual = binomcoefln( actual, data, y );
			expected = [ NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, null, 3 ];
			y = new Int32Array( [1,2,3] );
			actual = new Array( data.length );
			actual = binomcoefln( actual, data, y );
			expected = [ 0, NaN, 0 ];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		});

		it( 'should throw an error if provided a y array which is not of equal length to the input x array', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				binomcoefln( [], [1,2], [1,2,3] );
			}
			expect( foo2 ).to.throw( Error );
			function foo2() {
				binomcoefln( [], [1,2], new Int32Array( [1,2,3] ) );
			}
		});

		it( 'should throw an error if provided a matrix as y argument', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				binomcoefln( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ) );
			}
		});


});
