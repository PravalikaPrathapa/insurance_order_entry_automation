function uniqueEmail(prefix = 'insurance.qa') {
  return `${prefix}.${Date.now()}@example.test`;
}

function uniqueReference(prefix = 'AUTO') {
  return `${prefix}-${Date.now()}`;
}

module.exports = { uniqueEmail, uniqueReference };
