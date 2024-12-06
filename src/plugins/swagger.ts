import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

export default fp(async (fastify, opts) => {
    fastify.register(fastifySwagger, {
        swagger: {
            info: {
                title: "Todo Lists API",
                description: "API Documentation for managing todo lists",
                version: "1.0.0",
            },
            host: "localhost:3000",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
        },
    });

    fastify.register(fastifySwaggerUI, {
        routePrefix: "/api-docs",
        staticCSP: true,
        transformSpecificationClone: true,
    });
});