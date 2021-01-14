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
      target.tracks = scrapedRelease.tracks;
      target.artist = scrapedRelease.artist;
      target.title = scrapedRelease.title;
      target.url = scrapedRelease.url;
      target.imageUrl = scrapedRelease.imageUrl;
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
  ctx.body = list.releases;
};

const deleteReleaseFromList = async (ctx) => {
  const listId = ctx.params.listId;
  const releaseId = ctx.params.releaseId;
  ctx.body = `delete release ${releaseId} from list ${listId}`;
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
  const listId = ctx.params.id;
  ctx.body = `delete list ${listId}`;
};

const createList = async (ctx) => {
  const { name, userId } = ctx.request.body;
  const existingList = await List.findOne({ name });

  if (existingList) {
    ctx.body = `You already created a list with the name ${existingList.name}`;
  } else {
    const list = new List({ name, owner: userId });
    await list.save();
    ctx.body = `created list ${list.name} for user ${list.owner}`;
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
