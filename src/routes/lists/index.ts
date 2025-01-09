import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";

import { addListSchema, listListsSchema } from '../../schemas'


export default async function lists(fastify: FastifyInstance) {
    fastify.get('/', { schema: listListsSchema }, listsController.listLists)
    fastify.post('/', { schema: addListSchema }, listsController.addList)
    fastify.put("/:id", listsController.updateList);
    fastify.put("/:id/done", listsController.markListAsDone);

    fastify.post("/:id/items", listsController.addListItem);
    fastify.delete("/:id/items/:itemId", listsController.deleteListItem);
    fastify.put("/:id/items/:itemId", listsController.updateListItem);
}