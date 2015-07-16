/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	binomcoefln = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number binomcoefln', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoefln ).to.be.a( 'function' );
	});

	it( 'should evaluate the function', function test() {
		assert.strictEqual( binomcoefln( 1, 1 ), 0 );
		assert.strictEqual( binomcoefln( 0, 0 ), 0 );
		assert.strictEqual( binomcoefln( 4, 5 ), Number.NEGATIVE_INFINITY );
		assert.closeTo( binomcoefln( 2.5, 1 ), 0.9162907, 1e-7 );
		assert.closeTo( binomcoefln( 5, 3 ), 2.302585, 1e-7 );
		assert.closeTo( binomcoefln( 4, 2.2 ), Math.log( 5.9058667 ), 1e-7 );
		assert.closeTo( binomcoefln( 5.5, 2.2 ), Math.log( 13.411817 ), 1e-7 );
		assert.closeTo( binomcoefln( 5.5, 2.2 ), Math.log( 13.411817 ), 1e-7 );
		assert.strictEqual( binomcoefln( 3, -2 ), Number.NEGATIVE_INFINITY );
		assert.closeTo( binomcoefln( -3, 2 ), 1.791759469228053, 1e-7 );
	});

});
