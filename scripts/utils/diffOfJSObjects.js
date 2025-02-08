/* Build a diff off of two JavaScript objects
   The result will be the remaining objects of input objA, as
   long as the following condition is satisfied sizeof(objA) > sizeof(objB)*/

/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function diffOfJSObjects(objA, objB) {
    'use strict';

    const result = {};
    for(const _key in objA){
        if (!objB[_key] && objA[_key] !== objB[_key]) {
            result[_key] = objA[_key];
        }
    }

    return result;
}