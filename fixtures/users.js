// Credentials come only from the environment. Nothing is hard-coded.
const users = {
  get valid() {
    const username = process.env.AGENT_USER;
    const password = process.env.AGENT_PASSWORD;
    if (!username || !password) {
      throw new Error('AGENT_USER and AGENT_PASSWORD must be set in the shell before running tests.');
    }
    return { username, password };
  },
  invalid: { username: 'invalid-agent', password: 'WrongPassword!' },
};

module.exports = { users };
