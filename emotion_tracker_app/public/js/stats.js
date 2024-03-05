//with help from ChatGPT

function calculateStatsFunc(data) {

    const totalSnapshots = data.length;
    console.log("Total number of snapshots:", totalSnapshots);

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
       const roundedAverage = parseFloat(average.toFixed(2));

       // Store the average intensity for the current emotion in the averageIntensity object
       averageIntensity[emotion] = roundedAverage;
   });


   console.log( averageIntensity);

   return averageIntensity;

}

module.exports = calculateStatsFunc;