const authMiddleware = async (ctx, next) => {
  const isAuthenticated = true;

  if (isAuthenticated) next();
};

module.exports = { authMiddleware };
