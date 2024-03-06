//with help from ChatGPT

function calculateNumberSnapshotsFunc(data) {
    const totalSnapshots = data.length;
    return totalSnapshots;
    
}

function calculateEmotionAveragesFunc(data) {

    const totalSnapshots = data.length;

    //object to store intensity levels per emotion across all snapshots
    const intensityCounts = {
        ang: [],
        cont: [],
        disg: [],
        enj: [],
        fear: [],
        sad: [],
        surp: []
    };

    //keep running total of intensity per emotion
    const runningTotalIntensity = {
        ang: [],
        cont: [],
        disg: [],
        enj: [],
        fear: [],
        sad: [],
        surp: []
    };

    // Iterate over each snapshot
    data.forEach(snapshot => {
        // Iterate over each emotion
        Object.keys(intensityCounts).forEach(emotion => {
                // Push the length of the array for the corresponding emotion to intensityCounts
                intensityCounts[emotion].push(...snapshot[emotion]); // Using spread operator (...) to concatenate arrays

                // Calculate the running total intensity for the current emotion
                let total = 0;
                intensityCounts[emotion].forEach(intensityObj => {
                    total += intensityObj.intensity;
                    runningTotalIntensity[emotion].push(total);
                });
        });
    });

    // Initialize an object to store the final count for each emotion
    const finalIntensityCount = {};

    // Iterate over each emotion
    Object.keys(runningTotalIntensity).forEach(emotion => {
        // Get the last element of the array for the current emotion
        const finalCount = runningTotalIntensity[emotion][runningTotalIntensity[emotion].length - 1];

        // Store the final count for the current emotion in the finalIntensityCount object
        finalIntensityCount[emotion] = finalCount;
    });

    console.log("Final intensity count per emotion:", finalIntensityCount);

   // Initialize an object to store the average intensity per emotion
   const averageIntensity = {};

   // Iterate over each emotion in the finalIntensityCount object
   Object.keys(finalIntensityCount).forEach(emotion => {
       // Calculate the average intensity for the current emotion
       const average = finalIntensityCount[emotion] / totalSnapshots;

       // Round the average intensity to 2 decimal places
       const roundedAverage = Math.round(average);

       // Store the average intensity for the current emotion in the averageIntensity object
       averageIntensity[emotion] = roundedAverage;
   });

   console.log("AVERAGES PER EMOTION ARE:",averageIntensity);

   return averageIntensity;

}

function obtainTop3TriggersFunc(data) {


    const triggerCounts = {}; // Object to store trigger counts
    
    // Iterate through each snapshot object
    data.forEach(snapshot => {
        // Iterate through each trigger in the current snapshot
        snapshot.trig.forEach(trigger => {
            // Extract trigger value
            const triggerValue = trigger.name;
            // Increment trigger count
            triggerCounts[triggerValue] = (triggerCounts[triggerValue] || 0) + 1;
        });
    });
    
    // Convert trigger counts to an array of objects for easier sorting
    const triggerCountsArray = Object.entries(triggerCounts).map(([trigger, count]) => ({ trigger, count }));
    
    // Sort trigger counts array in descending order of count
    triggerCountsArray.sort((a, b) => b.count - a.count);
    
    // Extract top 3 triggers
    const topTriggers = triggerCountsArray.slice(0, 3);
    
    console.log("TOP TRIGGERS:",topTriggers);
    return topTriggers;
}

function getTopTriggerFunc(topTriggers, position){

return topTriggers[position].trigger;

}


function filterSnapshotsByTriggerFunc(data, topTrigger) {

    const snapshotsWithTopTrigger = data.filter(snapshot => {
        // Extract and map triggers (transform each trigger object into its value) for current snapshot
        const snapshotTriggers = snapshot.trig.map(trigger => trigger.name);
        // Check if any trigger in the current snapshot matches the top trigger
        return snapshotTriggers.includes(topTrigger);
    });

    return snapshotsWithTopTrigger;

}

function calculateDifferencesFunc(averageEmotions, averagesTrigger){

    const difference = {};

    // Iterate over each emotion in the triggerEmotions object
    Object.keys(averagesTrigger).forEach(emotion => {
        // Calculate the difference between the trigger emotion value and the average emotion value
        const emotionDifference = ((averagesTrigger[emotion] - averageEmotions[emotion]) / averageEmotions[emotion]) * 100;
        // Store the difference in the difference object
        const roundedAverage = Math.round(emotionDifference);
        difference[emotion] = roundedAverage;
    });

    console.log("AVERAGES DIFFERENCE:",difference);
    return difference;
}

function formatValuesFunc(data) {
    const formattedData = {};
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (value > 0) {
                formattedData[key] = `${'↑'}${value}%`;
        
            } else if (value < 0) {
                formattedData[key] = `${'↓'}${(-value)}%`;
            } else {
                formattedData[key] = 'no change';
            }
        }
    }
    return formattedData;
}


module.exports = {
    getTopTriggerFunc,
    calculateNumberSnapshotsFunc, 
    calculateEmotionAveragesFunc, 
    obtainTop3TriggersFunc, 
    filterSnapshotsByTriggerFunc,
    calculateDifferencesFunc,
    formatValuesFunc};
