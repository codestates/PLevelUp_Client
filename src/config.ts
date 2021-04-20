export const SERVER_HOST =
  process.env.NODE_ENV == 'production'
    ? 'https://api.p-levelup.com'
    : 'http://localhost:5000';
