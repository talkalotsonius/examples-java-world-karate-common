/* Convert a JSON string to a JavaScript object.
   useful for i.e. generating and setting headers */

/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function convertStringToJSObject(stringToConvert) {
    'use strict';

    return JSON.parse(stringToConvert);
}