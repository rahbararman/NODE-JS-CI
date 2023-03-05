const { getAllLaunches, addLaunch, existsLaunch, abortLaunch } = require("../../models/launches.model");

async function HttpGetAllLaunches(req, res){
    res.status(200).json(await getAllLaunches());
}

async function HttpAbortLaunch(req, res){
    const id = Number(req.params.id);
    const exists = await existsLaunch(id);
    if (!exists){
        return res.status(404).json({
            error: 'not found'
        })
    }
    
    aborted = await abortLaunch(id);
    res.status(200).json(aborted);
}

async function HttpPostLaunch(req, res){
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);


    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "missing properties!"
        });
    }

    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "invalid date format!"
        })
    }

    await addLaunch(launch);
    res.status(201).json(launch);    
}

module.exports = {
    HttpGetAllLaunches: HttpGetAllLaunches,
    HttpPostLaunch: HttpPostLaunch,
    HttpAbortLaunch: HttpAbortLaunch
}