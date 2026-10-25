export const users = {
  valid: { username: process.env.AGENT_USER || 'REPLACE_ME', password: process.env.AGENT_PASSWORD || 'REPLACE_ME' },
  invalid: { username: 'invalid-agent', password: 'WrongPassword!' }
};
