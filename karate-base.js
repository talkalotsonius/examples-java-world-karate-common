/* This is the global Karate configuration file */

/* global karate, Java */
/* jshint esversion: 6 */

// `fn` function expected by Karate, see https://github.com/karatelabs/karate#karate-configjs
// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function fn() {
    'use strict';

    karate.log("Loading global scripts ...");
    const PREFIX_COMMON_SCRIPTS = 'classpath:common/scripts';
    const PREFIX_COMMON_UTIL_SCRIPTS = `${PREFIX_COMMON_SCRIPTS}/utils`;
    let getSystemProperty = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/getSystemProperty.js`);
    let abortOnExitCondition = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/exception/abortOnExitCondition.js`);

    /* Exported functions available in tests */
    let convertStringToJSObject = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/convertStringToJSObject.js`); // Object handling
    let diffOfJSObjects = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/diffOfJSObjects.js`); // Object handling
    let randomArrayElementSelector = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/randomArrayElementSelector.js`); // Object handling
    let randomUuidGenerator = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/randomUuidGenerator.js`); // Generator
    let randomHexStringGenerator = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/randomHexStringGenerator.js`); // Generator
    let getDateTime = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/getDateTime.js`); // Generator
    let calculateNotAllowedHttpMethods = read(`${PREFIX_COMMON_UTIL_SCRIPTS}/calculateNotAllowedHttpMethods.js`); // Logical sub-routine
    karate.log("... DONE");

    const env = karate.env || 'local'; // get system property 'karate.env'
    karate.log(`Environment: ${env}`); // Log the Environment passed through to Karate

    // By default, configure Karate's timeouts to 3000ms, API specific definitions must be declared individually
    karate.configure('connectTimeout', 3000);
    karate.configure('readTimeout', 3000);
    // By default, configure Karate's Charset to NULL, API specific definitions must be declared individually
    karate.configure('charset', null);
    // By default, configure Karate to always return lower case response headers
    karate.configure('lowerCaseResponseHeaders', true);

    // Based on the selected environment of the pipeline, build the base URL leading to the endpoints of the resources
    var baseUrl = 'http://localhost:8080/';
    if (env === 'review') {
        baseUrl = 'https://rev.api.mydomain.com';
    } else if (['dev', 'int', 'qa'].includes(env)) {
        baseUrl = `https://${env}.testing.api.mydomain.com/`;
    } else if (env === 'prod') {
        baseUrl = 'https://api.mydomain.com/';
    }

    karate.log("Karate base config has been loaded.");
    const PREFIX_COMMON_TESTS = 'classpath:common/karatetests'
    return {
        baseConfigurationError: 'exit(0)', // Ensures proper compatability of the abortOnExitCondition.

        env: env,
        baseUrl: baseUrl,

        // Java class paths
        javaClassPathHeaderGenerator: 'com.examples.api.utils.HeaderGenerator',
        javaClassPathHeaderManipulator: 'com.examples.api.utils.HeaderManipulator',

        // Exported JS functions
        convertToJSObject: convertStringToJSObject,
        diffOfJSObjects: diffOfJSObjects,
        randomArrayElementSelector: randomArrayElementSelector,
        randomUuidGenerator: randomUuidGenerator,
        randomHexStringGenerator: randomHexStringGenerator,
        getDateTime: getDateTime,
        calculateNotAllowedHttpMethods: calculateNotAllowedHttpMethods,

        // Common reusable (invalid) request Strings
        tooLargeUrlStringExtension: '?test=' + '1'.repeat(3000),
        tooLargeHeaderValue: '156'.repeat(1000),
        notExistentUrlResource: '/wrongEndpoint/123/ABC/123321',
        notExistentRestMethod: 'SEARCH',

        // Initiate repository path values for sets of common artifacts
        PREFIX_COMMON_SCRIPTS: PREFIX_COMMON_SCRIPTS,
        PREFIX_COMMON_UTIL_SCRIPTS: PREFIX_COMMON_UTIL_SCRIPTS,

        // Initiate repository path values for sets of common test scenarios
        PREFIX_COMMON_TESTS: PREFIX_COMMON_TESTS,
        httpStatusValidationFeature: `${PREFIX_COMMON_TESTS}/http-client-errors-with-payload.feature`,
        multipleFeature: `${PREFIX_COMMON_TESTS}/multiple-test-sets-validation-facade.feature`,
    };
}
