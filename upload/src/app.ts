import express from 'express';
import multer from 'multer';
import path from 'path';

const folder = __dirname + '/uploads'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const app = express();

// Middleware to parse json
app.use(express.json());

// Routes

console.log({folder})

// Routes
app.post('/upload', upload.single('file'), (req: express.Request, res: express.Response) => {
  res.send('File uploaded successfully');
});

app.get('/health', (req, res) => res.status(200).send('OK'))

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

