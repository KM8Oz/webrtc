const app = require('express')()
const server = require('http').Server(app)
require('./socketio').init(server)
// const redisAdapter = require('socket.io-redis');
// io.adapter(redisAdapter({ host: '188.166.180.35', port: 3001 }));
const ws = require('express-ws')(app)
const colors = require('colors')
const fs = require('fs')
app.set('view engine', 'ejs')
app.use(require('express').static('public'))
const uuid = require('node-uuid')

app.get('/', (req, res) => {
  res.redirect(`/${uuid.v4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})
require('./ws').init(app)


server.listen(3000,()=>{
  console.log(colors.yellow('server started on port:'),colors.bgGreen(server._connectionKey))
})

require('./peerjs-server').init()

var Turn = require('node-turn');
const { transcode } = require('buffer')

var turnserver = new Turn({
  // set options
  //debugLevel:'ALL',
  authMech: 'long-term',
  realm:'dupdatabase',
  credentials: {
    test: "test@dup"
  }
});
turnserver.addUser('test','test@dup')
turnserver.start();
require('./rtmp').rtmp()
app.listen(3002,()=>{
  console.log('app in port:',colors.bgGreen(3002));
})
var stun = require('stunsrv');
const { v4 } = require('uuid')
var stunserver = stun.createServer();
stunserver.setAddress0("127.0.0.1");
stunserver.setAddress1("127.0.0.2");
stunserver.setPort0(1739);
stunserver.setPort1(1735);
stunserver.setResponseAddress0("webrtc.dup.ma:1739");
stunserver.setResponseAddress1("webrtc.dup.ma:1735");
stunserver.listen();