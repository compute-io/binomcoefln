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
	binomcoefln = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset binomcoefln', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoefln ).to.be.a( 'function' );
	});

	it( 'should evaluate the binomcoefln function when y is a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':0.5},
			{'x':1},
			{'x':1.5},
			{'x':2}
		];

		actual = binomcoefln( data, 1, 'x' );

		expected = [
			{'x':-0.693147180559945},
			{'x':0},
			{'x':0.405465108108164},
			{'x':0.693147180559945}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,0.5]},
			{'x':[9,1]},
			{'x':[9,1.5]},
			{'x':[9,2]}
		];

		actual = binomcoefln( data, 1, 'x/1', '/' );
		expected = [
			{'x':[9,-0.693147180559945]},
			{'x':[9,0]},
			{'x':[9,0.405465108108164]},
			{'x':[9,0.693147180559945]}
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the binomcoefln function when y is an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = binomcoefln( data, y, 'x' );

		expected = [
			{'x':0},
			{'x':0},
			{'x':0},
			{'x':0}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = binomcoefln( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( binomcoefln( arr, 1, 'x' ), [] );
		assert.deepEqual( binomcoefln( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// raising to a non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = binomcoefln( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// raising to a scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = binomcoefln( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,0]},
			{'x':[9,NaN]},
			{'x':[9,1.09861228866811]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = binomcoefln( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,0]},
			{'x':[9,NaN]},
			{'x':[9,0]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = binomcoefln( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,0]},
			{'x':[9,NaN]},
			{'x':[9,0]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});


	it( 'should throw an error if provided a matrix as y argument', function test() {
		var data, y;

		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];
		y = matrix( new Int32Array( [1,2,3,4] ), [2,2] );

		expect( foo ).to.throw( Error );
		function foo() {
			binomcoefln(data, y, 'x.1' );
		}
	});


});
