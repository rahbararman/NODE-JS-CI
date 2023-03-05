const launchesModel = require('./launches.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
//     flightNumber: 100,
//     mission: 'Arman-110',
//     rocket: 'Ana-220',
//     launchDate: new Date('December 27, 2030'),
//     target: 'Kepler',
//     customer: ['Semnan'],
//     upcoming: true,
//     success: true
// }

// saveLaunch(launch)

async function getAllLaunches(){
    return await launchesModel.find({},{
        '_id': 0 , '__v':0
    })
}

async function saveLaunch(launch){
    await launchesModel.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function addLaunch(launch){
    
    launch.flightNumber = await getLatestFlightNumber() + 1;
    launch.customer = ['Tehran'];
    launch.upcoming = true;
    launch.success = true;
    await saveLaunch(launch)
}

async function existsLaunch(id){
    return await launchesModel.findOne({
        flightNumber: id
    });
}

async function abortLaunch(id){
    // const aborted = launches.get(id);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
    const aborted = await launchesModel.updateOne({
        flightNumber: id
    }, {
        upcoming: false,
        success: false
    });
    return aborted.modifiedCount === 1;;


}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesModel.findOne()
        .sort('-flightNumber')
    if (!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}



module.exports = {
    getAllLaunches: getAllLaunches,
    addLaunch: addLaunch,
    existsLaunch: existsLaunch,
    abortLaunch: abortLaunch
}
