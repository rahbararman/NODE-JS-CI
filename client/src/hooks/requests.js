async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch('/planets');
  return await response.json();
}

// TODO: Once API is ready.
// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch('/launches');
  const allLaunches = await response.json();
  return allLaunches.sort((a,b)=>{
    return a.flightNumber - b.flightNumber;
  })
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    
    return await fetch("/launches",{
      method: "post",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  catch(e){
    return {
      ok: false
    }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {

  try {
    return await fetch(`/launches/${id}`,{
      method: "delete"
    });
  }
  catch(e){
    return {
      ok: false
    };
  }
  
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};