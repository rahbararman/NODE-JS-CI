const express = require('express');
const { HttpGetAllLaunches, HttpPostLaunch, HttpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', HttpGetAllLaunches);
launchesRouter.post('/', HttpPostLaunch);
launchesRouter.delete('/:id', HttpAbortLaunch)

module.exports = {
    launchesRouter: launchesRouter
}