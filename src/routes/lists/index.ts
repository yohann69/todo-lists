import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";

export default async function lists(fastify: FastifyInstance) {
    fastify.get("/", listsController.listLists);
    fastify.post("/", listsController.addList);
    fastify.put("/:id", listsController.updateList);
    fastify.delete("/:id", listsController.deleteList);
    fastify.get("/:id", listsController.getList);
}