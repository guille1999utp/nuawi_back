const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.set('port', 3000);
app.use(cors());
app.use(express.json());

//rutas
app.use(require('./rutas/index'));


server.listen(app.get('port'),()=>{
    console.log('escuchando en el puerto ', app.get('port'));
});