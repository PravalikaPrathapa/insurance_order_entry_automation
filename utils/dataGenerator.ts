export function uniqueEmail(prefix = 'insurance.qa'): string {
  return `${prefix}.${Date.now()}@example.test`;
}

export function uniqueReference(prefix = 'AUTO'): string {
  return `${prefix}-${Date.now()}`;
}
