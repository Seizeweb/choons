const jwt = require('jsonwebtoken');

const authMiddleware = async (ctx, next) => {
  const token = ctx.get('auth-token');
  if (!token) {
    ctx.status = 401;
    return (ctx.body = 'Access denied');
  }

  try {
    const verified = jwt.verify(token, 'qjelcotksqlrkqbbctT');

    if (verified._id) {
      ctx.request.body.userId = verified._id;
      await next();
    }
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    return (ctx.body = 'Invalid token');
  }
};

module.exports = { authMiddleware };
