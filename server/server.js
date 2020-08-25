
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
const pino = require('express-pino-logger')();
// const db = require('./db.js');
const http = require('http').createServer(app)
const PORT =  3001
const path = require('path')
const socketServer = require('./socketServer').newSocketServer

socketServer(http)

// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2'],
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(express.static('build'));
app.get('*', (req, res) => res.sendFile(path.resolve('./public/index.html')))

http.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`)
});


