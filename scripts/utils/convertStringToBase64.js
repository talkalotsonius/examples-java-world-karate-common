/* This function converts a string value to a Base64 encoded string value, for a given charset.
   It returns Base64 encoded string of the input. */

/* global Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function convertStringToBase64(inputString, charset) {
    'use strict';

    let javaBase64 = Java.type('java.util.Base64');
    let javaString = Java.type('java.lang.String');

    return javaBase64.getEncoder()
                     .encodeToString(new javaString(inputString).getBytes(charset));
}