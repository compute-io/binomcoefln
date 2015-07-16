binomcoefln
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the natural logarithm of the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient).

The `binomialcoefln` function computes the natural logarithm of the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient), i.e. 

<div class="equation" align="center" data-raw-text="
f(n,k) = \ln {n \choose k}" data-equation="eq:binomcoefln_function">
	<img src="https://cdn.rawgit.com/compute-io/binomcoefln/5cc990e7956f2689e011ccba84835f6dd6733ca4/docs/img/eqn.svg" alt="Equation for the natural logarithm of the binomial coefficient.">
	<br>
</div>

for any numbers `n` and `k`. Hence, the function supports the generalization of the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) to negative integers and real numbers in general. 

## Installation

``` bash
$ npm install compute-binomcoefln
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var binomcoefln = require( 'compute-binomcoefln' );
```

#### binomcoefln( n, k[, options] )

Computes the natural logarithm of the [Binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) (element-wise). `n` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).  `k` has to be either an `array` or `matrix` of equal dimensions as `n` or a single number. Correspondingly, the function returns either an `array` with the same length as the input `array(s)`, a `matrix` with the same dimensions as the input `matrix/matrices` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = binomcoefln( 10, 2 );
// returns ~3.807

out = binomcoefln( 0, 0 );
// returns 0

/*
Handles negative numbers:
*/
out = binomcoefln( -1, 2 );
// returns 0

out = binomcoefln( -5, 4 );
// returns ~4.248

/*
Generalized version for real numbers:
*/
out = binomcoefln( 4.4, 2 );
// returns ~2.012

out = binomcoefln( 4.4, 1.5 );
// returns ~1.845

data = [ 0.5, 1, 1.5, 2, 2.5 ];
out = binomcoefln( data, 0.1 );
// returns [ ~0.049, ~0.089, ~0.118, ~0.140, ~0.159 ]

data = new Int8Array( data );
out = binomcoefln( data );
// returns Float64Array( [ ~0.049, ~0.089, ~0.118, ~0.140, ~0.159 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = binomcoefln( mat, 0.1 );
/*
	[  ~-0.017 ~0.049
	   ~0.089  ~0.118
	   ~0.140  ~0.159 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 0.5 ],
	['boop', 1 ], 
	['bip', 1.5 ],
	['bap', 2 ],
	['baz', 2.5 ]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = binomcoefln( data, 0.1, {
	'accessor': getValue
});
// returns [ ~0.049, ~0.089, ~0.118, ~0.140, ~0.159 ]
```


When evaluating the [Beta function](https://en.wikipedia.org/wiki/Beta_function) for values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 0.5],
	['boop', 1],
	['bip', 1.5],
	['bap', 2],
	['baz', 2.5]
];

var k = [
	{'x': 0.5},
	{'x': 1},
	{'x': 1.5.},
	{'x': 2},
	{'x': 2.5}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = beta( data, y, {
	'accessor': getValue
});
// returns [ ~0, ~0, ~0, ~0, ~0 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0.5]},
	{'x':[1,1]},
	{'x':[2,1.5]},
	{'x':[3,2]},
	{'x':[4,2.5]}
];

var out = binomcoefln( data, 0.1, 'x|1', '|' );
/*
	[
		{'x':[0,~0.049]},
		{'x':[1,~0.089]},
		{'x':[2,~0.118]},
		{'x':[3,~0.140]},
		{'x':[4,~0.159]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [10,20,30] );

out = binomcoefln( data, {
	'dtype': 'int32'
});
// returns Int32Array( [3,5,6] )

// Works for plain arrays, as well...
out = binomcoefln( [10,20,30], {
	'dtype': 'uint8'
});
// returns Uint8Array( [3,5,6] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ 0.5, 1, 1.5, 2, 2.5 ];

var out = binomcoefln( data, 0.1, {
	'copy': false
});
// returns [ ~0.049, ~0.089, ~0.118, ~0.140, ~0.159 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = binomcoefln( mat, 0.1, {
	'copy': false
});
/*
	[  ~-0.017 ~0.049
	   ~0.089  ~0.118
	   ~0.140  ~0.159 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = binomcoefln( null, 1 );
	// returns NaN

	out = binomcoefln( true, 1 );
	// returns NaN

	out = binomcoefln( {'a':'b'}, 1 );
	// returns NaN

	out = binomcoefln( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = binomcoefln( data, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = binomcoefln( data, 1, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = binomcoefln( [ true, null, [] ], 0.1,  {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	 binomcoefln = require( 'compute-binomcoefln' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
out = binomcoefln( data, 3 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = binomcoefln( data, 3, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = binomcoefln( data, 3, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
tmp = binomcoefln( data, 3 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = binomcoefln( mat, 3 );

// Matrices (custom output data type)...
out = binomcoefln( mat, 3, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-binomcoefln.svg
[npm-url]: https://npmjs.org/package/compute-binomcoefln

[travis-image]: http://img.shields.io/travis/compute-io/binomcoefln/master.svg
[travis-url]: https://travis-ci.org/compute-io/binomcoefln

[coveralls-image]: https://img.shields.io/coveralls/compute-io/binomcoefln/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/binomcoefln?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/binomcoefln.svg
[dependencies-url]: https://david-dm.org/compute-io/binomcoefln

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/binomcoefln.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/binomcoefln

[github-issues-image]: http://img.shields.io/github/issues/compute-io/binomcoefln.svg
[github-issues-url]: https://github.com/compute-io/binomcoefln/issues
