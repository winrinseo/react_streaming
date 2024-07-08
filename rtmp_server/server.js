const NodeMediaServer = require('node-media-server');
const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const appPort = 8888

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: path.join(__dirname, 'ffmpeg/bin/ffmpeg.exe'), // FFmpeg 경로 설정
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

var nms = new NodeMediaServer(config);

const activeStreams = new Map();

nms.on('postPublish', (id, StreamPath, args) => {
    //stream
    activeStreams.set(StreamPath , 0);
    console.log(`[postPublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  activeStreams.delete(StreamPath);
  console.log(`[donePublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});


nms.run();

console.log("ffmpeg 경로 : " , path.join(__dirname, 'ffmpeg/bin/ffmpeg'))

app.get('/api/check-stream', (req, res) => {
    const streamKey = req.query.streamKey;
    const streamExists = activeStreams.has('/live/' + streamKey)
    res.json({ exists: streamExists });
  });

  app.listen(appPort, () => {
    console.log(`Express server is running on port ${appPort}`);
  });