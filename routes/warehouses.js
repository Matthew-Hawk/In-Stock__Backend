// libraries
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// post /warehouses => add new warehouse to warehouses data
router.post("/", (req, res) => {
    // get new video data from request body
    const { name, address, city, county, contactName, contactPosition, contactPhone, contactEmail } = req.body;
    const newWarehouse =   {
        "id": "2922c286-16cd-4d43-ab98-c79f698aeab0",
        "name": "Manhattan",
        "address": "503 Broadway",
        "city": "New York",
        "country": "USA",
        "contact": {
            "name": "Parmin Aujla",
            "position": "Warehouse Manager",
            "phone": "+1 (646) 123-1234",
            "email": "paujla@instock.com"
        }
    };
    // get current array of video data and push new video to existing array
    const videoData = JSON.parse(fs.readFileSync("./data/videos.json"));
    videoData.push(newVideo);
    // write the updated video data array back to json file
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData));
    // send back the newly added video
    res.json(newVideo);
});

exports.modules = router;