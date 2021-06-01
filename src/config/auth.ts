export default {
  JWT: {
    secretPrivate: process.env.JWT_KEY,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
};
