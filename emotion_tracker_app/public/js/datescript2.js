function dateFormatFunc(isoDateString) {

    // Convert the ISO 8601 string to a Date object
    const dateObject = new Date(isoDateString);
    
    // Format the Date object to a string in the desired format
    const formattedDateString = dateObject.toISOString()
      .replace(/T/, ' ')      // Replace T with a space
      .replace(/\..+/, '')    // Remove the decimal fraction of the second
      .substring(0, 19);      // Limit the string to the desired length

      return formattedDateString;
}

//With the help of ChatGPT

function dateFormatDataSetFunc(data){

  data.forEach(item => {
    item.snap.forEach(snapItem => {
      if(snapItem.datetime_created) {
        // Apply the dateFormatFunc to the datetime_created field
        snapItem.datetime_created = dateFormatFunc(snapItem.datetime_created);
      }
    });
  });
  return data; // Return the modified dataset

}

module.exports = {dateFormatFunc, dateFormatDataSetFunc};
