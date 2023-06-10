import { type SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tortinchis",
      version: "1.0.0",
      description: "This is a simple CRUD API",
      license: {
        name: "MIT",
        url: "http://mit.com",
      },
      contact: {
        name: "Daniel Fernandez",
        url: "https://github.com/dfernandezcode",
        email: "dfernandez@example.com",
      },
    },
    server: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
};
