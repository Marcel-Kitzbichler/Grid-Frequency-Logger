const fs = require("fs");

let log = [];
let i = 0;

const yourToken = "YourTokenHere";
const rate = 15000; // in ms

async function getFrequency() {
    try{
        let response = await fetch(`https://api.gridradar.net/query?token=${yourToken}&metric=frequency-ucte-median-1s`)
        let data = await response.json();
    
        if (Array.isArray(data)) {
            const Datapoints = data[0].datapoints;
            currentFrequency = Datapoints[Datapoints.length - 1];
            console.log(currentFrequency);
            log[i] = { frequency: currentFrequency[0], timestamp: currentFrequency[1] };
            i++;
            fs.writeFileSync("Log.json", JSON.stringify(log));
        
            setTimeout(getFrequency, rate);
        
            return;
        }

        console.log("API Error");
    
        setTimeout(getFrequency, rate);
    }
    catch (error){
        console.log(error); 
        setTimeout(getFrequency, rate); return;
    }
    
}
getFrequency();