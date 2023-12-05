const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
        }
    },
    apis: ['routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app,port) => {
    app.use('/api-docs', express.static('node_modules/swagger-ui-dist'));
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log('Swagger UI iniciado en "/api-docs" y app en "/" en el puerto ' + port )
}

module.exports = {swaggerDocs};