/* This function returns a random generated UUID string. */

/* global Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function randomUuidGenerator() {
    'use strict';

    let javaUuid = Java.type('java.util.UUID');

    return javaUuid.randomUUID();
}