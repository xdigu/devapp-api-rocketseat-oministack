'use strict'

const githuApi = require('../services/githubApi');
const DevModule = require('../modules/DevModule');
const { parseStringToArray } = require('../utils/parser');

module.exports = {
    async index(req, res) {
        const devs = await DevModule.getDevs();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await DevModule.getDevByGithubUsername(github_username);

        if (!dev) {
            const request = await githuApi.get(`/users/${github_username}`);

            const { name = login, avatar_url, bio } = request.data;

            const techsArray = parseStringToArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const dev_data = {
                name,
                github_username,
                avatar_url,
                bio,
                techs: techsArray,
                location
            }

            dev = await DevModule.insertDev(dev_data);
        }

        return res.json(dev);
    },

    async put(req, res) {
        const { name, avatar_url, techs, bio, latitude, longitude } = req.body;
        const { id } = req.params;

        let techsArray;

        if (techs) {
            techsArray = parseStringToArray(techs);
        }

        const dev = await DevModule.getDevByID(id);

        const location = {
            type: 'Point',
            coordinates: [
                longitude || dev.location.cordinates[0],
                latitude || dev.location.cordinates[1]
            ]
        }

        await dev.updateOne({
            $set: {
                name: name || dev.name,
                avatar_url: avatar_url || dev.avatar_url,
                techs: techsArray || dev.techsArray,
                bio: bio || dev.bio,
                location
            }
        });

        return res.json({ message: "User updated" });
    },

    async destroy(req, res) {
        const { id } = req.params;

        const dev = await DevModule.deleteDev(id);

        if (!dev) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ message: "User deleted" });
    }
}
