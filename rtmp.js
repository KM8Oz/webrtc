const NodeMediaServer = require('node-media-server');
exports.rtmp = ()=>{
const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 6000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        //dash: true,
        //dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
    nms.run();
    nms.on('preConnect', (id, args) => {
      console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
      // let session = nms.getSession(id);
      // session.reject();
    });
    
    nms.on('postConnect', (id, args) => {
      console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });
    
    nms.on('doneConnect', (id, args) => {
      console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });
    
    nms.on('prePublish', (id, StreamPath, args) => {
      console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      // let session = nms.getSession(id);
      // session.reject();
    });
    
    nms.on('postPublish', (id, StreamPath, args) => {
      console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
    
    nms.on('donePublish', (id, StreamPath, args) => {
      console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
    
    nms.on('prePlay', (id, StreamPath, args) => {
      console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      // let session = nms.getSession(id);
      // session.reject();
    });
    
    nms.on('postPlay', (id, StreamPath, args) => {
      console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
    
    nms.on('donePlay', (id, StreamPath, args) => {
      console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
}