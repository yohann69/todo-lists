import {FastifyReply, FastifyRequest} from "fastify";
import {ITodoItem, ITodoList} from "../interfaces";
import { redisClient } from "../db";

// Simulated in-memory database
const staticLists: ITodoList[] = [];

export const listLists = async function (
    request: FastifyRequest,
    reply: FastifyReply
){
    const l = await redisClient().then(c => c.keys('*'))

    const result: ITodoList[] = [];
    for (const key of l) {
        const value = await (await redisClient()).hGetAll(key)
        if (value) {
            const parsedValue = JSON.parse(JSON.stringify(value, null, 2))
            result.push(parsedValue as ITodoList)
        }
    }
    reply.send(result)
}

export const createList = async function (
    request: FastifyRequest,
    reply: FastifyReply
){
    const newList = request.body as ITodoList;

    const redisObject = {
        id: String(newList.id),
        name: String(newList.name),
        status: String(newList.status)
    }

    await redisClient()
        .then( c => {
            c.hSet(`todo-list:${newList.id}`, redisObject);
        })

    reply.send({ message: "List created" });
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