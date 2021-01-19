const { User } = require('../models/models.js');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;

  const { error } = registerValidation(ctx.request.body);
  if (error) {
    ctx.status = 400;
    return (ctx.body = error.details[0].message);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    ctx.status = 400;
    return (ctx.body = 'User already exists');
  }

  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      email,
      password: hash,
    });
    await user.save();
    ctx.body = user._id;
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = error;
  }
};

const deleteUser = async (ctx) => {
  const { userId } = ctx.request.body;
  try {
    const deleted = await User.findOneAndDelete({ _id: userId });
    if (deleted) {
      ctx.body = 'User was deleted';
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
};

const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  const { error } = loginValidation(ctx.request.body);
  if (error) {
    ctx.status = 400;
    return (ctx.body = error.details[0].message);
  }

  const user = await User.findOne({ email });
  if (!user) {
    ctx.status = 400;
    return (ctx.body = 'Email or password seems to be wrong');
  }

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    ctx.status = 400;
    return (ctx.body = 'Email or password seems to be wrong');
  }

  const token = jwt.sign({ _id: user._id }, 'qjelcotksqlrkqbbctT');
  ctx.set('auth-token', token);
  ctx.body = { username: user.username, email: user.email, token };
};

const profile = async (ctx) => {
  const { userId } = ctx.request.body;
  const user = await User.findOne({ _id: userId });
  ctx.body = {
    username: user.username,
    email: user.email,
    token: ctx.get('auth-token'),
  };
};

const logout = async (ctx) => {
  ctx.body = 'logged out';
};

module.exports = { createUser, deleteUser, login, profile, logout };
