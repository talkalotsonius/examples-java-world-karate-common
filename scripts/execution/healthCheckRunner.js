/* This function is used to send an initial health check call
   vs. the API under test, in case of failure Karate crashes.
   The execution of this function needs to be added
   into the API specific karate-config.js */

/* global karate,Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function healthCheckRunner(env, basePath) {
    'use strict';

    karate.log(`Running API health check on ${basePath} ...`);
    let abortOnExitCondition = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/exception/abortOnExitCondition.js`);

    try {
        if (env !== 'local') {
            let healthCheckCall = karate.callSingle(`${PREFIX_COMMON_TESTS}/health/health-check.feature`, {basePath: basePath});
            if (healthCheckCall.responseStatus !== 200) {
                return Object.assign(abortOnExitCondition(`ABORTING... health check failed! HTTP status was ${healthCheckCall.responseStatus}.`),
                                     {baseUrl: null, tokens: null});
            }
            karate.log(`API health check for ${basePath} successfully passed with HTTP status ${healthCheckCall.responseStatus}.`);
        }
    } catch(e) {
        karate.log(`System encountered an exception during execution of the health check on ${basePath}.`);
        abortOnExitCondition("ABORTING... health check failed!");
        java.lang.System.exit(0);
    }
}
