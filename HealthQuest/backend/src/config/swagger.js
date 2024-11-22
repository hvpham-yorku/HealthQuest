const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'HealthQuest API',
            version: '1.0.0',
            description: 'API documentation for HealthQuest backend.',
        },
        components: {
            schemas: {
                DatabaseConnection: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            description: 'Indicates whether the database connection was successful or failed.',
                            example: 'MongoDB connected successfully',
                        },
                        error: {
                            type: 'string',
                            description: 'Error message in case of a connection failure.',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // Adjust path as needed
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
