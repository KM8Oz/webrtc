exports.init = ()=>{
const { PeerServer } = require('peer');
const colors = require('colors')

// =======

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
const peerServer = PeerServer({
  debug:true,
  port: 9000,
  concurrent_limit:9000,
  proxied: true
});
peerServer.on('connection', (client) => { 
  console.log(colors.blue(client.id));
  // peerServer.on('stream',(data)=>{
  //   console.log(data);
  // })
});
peerServer.on('disconnect', (client) => { 
  console.log(colors.blue(client.id));
});
}