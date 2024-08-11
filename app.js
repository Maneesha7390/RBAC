const dotenv = require('dotenv')
dotenv.config({path: `${__dirname}/.env`})
const express= require('express') 
require('express-async-errors')
const init = require('./app/startup/init');

const app =express()
const PORT = process.env.PORT || 3000

startup().then(() => {
    app.listen(PORT, () => {
        console.info(`Server is running on port ${PORT}`);
    });
}, (err) => {
    console.error(`Error starting the service on port ${PORT}`);
    process.exit(0);
});
async function startup() {
    try {
        await init(app);
        await require('./app/startup/portal')(app);
    } catch (err) {
        console.error('Error during startup:', err);
        throw err;
    }
}