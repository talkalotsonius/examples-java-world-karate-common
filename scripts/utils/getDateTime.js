/* This function returns a date time in a given specific format. */

/* global Java */
/* jshint esversion: 6 */

// noinspection JSUnusedGlobalSymbols,FunctionNamingConventionJS
function getDateTime(dateTimeFormatString) {
    'use strict';

    let javaSimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    let javaUtil = Java.type('java.util');
    let dateTimeFormat = new javaSimpleDateFormat(dateTimeFormatString); // i.e. "yyyy-MM-dd'T'HH:mm:ss.SSS" or "yyyyMMdd'0'HHmmss"

    return dateTimeFormat.format(new javaUtil.Date());
}