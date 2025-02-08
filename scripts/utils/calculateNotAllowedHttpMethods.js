/* Build a diff off of a static array of http request methods and any resource object's declared methods.
   The result will be added to the input resource object */

/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function calculateNotAllowedHttpMethods(resourceObject) {
    'use strict';

    const httpRequestMethods = [
        // REST methods
        'GET', 'POST', 'PUT',
        'PATCH', 'UPDATE', 'DELETE',
        // Other methods
        'TRACE', 'HEAD', 'CONNECT',
        'PRI'
    ]

    for (const level1_Key in resourceObject) {
        const merge = (a, b, predicate = (a, b) => a === b) => {
            const c = [...a]; // copy to avoid side effects
            // add all items from B to copy C if they're not already present
            b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
            return c;
        }
        const allMethods = merge(resourceObject[level1_Key].allowedmethodswithpayload,
            resourceObject[level1_Key].allowedmethodswithoutpayload);
        const usedMethods = allMethods.map(e => e);
        resourceObject[level1_Key].notallowedmethods = httpRequestMethods.filter(e => !usedMethods.includes(e));
    }

    return resourceObject;
}