const { test, expect } = require('@playwright/test');

test('API-V01 products API returns 200 with a list @api @regression', async ({ request }) => {
  const response = await request.get('/api/products');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body) || Array.isArray(body.products)).toBeTruthy();
});

// Negative: kept for coverage, excluded from regression runs.
test('API-V02 applications API requires authorization @api @negative', async ({ request }) => {
  const response = await request.get('/api/applications');
  expect([401, 403]).toContain(response.status());
});
