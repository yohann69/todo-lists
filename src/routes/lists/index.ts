import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";

export default async function lists(fastify: FastifyInstance) {
    fastify.get("/", listsController.listLists);
    fastify.post("/", listsController.addList);
    fastify.put("/:id", listsController.updateList);
    fastify.put("/:id/done", listsController.markListAsDone);

    fastify.post("/:id/items", listsController.addListItem);
    fastify.delete("/:id/items/:itemId", listsController.deleteListItem);
    fastify.put("/:id/items/:itemId", listsController.updateListItem);
}