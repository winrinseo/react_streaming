const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');

const app = express();
const PORT = 4000;

const STREAM_KEYS = {
  'tjdnfls1234': 'mystream',
  user2: 'streamkey2',
  user3: 'streamkey3'
};

// 프록시 미들웨어 설정
app.use('/live/:user/:file', (req, res, next) => {
  const user = req.params.user;
  const file = req.params.file;

  if (!STREAM_KEYS[user]) {
    return res.status(400).send('Invalid user');
  }
//   console.log(user , file)

  const streamKey = STREAM_KEYS[user];
  const targetUrl = `http://localhost:8000/live/${streamKey}/${file}`;

  http.get(targetUrl, (proxyRes) => {
    proxyRes.pipe(res, { end: true });
  }).on('error', (e) => {
    res.status(500).send('Error proxying request');
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
