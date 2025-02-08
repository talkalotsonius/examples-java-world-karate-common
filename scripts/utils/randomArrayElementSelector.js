/* Build a diff off of a static array of http request methods and any resource object's declared methods.
   The result will be added to the input resource object */

/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function randomArrayElementSelector(array) {
    'use strict';

    return array[Math.floor((Math.random()*array.length))];
}