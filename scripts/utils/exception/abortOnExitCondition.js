/* This function is used to make Karate fail as fast as possible.
   It is given a log message as input and loges this to Karate and configures Karate to abort on the first fail.
   This function returns a key pair value containing baseConfigurationError.
   Use this function in direct combination with a return statement.
   e.g.: return abortOnExitCondition("Error message");
   This is ONLY EVER to be used in Karate configuration files like karate-base.js and karate-config.js,
   in all other cases use the Karate built-in functions. */

/* global karate,Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function abortOnExitCondition(logMessage) {
    'use strict';

    karate.log(logMessage);
    karate.configure('abortSuiteOnFailure', true);

    return { baseConfigurationError: 'exit(1)' };
}