"use strict";
const port = process.env.PORT || 3001;
const serverSecret = "bN525JGfxoQ561o3K58Ng6E6vnY3ROd9";

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
var http = require('http').Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('static'));
// app.use(express.static('node_modules'));

//设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

const server = app.listen(port, () => {
    console.log('Listening on *:' + port);
});

const state = {};

const io = require('socket.io')(http);
io.on('connection', (socket) => {
    // console.log('connection')

    // socket.emit('state', state);

    // socket.on('log', function (content) {
    //     const parsed = JSON.parse(content);
    //     emitLog(parsed);
    // });
    // socket.on('disconnect', function() {
    //     console.log('Socket disconnected');
    // });
});

var emitLog = function (body) {
    // console.log(logBody)
    // console.log(logBody.type === 'event')
    if (body.logBody.type === 'event') {
        io.emit('event', body);
    } else if (body.logBody.type === 'error') {
        io.emit('error1', body);
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/log', (req, res) => {
    let secret = req.body.secret;
    if (secret !== serverSecret) {
        res.status(401).send('Wrong secret\n');
        return
    }
    var myBody = {
        secret: req.body.secret,
        browser: req.body.browser,
        os: req.body.os,
        flash: req.body.flash,
        url: req.body.url,
        resolution: req.body.resolution,
        referrer: req.body.referrer,
        logBody: JSON.parse(req.body.logBody)
    };

    console.log(myBody)
    // req.body.logBody = JSON.parse(req.body.logBody);
    emitLog(myBody);
    res.send('Log received\n');
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/views/test.html');
})
