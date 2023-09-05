import { Application } from "express";

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


//Swagger integration
const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Postspace API with Swagger",
          version: "0.1.0",
          description:
              "This is a API documentation for Postspace application made with Express and documented with Swagger",
      },
      servers: [
          {
              url: process.env.API_URL
          },
      ],
      components: {
          securitySchemes: {
              apiKeyAuth: {
                  type: 'apiKey',
                  in: 'header',
                  name: "Authorization",
                  bearerFormat: "JWT",
              }
          }
      },
      security: [{
          apiKeyAuth: []
      }]
  },
  apis: ["./src/components/**/*.ts"],
};

export const swaeger=(app:Application)=>{
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
}