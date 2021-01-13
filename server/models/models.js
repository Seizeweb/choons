const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/choons', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connected');
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const listSchema = new mongoose.Schema({
  releasesLink: Array,
  lastUpdated: Date,
});

const List = mongoose.model('List', listSchema);

const releaseSchema = new mongoose.Schema({
  tracks: Array,
  artist: Array,
  url: String,
  imageUrl: String,
  duration: String,
});

const Release = mongoose.model('Release', releaseSchema);

module.exports = { User, List, Release };
