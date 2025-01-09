import {FastifyReply, FastifyRequest} from "fastify";
import {ITodoItem, ITodoList} from "../interfaces";

// Simulated in-memory database
const staticLists: ITodoList[] = [];

export async function listLists(request: FastifyRequest, reply: FastifyReply) {
    console.log('DB status', this.level.listsdb.status)
    const listsIter = this.level.listsdb.iterator()

    const result: ITodoList[] = []
    for await (const [key, value] of listsIter) {
        result.push(JSON.parse(value))
    }
    reply.send(result)
}

export async function addList(request: FastifyRequest, reply: FastifyReply) {
    const list = request.body as ITodoList
    const result = await this.level.listsdb.put(
        list.id.toString(), JSON.stringify(list)
    )
    reply.send(result)
}

export const updateList = async (request: FastifyRequest, reply: FastifyReply) => {
    const {id} = request.params as { id: string };
    const updatedData = request.body as Partial<ITodoList>;

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({error: 'List not found'});
        return;
    }

    Object.assign(list, updatedData);
    reply.send(list);
};

export const addListItem = async (request: FastifyRequest, reply: FastifyReply) => {
    const {id} = request.params as { id: string };
    const newItem: ITodoItem = request.body as ITodoItem;

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({error: 'List not found'});
        return;
    }

    list.items.push(newItem);
    reply.status(201).send(newItem);
};

export const deleteListItem = async (request: FastifyRequest, reply: FastifyReply) => {
    const {id, itemId} = request.params as { id: string; itemId: string };

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({error: 'List not found'});
        return;
    }

    const itemIndex = list.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
        reply.status(404).send({error: 'Item not found'});
        return;
    }

    list.items.splice(itemIndex, 1);
    reply.status(204).send();
};

export const updateListItem = async (request: FastifyRequest, reply: FastifyReply) => {
    const {id, itemId} = request.params as { id: string; itemId: string };
    const updatedData = request.body as Partial<ITodoItem>;

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({error: 'List not found'});
        return;
    }

    const item = list.items.find((i) => i.id === itemId);
    if (!item) {
        reply.status(404).send({error: 'Item not found'});
        return;
    }

    Object.assign(item, updatedData);
    reply.send(item);
};

export const markListAsDone = async (request: FastifyRequest, reply: FastifyReply) => {
    const {id} = request.params as { id: string };

    const list = staticLists.find((l) => l.id === id);
    if (!list) {
        reply.status(404).send({error: 'List not found'});
        return;
    }

    list.status = 'DONE';
    reply.send(list);
};