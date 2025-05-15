import { ISnippetModel } from "@/models/snippet.model";

export interface ISnippetService {
    getSnippetsByUserId(userId: string): Promise<ISnippetModel[]>;
    getSnippetById(snippetId: string): Promise<ISnippetModel>;
    postSnippetByUserId(snippet: ISnippetModel): Promise<ISnippetModel>;
    updateSnippetById(snippetId: string, snippet: ISnippetModel): Promise<ISnippetModel>;
    deleteSnippetById(snippetId: string): Promise<ISnippetModel>;
}