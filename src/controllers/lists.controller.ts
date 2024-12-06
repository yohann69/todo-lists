import { FastifyReply, FastifyRequest } from "fastify";
import { ITodoList, ITodoItem } from "../interfaces";

// Simulated in-memory database
const staticLists: ITodoList[] = [];

export const listLists = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send(staticLists);
};

export const addList = async (
    request: FastifyRequest<{ Body: Omit<ITodoList, 'items' | 'status'> }>,
    reply: FastifyReply
) => {
    const newList: ITodoList = {
        ...request.body,
        items: [],
        status: 'IN-PROGRESS',
    };

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

export const addListItem = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const newItem: ITodoItem = request.body as ITodoItem;

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    list.items.push(newItem);
    reply.status(201).send(newItem);
};

export const deleteListItem = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, itemId } = request.params as { id: string; itemId: string };

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    const itemIndex = list.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
        reply.status(404).send({ error: 'Item not found' });
        return;
    }

    list.items.splice(itemIndex, 1);
    reply.status(204).send();
};

export const updateListItem = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, itemId } = request.params as { id: string; itemId: string };
    const updatedData = request.body as Partial<ITodoItem>;

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    const item = list.items.find((i) => i.id === itemId);
    if (!item) {
        reply.status(404).send({ error: 'Item not found' });
        return;
    }

    Object.assign(item, updatedData);
    reply.send(item);
};

export const markListAsDone = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({ error: 'List not found' });
        return;
    }

    list.status = 'DONE';
    reply.send(list);
};