const { User } = require('../models/models.js');
const bcrypt = require('bcrypt');

const createUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // TODO res.send that the user exists
      ctx.body = 'User already exists';
      console.log('user already exists');
    } else {
      const hash = bcrypt.hashSync(password, 10);
      const user = new User({
        username,
        email,
        password: hash,
      });
      await user.save();
      ctx.body = user._id;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (ctx, next) => {};

const login = async (ctx, next) => {};

const profile = async (ctx, next) => {};

const logout = async (ctx, next) => {};

module.exports = { createUser, deleteUser, login, profile, logout };
