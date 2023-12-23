import express from 'express'
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Allow JSON payloads up to 13 MB
app.use(express.json({ limit: '13mb' }));

// Allow URL-encoded payloads up to 13 MB
app.use(express.urlencoded({ limit: '13mb', extended: true }));

app.use('/branches/:branch/printing', (req, res, next) => {
  const path = req.path;
  const branch = req.params.branch;
  const url = req.url;
  const target = `http://${branch}-printing-service`;
  console.log(`Proxying ${path} to ${target}`);
  console.log(JSON.stringify({path, branch, url, target}, null, 2));
  createProxyMiddleware({ 
    target, 
    changeOrigin: true,
    pathRewrite: {
      [`^/branches/${branch}/printing`]: ''
    }
  })(req, res, next);
});

app.use('/branches/:branch', (req, res, next) => {
  const path = req.path
  const branch = req.params.branch;
  const url = req.url;
  const target = `http://${branch}-fenix-service`;
  console.log(`Proxying ${path} to ${target}`);
  console.log(JSON.stringify({path, branch, url, target}, null, 2));
  createProxyMiddleware({ 
    target, 
    changeOrigin: true,
    pathRewrite: {
      [`^/branches/${branch}`]: ''
    }
  })(req, res, next);
});

app.use('/printing', (req, res, next) => {
  const path = req.path;
  const target = 'http://desarrollo-printing-service';
  const url = req.url;
  console.log(`Proxying ${path} to ${target}`);
  console.log(JSON.stringify({path, url, target}, null, 2));
  createProxyMiddleware({ 
    target, 
    changeOrigin: true,
    pathRewrite: {
      '^/printing': ''
    }
  })(req, res, next);
});

// Add health check endpoint
app.get('/health', (req, res) => {
  const path = req.path;
  const url = req.url;
  console.log(`Health check /health`);
  console.log(JSON.stringify({path, url}, null, 2));
  res.status(200).send('OK');
});

app.use('/', (req, res, next) => {
  const path = req.path;
  const target = 'http://desarrollo-fenix-service';
  const url = req.url;
  console.log(`Proxying ${path} to ${target}`);
  console.log(JSON.stringify({path, url, target}, null, 2));
  createProxyMiddleware({ 
    target, 
    changeOrigin: true
  })(req, res, next);
});

app.listen(80, () => console.log('API Gateway listening on port 80'));
