const fs = require("fs");

let log = [];
let i = 0;

let yourToken = "yourToken";

async function getFrequency() {
    let response = await fetch(`https://api.gridradar.net/query?token=${yourToken}&metric=frequency-ucte-median-1s`);
    let data = await response.json();
    
    if (Array.isArray(data)) {
        const Datapoints = data[0].datapoints;
        currentFrequency = Datapoints[Datapoints.length - 1];
        console.log(currentFrequency);
        log[i] = { frequency: currentFrequency[0], timestamp: currentFrequency[1] };
        i++;
        fs.writeFileSync("Log.json", JSON.stringify(log));
        
        setTimeout(getFrequency, 15000);
        
        return;
    }

    console.log("API Error");
    
    setTimeout(getFrequency, 15000);
}
getFrequency();