import { test } from '@playwright/test'; import { LoginPage } from '../../pages/LoginPage'; import { users } from '../../fixtures/users';
test('AUTH-V01 valid agent login @smoke @regression', async({page})=>{ const p=new LoginPage(page); await p.goto(); await p.login(users.valid.username,users.valid.password); await p.expectDashboard(); });
test('AUTH-V02 invalid password shows error @regression', async({page})=>{ const p=new LoginPage(page); await p.goto(); await p.login(users.invalid.username,users.invalid.password); await p.expectError(); });
test('AUTH-V03 blank credentials show mandatory validation @regression', async({page})=>{ const p=new LoginPage(page); await p.goto(); await page.getByRole('button',{name:/log in|sign in/i}).click(); await p.expectError(); });
test('AUTH-V05 protected dashboard requires login @smoke @regression', async({page})=>{ await page.goto('/dashboard'); await page.waitForLoadState('domcontentloaded'); await test.expect(page).toHaveURL(/login|auth/); });
