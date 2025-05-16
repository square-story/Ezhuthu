import { Request, Response, NextFunction } from "express";
export interface ISnippetController {
    getSnippetsByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSnippetById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    postSnippetByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateSnippetById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteSnippetById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}