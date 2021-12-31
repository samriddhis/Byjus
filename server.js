const bodyParser = require('body-parser');
const express = require('express');


const cors = require('cors');
//create app
const app = express();

//parser request of content-type application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cors());


const dbConfig = require('./config/database.config');
const mongose = require('mongoose');


mongose.Promise = global.Promise;


mongose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("successfully connected to database");
}).catch((error) => {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit();
})

//define the simple quote
app.get('/', (req, res) => {
    res.json({
        "message": 'welcome to form database application.'
    })
})

//require formDtata routes
require("./app/routes/formData.routes.js")(app);

//listen for request
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})