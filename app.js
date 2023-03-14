const http = require('http');
const routes = require('./routes.js')

const server = http.createServer(routes.handler)  

console.log(routes.text)
server.listen(3000) 