@ApiTest
@JIRA-12345
@ValidationFacade
Feature: Multiple tests in one (larger) set
# This feature takes parameters to call { resourceObjectPath: <jsonPathLocationToTheObjectElementsNeeded>,
#										  headerAsString: <generatedHeaderString> }

	Background:
    # ==================== Values & Configuration ====================
	* def validFeature = `${PREFIX_COMMON_TESTS}/multiplesets/valid.feature`
	* def invalidFeature = `${PREFIX_COMMON_TESTS}/multiplesets/invalid.feature`
	* def conditionalFeature = `${PREFIX_COMMON_TESTS}/multiplesets/conditional.feature`
	* def featureCallParameters = { resourceObjectPath: "#(__arg.resourceObjectPath)",  headerAsString: "#(__arg.headerAsString)" }


	Scenario: Validation
	* karate.call(validFeature, featureCallParameters)
	* karate.call(invalidFeature, featureCallParameters)
	* if( resource[__arg.resourceObjectPath].allowedmethodswithpayload.length > 0 ) karate.call(conditionalFeature, featureCallParameters)
