/* This function generates a randomized HexString of a given length. */

/* global Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function randomHexStringGenerator(randomValueSize) {
    'use strict';

    let javaRandom = Java.type('java.util.Random'); //or: java.security.SecureRandom
    let javaStringBuffer = Java.type('java.lang.StringBuffer');
    let javaInteger = Java.type('java.lang.Integer');

    let randomValue = new javaRandom();
    let stringBuffer = new javaStringBuffer();
    while (stringBuffer.length < randomValueSize) {
        stringBuffer.append(javaInteger.toHexString(randomValue.nextInt()));
    }

    return stringBuffer.toString().substring(0, randomValueSize);
}