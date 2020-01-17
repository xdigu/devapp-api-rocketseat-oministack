'use strict'

const DevModule = require('../modules/SearchModule');
const { parseStringToArray } = require('../utils/parser');

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringToArray(techs);

        const devs = await DevModule.searchDevsByLocationAndTechs(techsArray, latitude, longitude);

        return res.json(devs);
    }
}
