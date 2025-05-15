import { ISnippetController } from "@/controllers/interface/ISnippetController";
import { container } from "@/di/container";
import { DI_TYPES } from "@/di/types";
import { Router } from "express";

const snippetRouter = Router();
const SnippetController = container.get<ISnippetController>(DI_TYPES.SnippetController);

snippetRouter.get("/", SnippetController.getSnippetsByUserId);
snippetRouter.get("/:snippetId", SnippetController.getSnippetById);
snippetRouter.post("/", SnippetController.postSnippetByUserId);
snippetRouter.put("/:snippetId", SnippetController.updateSnippetById);
snippetRouter.delete("/:snippetId", SnippetController.deleteSnippetById);

export default snippetRouter;

