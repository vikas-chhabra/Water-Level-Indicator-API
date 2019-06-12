// Imports used
const http = require('http');
const app = require('./app');

// declare port
const port = process.env.PORT || 3008;

// make  a server
const server = http.createServer(app);

// listen at the port of server
server.listen(port,_=>{
    console.log("Sever is running at : ",port);
})

// export the server
module.exports = server;