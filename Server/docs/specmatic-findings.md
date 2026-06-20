# Specmatic Findings

## Overview

Specmatic was integrated into the FuelFundr backend to perform contract testing against OpenAPI specifications for Authentication, Campaign, and Payment APIs.

The testing process helped validate API behavior, identify contract mismatches, improve schema quality, and generate resiliency-focused test scenarios.

---

## Authentication Testing

### Observation

The Login API contract expects a successful login response (HTTP 200) when valid credentials are provided.

During testing, Specmatic generated schema-compliant email and password combinations automatically. Since these generated users did not exist in the database, the API correctly returned HTTP 401 Unauthorized responses.

### Result

* Registration endpoint passed all generated contract and schema variation tests.
* Login endpoint highlighted an application-state dependency because successful authentication requires a pre-existing user.

### Learning

Contract testing helped identify dependencies that are not visible from the API schema alone and highlighted the importance of representative test data.

---

## Input Validation Testing

Schema constraints were added to the OpenAPI contracts to improve validation coverage.

Examples include:

* `minLength` and `maxLength` for user names
* `format: email` for email fields
* `minLength` for passwords
* `minimum` and `maximum` values for numeric fields

### Result

Specmatic automatically generated boundary-value test cases and schema variations, including:

* Shortest valid string values
* Longest valid string values
* Minimum valid numeric values
* Maximum valid numeric values
* Valid values within specified ranges

### Learning

Schema constraints significantly improve test coverage by validating API behavior across multiple valid input combinations rather than only a single happy-path scenario.

---

## Payment API Testing

### Observation

Contract testing identified differences between the documented payment contract and the actual Razorpay order response.

Additional fields returned by the API included:

* `amount_due`
* `amount_paid`
* `attempts`
* `created_at`
* `entity`
* `notes`
* `offer_id`

### Result

These discrepancies highlighted areas where the contract could be enhanced to more accurately reflect the implementation.

### Learning

Contract testing is valuable not only for validation but also for ensuring API documentation remains aligned with real-world behavior.

---

## Campaign API Testing

The Campaign API contract was successfully validated against the implementation.

### Result

* Contract tests passed successfully.
* Response schema matched the documented contract.
* 100% coverage was achieved for the documented endpoint.

### Learning

Contract testing provided confidence that campaign data returned by the API remained consistent with the published specification.

---

## External Examples

To improve contract quality and maintainability, external example files were added for major API workflows:

* User Registration
* User Login
* Campaign Retrieval
* Payment Order Creation

These examples provide reusable request-response pairs and improve the readability of the contract suite.

---

## Schema Resiliency Testing

To improve contract quality, additional validation constraints were added to the OpenAPI specifications, including:

* `minLength` and `maxLength` constraints for user names
* `format: email` validation for email fields
* `minLength` validation for passwords
* `minimum` and `maximum` constraints for numeric fields such as payment amounts

Using these constraints, Specmatic automatically generated boundary-value test cases and schema variations.

Examples included:

* Shortest valid name
* Longest valid name
* Minimum valid password length
* Minimum valid payment amount
* Maximum valid payment amount

### Result

The generated scenarios successfully validated API behavior across multiple valid input combinations and demonstrated schema resiliency beyond basic happy-path testing.

### Learning

Schema-driven testing increased coverage by automatically generating boundary-value test cases from the OpenAPI contract, helping identify validation and contract-related issues early in the development process.

---

## Continuous Integration

Contract tests were integrated into GitHub Actions to enable automated validation during future development.

This ensures that API changes can be verified continuously against the documented contracts.

---

## Conclusion

The Specmatic integration enabled:

* Contract validation against OpenAPI specifications
* Schema resiliency testing through validation constraints
* Detection of contract-to-implementation mismatches
* Addition of reusable external examples
* Automated contract testing through CI integration

Overall, the exercise improved API reliability, documentation quality, and confidence in contract compliance across the FuelFundr platform.
