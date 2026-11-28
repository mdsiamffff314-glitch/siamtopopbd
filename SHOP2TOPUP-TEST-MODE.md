# Shop2Topup Integration — Safe Test Mode

This starter is intentionally **simulation-only**. It does not contact Shop2Topup, spend wallet funds, or deliver game diamonds.

## API information gathered
- Base path: `/api/endpoints/v1`
- Catalog list: `GET /catalog/subcategories`
- Player validation: `POST /player/validate`
- Create order: `POST /orders/create`
- Order status: `GET /orders/:orderId`

## Before any live integration
1. Keep API credentials out of HTML, screenshots, source control, and chat.
2. Use a server-side secret store/environment variables only.
3. Have the account owner and an authorized adult review any live purchase integration.
4. Verify the API account, product mapping, pricing, player requirements, duplicate prevention, and failure/refund handling using a provider-approved test environment.
5. Do not treat a customer-entered transaction ID, screenshot, SMS, or Telegram message as payment proof.
6. Do not enable live orders until an authorized payment provider confirms payment server-side and the order workflow has been reviewed.

## Package mapping
The existing site package labels/prices are not yet verified against Shop2Topup `item_id` values. A mapping must be reviewed before any order workflow can be enabled.

## Webhook URL reachability
- `POST /webhooks/shop2topup` now returns HTTP 200 for provider URL-validation POSTs (payload limit: 64 KiB).
- This is a reachability acknowledgement only. It deliberately does not update orders, wallet balances, or delivery state.
- Do not treat this as completed webhook integration. Before processing events, implement the exact Shop2Topup signature/secret verification and event schema from its Webhooks documentation, plus idempotency and order-state checks.


## Validation endpoint reliability update
- Webhook requests are handled before optional GitHub/storage initialization, preventing storage startup delays from timing out provider validation.
- POST validation probes receive HTTP 200, including empty or non-JSON probe bodies.
- GET/HEAD diagnostics, trailing slashes, and query strings are supported.
- This remains reachability-only; no signature verification, order mutation, wallet change, or delivery occurs until the official provider event/signature contract is implemented.
