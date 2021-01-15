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
  name: String,
  releases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Release',
    },
  ],
  lastReleasesArtwork: { type: String, default: '' },
  lastUpdated: { type: Date, default: Date.now() },
  owner: String,
});

const List = mongoose.model('List', listSchema);

const releaseSchema = new mongoose.Schema({
  tracks: [],
  artist: String,
  title: String,
  url: String,
  imageUrl: String,
  itemType: String,
  bandcampId: String,
});

const Release = mongoose.model('Release', releaseSchema);

module.exports = { User, List, Release };
