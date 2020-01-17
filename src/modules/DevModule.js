'use strict'

const Dev = require('../models/DevModel');

module.exports = {
  /**
   * Get a list o Devs
   */
  async getDevs() {
    return await Dev.find();
  },

  /**
   * Get a single dev by github username
   * 
   * @param {String} github_username 
   */
  async getDevByGithubUsername(github_username) {
    const dev = await Dev.findOne({ github_username });

    return dev;
  },

  /**
   * Get a single dev by devID
   * 
   * @param {String} devID 
   */
  async getDevByID(devID) {
    const dev = await Dev.findById(devID);

    return dev;
  },

  async insertDev(dev_data) {
    const dev = await Dev.create(dev_data);

    return dev;
  },

  updateDev() {

  },

  async deleteDev(devID) {
    const dev = await Dev.findByIdAndDelete(devID);

    return dev;
  }

}
