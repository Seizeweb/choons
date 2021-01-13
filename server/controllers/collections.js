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
  ctx.body = 'Get User lists';
};

const getListReleases = async (ctx) => {
  const listId = ctx.params.id;
  ctx.body = `Get releases for list ${listId}`;
};

const deleteReleaseFromList = async (ctx) => {
  const listId = ctx.params.listId;
  const releaseId = ctx.params.releaseId;
  ctx.body = `delete release ${releaseId} from list ${listId}`;
};

const addReleaseToList = async (ctx) => {
  const listId = ctx.params.listId;
  const releaseId = ctx.params.releaseId;
  ctx.body = `add release ${releaseId} to list ${listId}`;
};

const deleteList = async (ctx) => {
  const listId = ctx.params.id;
  ctx.body = `delete list ${listId}`;
};

module.exports = {
  pullRelease,
  getUserLists,
  getListReleases,
  deleteReleaseFromList,
  addReleaseToList,
  deleteList,
};
