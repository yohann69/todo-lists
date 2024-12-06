import { FastifyReply, FastifyRequest } from "fastify";
import { ITodoList } from "../interfaces";

// Simulated in-memory data store
const staticLists: ITodoList[] = [
    {
        id: 'l-1',
        name: 'Dev tasks',
        description: 'Tasks related to development',
        items: [
            { id: 'i-1', name: 'Setup project', status: 'DONE' },
            { id: 'i-2', name: 'Implement API', status: 'IN-PROGRESS' },
        ],
    },
];

export const listLists = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send(staticLists);
};

export const addList = async (request: FastifyRequest, reply: FastifyReply) => {
    const newList: ITodoList = request.body as ITodoList;
    staticLists.push(newList);
    reply.status(201).send(newList);
};

export const updateList = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const updatedData = request.body as Partial<ITodoList>;

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    Object.assign(list, updatedData);
    reply.send(list);
};

export const deleteList = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const index = staticLists.findIndex((l) => l.id === id);

    if (index === -1) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    staticLists.splice(index, 1);
    reply.status(204).send();
};

export const getList = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const list = staticLists.find((l) => l.id === id);

    if (!list) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    reply.send(list);
};