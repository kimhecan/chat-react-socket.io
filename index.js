const express = require('express'); //서버를 구성해주는 프레임워크
const webSocket = require('./socket');


const app = express(); //실행해주면 app이라는 객체가 생김

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const server = app.listen(8080, () => {
    console.log('server is running on localhost: 8080')
});

webSocket(server);