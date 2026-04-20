const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/video', async (req, res) => {
    try {
        const url = req.query.url;
        // Fetch the video on the SERVER side
        res.header('Content-Type', 'video/mp4');
        ytdl(url, { quality: 'highestvideo' }).pipe(res);
    } catch (e) {
        res.status(500).send("Source restricted.");
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Data Research Portal</h1><input id="v" placeholder="URL"><button onclick="window.location=\'/video?url=\'+document.getElementById(\'v\').value">Analyze</button>');
});

app.listen(process.env.PORT || 8080);
const express = require('express');
const Unblocker = require('unblocker');
const app = express();

// The prefix is the 'disguise' part of the URL
const unblocker = new Unblocker({prefix: '/research-data/'});

// Use the unblocker as middleware
app.use(unblocker);

// Basic home page disguise
app.get('/', (req, res) => {
    res.send(`
        <h1>Academic Resource Portal</h1>
        <p>Enter the URL of the research database you wish to mirror:</p>
        <input type="text" id="url" placeholder="https://example.com" style="width:300px;">
        <button onclick="window.location.href='/research-data/' + document.getElementById('url').value">Access Database</button>
    `);
});

// Port for hosting - use process.env.PORT for sites like Render/Railway
const port = process.env.PORT || 8080;
app.listen(port).on('upgrade', unblocker.onUpgrade); 

console.log(`Proxy running at http://localhost:${port}`);
