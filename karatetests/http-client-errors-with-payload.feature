@ApiTest
@JIRA-12345
@CommonTS1
Feature: Illustration of a test set for some HTTP client errors
# This feature takes parameters to call { resourceObjectPath: <jsonPathLocationToTheObjectElementsNeeded>,
#										  headerAsString: <generatedHeaderString> }

	Background:
    # ==================== Values & Configuration ====================
	* url baseUrl
	* path `${resource[__arg.resourceObjectPath].endpoint}${resource[__arg.resourceObjectPath].optionalPathAmendments}`
	## Load Java header classes
	* def headerManipulatorClass = Java.type(javaClassPathHeaderManipulator);
	* configure headers = convertToJSObject(__arg.headerAsString);

    # ==================== Payloads ====================
	* json validRequestPayload = read(`classpath:${resource[__arg.resourceObjectPath].validpayload}`)
	* json badRequestPayload = read(`classpath:${resource[__arg.resourceObjectPath].invalidpayload.badrequest}`)
	* def malformedRequestPayload = read(`classpath:${resource[__arg.resourceObjectPath].invalidpayload.malformedrequest}`)


	@setup
	# Format the list of rest methods to a usable list of objects in a Scenario Outline
	Scenario:
	* def methodArray = resource[__arg.resourceObjectPath].allowedmethodswithpayload
	* def methodList = karate.mapWithKey(methodArray, 'httpmethod')	
		

	# HTTP 400 Bad Request -- with missing payload
	Scenario Outline: given an empty payload, when ${httpmethod}, then return HTTP 400
		Given request ""
		When method httpmethod
		Then status 400
		And match karate.request.header('content-length') == '0'

		Examples:
		| karate.setup().methodList |

	# HTTP 400 Bad Request -- with bad payload
	Scenario Outline: given an invalid payload, when ${httpmethod}, then return HTTP 400
		Given request badRequestPayload
		When method httpmethod
		Then status 400

		Examples:
		| karate.setup().methodList |

	# HTTP 400 Bad Request -- with malformed payload
	Scenario Outline: given a malformed payload, when ${httpmethod}, then return HTTP 400
		Given request malformedRequestPayloadClientErrors
		And header Authorization = authorizationHeader
		When method httpmethod
		Then status 400

		Examples:
		| karate.setup().methodList |

  	# HTTP 404 Not Found -- with not existent resource
	Scenario Outline: given a valid payload towards a not-existent resource, when ${httpmethod}, then return HTTP 404
		Given path notExistentUrlResource
		And request validRequestPayloadClientErrors
		When method httpmethod
		Then status 404

		Examples:
		| karate.setup().methodList |

	# HTTP 405 Method Not Allowed -- with not existent REST method
	Scenario: given a valid payload, when a not-existent REST method i.e. SEARCH is called, then return HTTP 405
		Given request validRequestPayloadClientErrors
		When method notExistentRestMethod
		Then status 405

	# HTTP 405 Method Not Allowed -- with not allowed REST method
	Scenario: given a valid payload, when a not allowed method is called, then return HTTP 405
	* def notAllowedMethodsList = resource[__arg.resourceObjectPath].notallowedmethods
	* def randomNotAllowedRestMethod = randomArrayElementSelector(notAllowedMethodsList)

		Given request validRequestPayloadClientErrors
		When method randomNotAllowedRestMethod
		Then assert responseStatus == 405
