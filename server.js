const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Added this line

const app = express();
const port = 3001;

app.use(cors()); // Added this line
app.use(express.json()); // Added this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Added this line to parse URL-encoded bodies

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const roomId = req.query.roomId; // Read roomId from query parameters
        if (!roomId) {
            return cb(new Error('roomId is required'));
        }
        console.log(`Received roomId: ${roomId}`);
        
        const dir = path.join(__dirname, 'uploads', roomId, 'pdf');
        console.log(`Creating directory: ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    console.log(`Received file: ${req.file.originalname}`);
    res.json({ fileName: req.file.originalname, message: 'File uploaded successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
