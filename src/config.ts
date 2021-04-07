export const SERVER_HOST =
  process.env.NODE_ENV == 'production'
    ? process.env.SERVER_HOST
    : 'http://localhost:5000';
