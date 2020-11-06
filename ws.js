const ffmpeg = require('fluent-ffmpeg')
const tors = require('to-readable-stream')
const tou8 = require('buffer-to-uint8array')
const Stream = require('stream')
const colors = require('colors')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn
async function convert (funct,data){
    return await funct(data)
}
 var peers={}
exports.init = (app)=>{
app.ws('/stream',function(ws,req){
      var ops = [
        '-i','pipe:0',
        '-c:v', 'libx264', '-preset', 'ultrafast', 
        //'-tune', 'zerolatency',  // video codec config: low latency, adaptive bitrate
        // '-b:v', '700k',
        //,'-s', '720x680',
        '-pix_fmt', 'yuv420p',
         //'-acodec','rawvideo', '-vcodec', 'rawvideo', '-f' ,'v4l2',
       // '-c:a', 'aac', '-ar', '44100', '-b:a', '64k', // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
       //'-y', //force to overwrite
       // '-use_wallclock_as_timestamps', '1', // used for audio sync
        //'-async', '1', // used for audio sync
       // '-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
        //'-strict', 'experimental', 
        //'-bufsize', '1000',
       //'-f', 'mp4', 
       '-f', 'flv',
         `rtmp://webrtc.dup.ma:1935/live/model`
      ];
      var rtmp =  spawn("ffmpeg",ops);
  
console.log('socket', req.query.peerid);
ws.on('message',function(track,pperid){
    console.log(track,pperid);
    rtmp.stdin.write(track)
})
})
}