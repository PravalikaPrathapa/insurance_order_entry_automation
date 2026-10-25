import { test, expect } from '@playwright/test';
test('API-V01 products API returns success @api @regression',async({request})=>{ const r=await request.get('/api/products'); expect(r.status()).toBe(200); const body=await r.json(); expect(body).toBeTruthy(); });
test('API-V02 applications API requires authorization @api @regression',async({request})=>{ const r=await request.get('/api/applications'); expect([401,403]).toContain(r.status()); });
