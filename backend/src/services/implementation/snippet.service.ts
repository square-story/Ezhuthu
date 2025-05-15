import { ISnippetModel } from "@/models/snippet.model";
import { ISnippetService } from "../interface/ISnippetService";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/di/types";
import { ISnippetRepository } from "@/repositories/interface/ISnippetRepository";
import { createHttpError } from "@/utils";
import { HttpResponse, HttpStatus } from "@/constants";

@injectable()
export class SnippetService implements ISnippetService {
    constructor(
        @inject(DI_TYPES.SnippetRepository) private _snippetRepository: ISnippetRepository
    ){}
    
    async getSnippetById( snippetId: string): Promise<ISnippetModel> {
        const snippet = await this._snippetRepository.getSnippetById(snippetId);
        if(!snippet) throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SNIPPET_NOT_FOUND);
        return snippet;
    }

    async getSnippetsByUserId(userId: string): Promise<ISnippetModel[]> {
        const snippets = await this._snippetRepository.findByAuthor(userId);
        if(!snippets) throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SNIPPET_NOT_FOUND);
        return snippets;
    }

    async postSnippetByUserId( snippet: ISnippetModel): Promise<ISnippetModel> {
        return await this._snippetRepository.createSnippet(snippet);
    }

    async updateSnippetByUserId(userId: string, snippetId: string, snippet: ISnippetModel): Promise<ISnippetModel | null> {
        const snippetToUpdate = await this.getSnippetById(snippetId);
        if(!snippetToUpdate) throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SNIPPET_NOT_FOUND);
        return await this._snippetRepository.updateSnippet(snippetId, snippet);
    }

    async deleteSnippetById(snippetId: string): Promise<ISnippetModel> {
        const snippet = await this._snippetRepository.getSnippetById(snippetId);
        if(!snippet) throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SNIPPET_NOT_FOUND);
        await this._snippetRepository.deleteSnippet(snippetId);
        return snippet;
    }

    async updateSnippetById(snippetId: string, snippet: ISnippetModel): Promise<ISnippetModel> {
        const snippetToUpdate = await this._snippetRepository.getSnippetById(snippetId);
        if(!snippetToUpdate) throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.SNIPPET_NOT_FOUND);
        await this._snippetRepository.updateSnippet(snippetId, snippet);
        return snippet;
    }
}