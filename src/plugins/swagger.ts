import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import JsonSchemas from '../schemas/all.json'

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

    fastify.addSchema({
        $id: 'ITodoList',
        ...JsonSchemas.definitions.ITodoList
    })

    fastify.addSchema({
        $id: 'IUser',
        ...JsonSchemas.definitions.IUser
    })

    fastify.addSchema({
        $id: 'ITodoItem',
        ...JsonSchemas.definitions.ITodoItem
    })

});
