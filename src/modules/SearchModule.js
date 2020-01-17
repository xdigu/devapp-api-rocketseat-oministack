'use strict'

const Dev = require('../models/DevModel');

module.exports = {
  async searchDevsByLocationAndTechs(techsArray, latitude, longitude) {
    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
            maxDistance: 10000
          }
        }
      }
    });

    return devs;
  }
}
