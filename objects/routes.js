const routes = {
  login: '/login',
  dashboard: '/dashboard',
  newApplication: '/applications/new',
  products: '/products',
  application: (id) => `/applications/${id}`,
  client: (id) => `/applications/${id}/client`,
  addressContact: (id) => `/applications/${id}/address-contact`,
  kycFinancial: (id) => `/applications/${id}/kyc-financial`,
  product: (id) => `/applications/${id}/product`,
  riders: (id) => `/applications/${id}/riders`,
  beneficiaries: (id) => `/applications/${id}/beneficiaries`,
  documents: (id) => `/applications/${id}/documents`,
  review: (id) => `/applications/${id}/review`,
  confirmation: (id) => `/applications/${id}/confirmation`,
  status: (id) => `/applications/${id}/status`,
};

module.exports = { routes };
