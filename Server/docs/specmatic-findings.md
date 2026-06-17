# Specmatic Findings

## Authentication

Contract testing revealed that the payment endpoint requires authentication.

Expected:
200 OK

Actual:
401 Unauthorized

Fix:
Documented 401 response in OpenAPI contract.

---

## Input Validation

Resiliency testing with invalid payloads:

1. Missing amount
2. amount = 0
3. amount = -500

Result:
API correctly returned 400 Bad Request.

Learning:
Specmatic helped identify undocumented behaviors and improve API contracts.
