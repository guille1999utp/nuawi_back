const express = require('express');
const cors = require('cors');
const app = express();
require('./src/database');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const { swaggerDocs } = require('./swagger/swagger');
//rutas
app.use(require('./routes/index'));



app.listen(PORT,()=>{
    swaggerDocs(app);
});