import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Welcome to the Todo API' };
  });
};

export default root;