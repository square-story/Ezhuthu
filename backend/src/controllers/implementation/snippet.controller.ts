import { inject, injectable } from "inversify";
import { ISnippetController } from "../interface/ISnippetController";
import { ISnippetService } from "@/services/interface/ISnippetService";
import { DI_TYPES } from "@/di/types";
import { Request, Response, NextFunction } from "express";

@injectable()
export class SnippetController implements ISnippetController {
    constructor(
        @inject(DI_TYPES.SnippetService) private _snippetService: ISnippetService
    ){}

    getSnippetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const snippet = await this._snippetService.getSnippetById(req.params.snippetId);
            res.status(200).json(snippet);
        }catch (error) {
            next(error);
        }
    }

    getSnippetsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const snippets = await this._snippetService.getSnippetsByUserId(req.params.userId);
            res.status(200).json(snippets);
        }catch (error) {
            next(error);
        }
    }

    postSnippetByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const snippet = await this._snippetService.postSnippetByUserId(req.body);
            res.status(201).json(snippet);
        }catch (error) {
            next(error);
        }
    }

    updateSnippetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const snippet = await this._snippetService.updateSnippetById(req.params.snippetId, req.body);
            res.status(200).json(snippet);
        }catch (error) {
            next(error);
        }
    }

    deleteSnippetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const snippet = await this._snippetService.deleteSnippetById(req.params.snippetId);
            res.status(200).json(snippet);
        }catch (error) {
            next(error);
        }
    }
}