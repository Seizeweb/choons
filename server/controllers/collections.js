const { List, Release } = require('../models/models.js');
const bandcamp = require('bandcamp-scraper');

const pullRelease = async (ctx) => {
  const releaseUrl = Buffer.from(ctx.params.releaseUrl, 'base64').toString();

  const scrapedRelease = await new Promise((res, rej) => {
    bandcamp.getAlbumInfo(releaseUrl, (err, releaseInfo) => {
      if (err) {
        rej(err);
      } else {
        res(releaseInfo);
      }
    });
  });

  if (scrapedRelease) {
    const url = scrapedRelease.url;

    const writeReleaseProperties = (target) => {
      target.itemType = scrapedRelease.raw.current.type;
      target.artist = scrapedRelease.raw.artist;
      target.title = scrapedRelease.title;
      target.url = scrapedRelease.url;
      target.imageUrl = scrapedRelease.imageUrl;
      target.bandcampId = scrapedRelease.raw.id.toString();

      if (target.itemType === 'track') {
        target.tracks = [
          {
            name: scrapedRelease.title,
            url: scrapedRelease.url,
            duration: new Date(scrapedRelease.raw.trackinfo[0].duration * 1000).toISOString().substr(14, 5),
          },
        ];
        if (scrapedRelease.raw.current.album_id) target.bandcampAlbumId = scrapedRelease.raw.current.album_id.toString();
      } else {
        target.tracks = scrapedRelease.tracks;
        target.bandcampAlbumId = target.bandcampId;
      }
    };

    const releaseInDb = await Release.findOne({ url });

    if (releaseInDb) {
      writeReleaseProperties(releaseInDb);
      await releaseInDb.save();
      ctx.body = releaseInDb;
    } else {
      const release = {};
      writeReleaseProperties(release);
      const newRelease = new Release(release);
      await newRelease.save();
      ctx.body = newRelease;
    }
  }
};

const getUserLists = async (ctx) => {
  const { userId } = ctx.request.body;
  const lists = await List.find({ owner: userId });
  ctx.body = lists;
};

const getListReleases = async (ctx) => {
  const listId = ctx.params.id;
  const list = await List.findOne({ _id: listId }).populate('releases');
  ctx.body = list.releases.reverse();
};

const deleteReleaseFromList = async (ctx) => {
  const { listId, releaseId } = ctx.params;

  const list = await List.findOne({ _id: listId });

  list.releases = list.releases.filter((_id) => _id.toString() !== releaseId);

  const newLastRelease = await Release.findOne({ _id: list.releases[list.releases.length - 1] });

  list.lastReleasesArtwork = newLastRelease.imageUrl;

  await list.save();
  ctx.body = list;
};

const addReleaseToList = async (ctx) => {
  const { listId, releaseId } = ctx.params;

  const list = await List.findOne({ _id: listId });
  const alreadyInList = list.releases.indexOf(releaseId) !== -1;

  if (alreadyInList) {
    console.log('This release is already in the list');
    return (ctx.body = 'This release is already in the list');
  }

  list.releases = [...list.releases, releaseId];
  const release = await Release.findOne({ _id: releaseId });
  list.lastReleasesArtwork = release.imageUrl;
  await list.save();
  console.log(list);
  ctx.body = list;
};

const deleteList = async (ctx) => {
  const { userId } = ctx.request.body;
  const listId = ctx.params.id;
  await List.deleteOne({ _id: listId });
  const lists = await List.find({ owner: userId });
  ctx.body = lists;
};

const createList = async (ctx) => {
  const { name, userId } = ctx.request.body;
  const existingList = await List.findOne({ name });

  if (existingList) {
    ctx.body = `You already created a list with the name ${existingList.name}`;
  } else {
    const list = new List({ name, owner: userId });
    await list.save();
    ctx.body = list;
  }
};

module.exports = {
  pullRelease,
  getUserLists,
  getListReleases,
  deleteReleaseFromList,
  addReleaseToList,
  deleteList,
  createList,
};
