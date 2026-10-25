// Waits until the URL is /applications/<id>/... (ignores /applications/new) and returns <id>.
async function waitForApplicationId(page) {
  await page.waitForURL(/\/applications\/(?!new(?:\/|$))[^/?#]+/);
  return new URL(page.url()).pathname.split('/')[2];
}

module.exports = { waitForApplicationId };
