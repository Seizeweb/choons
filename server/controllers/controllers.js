const { List, Release } = require('../models/models.js');
const bandcamp = require('bandcamp-scraper');

const pullRelease = async (ctx) => {
  const releaseUrl = Buffer.from(ctx.params.releaseUrl, 'base64').toString();

  const result = await new Promise((res, rej) => {
    bandcamp.getAlbumInfo(releaseUrl, (err, releaseInfo) => {
      if (err) {
        rej(err);
      } else {
        // TODO: write the release in DB here
        res(releaseInfo);
      }
    });
  });

  ctx.body = result;
};

const getUserLists = async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'Get User lists';
};

module.exports = { pullRelease, getUserLists };
