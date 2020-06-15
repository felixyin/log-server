// var socket = io('http://139.224.1.36:3000');
var socket =// io();
io('ws://139.224.1.36:3001', {transports: ['polling','websocket']});
    // io('ws://139.224.1.36:3001', {
    //     'force new connection': true,  // 是否允许建立新的连接
    //     reconnect: true,           // 是否允许重连
    //     'reconnection delay': 200, // 重连时间间隔 毫秒
    //     'max reconnection attempts': 10, // 重连次数上限
    //     // transports: ['websocket']
    // });

//
// socket.on('disconnect', function () {
//     console.log('disconnect');
//     socket.socket.reconnect();
// });
// socket.on('reconnect', function (transport_type, reconnectionAttempts) {
//     console.log('reconnect*********', transport_type, reconnectionAttempts);
// });

var addEvent = function (elemId, child) {
    var dest = document.getElementById(elemId);
    dest.appendChild(child);
    dest.scrollTop = dest.scrollHeight;
};

socket.on('event', function (entry) {
    var el = document.createElement('div');
    var content = ['<br/>', 'url:', entry.url, ',browser:', entry.browser, ',os:',
        entry.os, ',referrer:', entry.referrer, '-->', '<br/>',
        entry.logBody.level, ':', entry.logBody.message].join('');
    el.innerHTML = content;//JSON.stringify(entry., null, 2);
    addEvent('logs-events', el);
});

socket.on('error1', function (entry) {
    var el = document.createElement('div');
    var content = ['<br/>', 'url:', entry.url, ',browser:', entry.browser, ',os:',
        entry.os, ',referrer:', entry.referrer, '-->', '<br/>',
        entry.logBody.level, ' : ', entry.logBody.message, ', stack: ', entry.logBody.stack].join('');
    el.innerHTML = content;//JSON.stringify(error, null, 2);
    addEvent('errors-events', el);
});
//
// socket.on('state', function (state) {
//     for (var key in state) {
//         var el = document.getElementById(key);
//         if (el) {
//             el.textContent = JSON.stringify(state[key], null, 2);
//         }
//     }
// });
