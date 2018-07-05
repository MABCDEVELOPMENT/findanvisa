var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(21094, () => console.log('server start na port 3000'));