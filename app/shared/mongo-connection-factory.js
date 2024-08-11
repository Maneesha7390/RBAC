const mongoose =  require('mongoose')
const dotenv =  require('dotenv')
mongoose.set('debug', true);

module.exports = {
    connect,
    connectionFactory,
    isReady
}


const options = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000, 
  };

let ISREADY = false;
let baseConnectionString;
let connectionString;
const connections = new Map();

function baseConnectionURL(){
    dotenv.config({path: `${__dirname}/../.env`})
    connectionString = process.env.MONGODB_BASE_URL.replace('{userName}', process.env.MONGODB_USER).replace('{password}', process.env.MONGODB_PASSWORD).replace('{DATABASE_NAME}', process.env.DATABASE_NAME);
    return connectionString
}

subscribeToEvents(mongoose.connection, process.env.DATABASE_NAME);


async function connect(){
    try{
        baseConnectionString = baseConnectionURL()
        const cluster_connection = await mongoose.createConnection(baseConnectionString, options)
        subscribeToEvents(cluster_connection, process.env.DATABASE_NAME);
        connections.set('rbac-test', cluster_connection);
    }catch(err){
        console.error(`Error connecting to the database`);
        throw err
    }
}


function isReady() {
    return ISREADY;
  };
  
function connectionFactory() {
    {
      const dbName = 'rbac-test';
      if (connections.has(dbName)) {
        return connections.get(dbName);
      } else {
        baseConnectionString = baseConnectionURL();
        const connection = mongoose.createConnection(baseConnectionString, options);
        subscribeToEvents(connection, dbName);
        connections.set(dbName, connection);
        return connection;
      }
    }
  };

  async function subscribeToEvents(connection, name){
    connection.addListener('connecting', (args)=>{console.info(`Connecting to ${name} database`); ISREADY = false})
    connection.on('connected', (args)=>{console.info(`connected to ${name} database`); ISREADY = true})
    connection.on('disconnected', (args)=>{console.error(`Disconnected fom ${name} database`); ISREADY = false})
    connection.addListener('disconnecting', (args)=>{console.error(`Disconnecting from ${name} database`); ISREADY = false})
    connection.addListener('reconnected', (args)=>{console.error(`Reconnected to ${name} database`); ISREADY = true})
    connection.addListener('error',function(err){
        console.error(err.message)
        ISREADY = false
        throw new Error(`Error Connecting to ${name} database`)
    })
}
