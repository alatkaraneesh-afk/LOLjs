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
