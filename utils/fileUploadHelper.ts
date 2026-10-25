import { Locator } from '@playwright/test';

export async function uploadFile(input: Locator, filePath: string) {
  await input.setInputFiles(filePath);
}
