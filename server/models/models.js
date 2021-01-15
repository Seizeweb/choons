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
  tracks: { type: [], required: [true, 'tracks is required'] },
  artist: { type: String, required: [true, 'artist is required'] },
  title: { type: String, required: [true, 'title is required'] },
  url: { type: String, required: [true, 'url is required'] },
  imageUrl: { type: String, required: [true, 'imageUrl is required'] },
  itemType: { type: String, required: [true, 'itemType is required'] },
  bandcampId: { type: String, required: [true, 'bandcampId is required'] },
  bandcampAlbumId: { type: String, default: null },
});

const Release = mongoose.model('Release', releaseSchema);

module.exports = { User, List, Release };
