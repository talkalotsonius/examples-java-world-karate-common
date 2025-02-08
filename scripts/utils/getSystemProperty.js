/* This function returns a system property value from a given propertyName. */

/* global Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function getSystemProperty(propertyName) {
    'use strict';

    let javaSystem = Java.type('java.lang.System');

    return javaSystem.getProperty(propertyName);
}