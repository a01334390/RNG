/* eslint-disable */

// Mathematical packages
const math = require('mathjs')
/**
 * Calculates random numbers using the Middle Squares method
 * @param {Number} seed 
 * @param {Number} cases 
 * @returns {[Number]} random numbers
 */
function middleSquares(seed,cases){
	if(cases == 0 || seed.length != 4 || seed != parseInt(seed,10)){
		alert('Las variables no cumplen con los requerimientos necesarios para correr este metodo')
		return []
	}
	var steps = [] //We'll be storing all steps using this variable
	var cseed = seed
	for(var i = 0; i < cases; i++){
		var step = {}
		step.n = i+1
		// Add the seed to the step
		step.seed = cseed 
		//Calculate the square number
		var squared = math.pow(cseed,2)
		// Add the squared to the step
		step.square = squared
		// Get the middlemost 4 numbers
		var prerandom = squared.toString().substring(2-(8-squared.toString().length),6-(8-squared.toString().length))
		// Add the prerandom to the step
		step.prerandom = prerandom
		// Calculate the pseudorandom number
		var randomnum = parseInt(prerandom,10) / 10000
		// Add the random number to the step
		step.random = randomnum
		// Rewrite the seed
		cseed = prerandom
		//Add to the steps
		steps.push(step)
	}
	
	return steps
}
/**
 * Calculates the congruential method for random numbers
 * @param {NUmber} seed , method's seed
 * @param {Number} a, method's a value
 * @param {Number} c, method's c value
 * @param {Number} m , method's m value
 * @param {Number} cases, method's number of cases 
 */
function congruentialMethod(seed,a,c,m,cases){
	if(parseInt(a) > parseInt(m) || parseInt(seed) > parseInt(m) || parseInt(c) > parseInt(m)){
		alert('Las variables no cumplen con los requerimientos necesarios para correr este metodo')
		return []
	}
	return congMethodGen(seed,a,c,m,cases)
}

/**
 * Actually creates the congruential method's table
 * @param {NUmber} seed , method's seed
 * @param {Number} a, method's a value
 * @param {Number} c, method's c value
 * @param {Number} m , method's m value
 * @param {Number} cases, method's number of cases 
 */
function congMethodGen(seed,a,c,m,cases){
	var steps = []
	var cseed = seed
	for(var i = 0; i < cases; i++){
		var step = {}
		step.n = i+1
		step.seed = cseed
		var precalc = ((parseInt(a)*parseInt(cseed)) + parseInt(c))
		var prerandom = math.mod(parseInt(precalc),parseInt(m))
		step.prerandom = prerandom
		cseed = parseInt(prerandom)
		var random = parseInt(prerandom) / parseInt(m)
		step.random = random
		steps.push(step)
	}

	return steps
}

/**
 * Check's for Hull-Dobel before generating the mixed congruential method
 * @param {Number} seed , method's seed
 * @param {Number} a, method's a value
 * @param {Number} c, method's c value
 * @param {Number} m , method's m value
 * @param {Number} cases, method's number of cases 
 */
function congruentialMixedMethod(seed, a, c, m, cases){
	/* Check for Hull-Dobel */
	if(!relativePrime(c,m)){
		alert('S1-> Las variables c y m no son primos relativos, no cumplen con Hull-Dobel')
		return []
	}

	if(!hulldobelstep2(a,m)){
		alert('S2 -> Las variables a y m no cumplen con la segunda regla de Hull-Dobel')
		return []
	}

	if(!hulldobelstep3(a,m)){
		alert('S3-> Las variables a y m no cumplen con la tercera regla de Hull-Dobel')
		return []
	}

	return congMethodGen(seed,a,c,m,cases)
}

/**
 * 
 * @param {*} seed 
 * @param {*} a 
 * @param {*} m 
 * @param {*} cases 
 */
function congruentialMultiplicative(seed,a,m,cases){
	if(!(parseInt(m) > parseInt(a) && parseInt(m) > parseInt(seed))){
		alert('Las variables no satisfacen los req. para este metodo')
		return []
	}

	return congMethodGen(seed,a,0,m,cases)
}


/**
 * 
 * @param {*} a 
 * @param {*} m 
 */
function hulldobelstep3(a,m){
	if(m%4==0 && (a-1)%4==0){
		return true
	}
	return false
}

/**
 * 
 * @param {*} a 
 * @param {*} m 
 */
function hulldobelstep2(a,m){
	var prime = generatePrimeNumbers(m)
	for(var i = 0; i < prime.length; i++){
		if(m%prime[i]==0 && (a-1)%prime[i]==0){
			return true
		}
	}
	return false
}

/**
 * 
 * @param {*} a 
 */
function isPrime(a){
	for(var i = 2; i < a; i++){
		if(a%i == 0){
			return false
		}
	}
	return true
}

/**
 * 
 * @param {*} n 
 */
function generatePrimeNumbers(n){
	var arr = []
	for(var i = 2; i <= n; i++){
		if(isPrime(i)){
			arr.push(i)
		}
	}
	return arr
}

/**
 * 
 * @param {*} a 
 * @param {*} b 
 */
function relativePrime(a,b){
	return (math.mod(parseInt(a),parseInt(b))!=0) && (math.mod(parseInt(b),parseInt(a))!=0)
}


module.exports = {middleSquares,congruentialMethod,congruentialMixedMethod, congruentialMultiplicative}