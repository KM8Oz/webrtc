

const socket = io('webrtc.dup.ma',{
  transports: ['websocket'],
transportOptions: {
  polling: {
     extraHeaders: {
        'authorization': '',
        'user-id' : ''
     }
  }}})
  
  const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
const echoSocketUrl = socketProtocol + '//webrtc.dup.ma/stream'

const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer({
  host:'turn.dup.ma',
  port:'443',
  secure:true,
  debug:4,
  config:{ 'iceServers': [ 
       {url:'stun:webrtc.dup.ma:1739'},
    {
        url: 'turn:webrtc.dup.ma:3478',
        credential: 'test',
        username: 'test@dup'
    },
  
] }
})


const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

var front = document.querySelector('#front').attributes.checked
function checking(){
  front = document.querySelector('front').attributes.checked
}
var ws,pperid;
function  videoDataHandler1(event) {
  //this.isUploading = true;
  let reader = new FileReader();
  reader.readAsArrayBuffer(event.data);
  if (ws) {
      reader.onloadend = () => {
       // ws.send(reader.result,pperid);
      };
  }
}
function  videoDataHandler2(event) {
  //this.isUploading = true;
  let reader = new FileReader();
  reader.readAsArrayBuffer(event.data);
  if (ws) {
      reader.onloadend = () => {
         // ws.send(reader.result);
      };
  }
}
// navigator.mediaDevices.ondevicechange((evt)=>{
//   console.log(evt);
// })
getUserMedia(function (err,stream){
  if(err){
    console.log(err);
  }
  console.log('camera opened');

  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  ws = new WebSocket(`${echoSocketUrl}/?peerid=${id}`);
  pperid = id;
  console.log('open event');
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
    var options = {
      mimeType: "video/webm",
      videoBitsPerSecond: 8000000,
      audioBitsPerSecond: 64000
  };
    mediaRecorder1 = new MediaRecorder(stream,options)
    mediaRecorder2 = new MediaRecorder(userVideoStream,options)
    mediaRecorder1.ondataavailable = videoDataHandler1
    mediaRecorder2.ondataavailable = videoDataHandler2
        mediaRecorder1.start(1000);
        mediaRecorder2.start(1000)
    
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}