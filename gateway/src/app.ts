import express from 'express'
import  { createProxyMiddleware } from 'http-proxy-middleware'

const app = express();

// Allow JSON payloads up to 13 MB
// app.use(express.json({ limit: '13mb' }));

// Allow URL-encoded payloads up to 13 MB
// app.use(express.urlencoded({ limit: '13mb', extended: true }));

app.use('/', createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
}))

app.listen(80, () => console.log('API Gateway listening on port 80'));
