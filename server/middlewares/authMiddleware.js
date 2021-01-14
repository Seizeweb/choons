const authMiddleware = async (ctx, next) => {
  // const isAuthenticated = true;
  // 'Lucas' userId
  const userId = '600000e4bf02ed0830738486';
  // const userId = ctx.req.userId; // TODO: make this to a JWT later
  ctx.request.body.userId = userId;

  if (userId) await next();
};

module.exports = { authMiddleware };
