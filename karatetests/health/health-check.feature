@ApiTest
@JIRA-12345
@Health
Feature: Health check
# This feature takes parameters to call { basePath: <basePath values as String> }

	Background:
    # ==================== Values & Configuration ====================
	* url baseUrl
	* path `${__arg.basePath}/health`


	Scenario: given the base path of an api, when GET, then return HTTP 200
	# Health check the entire API via an GET call towards the "/health" endpoint of the specific API
		When method GET
		Then status 200
