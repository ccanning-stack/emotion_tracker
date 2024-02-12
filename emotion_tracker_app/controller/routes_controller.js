//This should contain business logic and data manipulation code

const axios = require('axios');

exports.getMakeAPIRequest = async (req, res) => {

    const endpoint = 'http://localhost:3002/';

    try {
            const response = await axios.get(endpoint)
            console.log("API Endpoint returned");
            console.log(response.data);
            res.json(response.data);
           
        } catch(error) {
            console.log("ERROR connecting to API");
            console.log(error);
            res.status(500).json({error: "Failed to fetch data from API"});
        };

}
