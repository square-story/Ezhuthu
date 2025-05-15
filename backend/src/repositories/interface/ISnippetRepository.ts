import { ISnippetModel } from "@/models/snippet.model";

export interface ISnippetRepository {
    createSnippet(snippet: ISnippetModel): Promise<ISnippetModel>;
    findByTitle(title: string): Promise<ISnippetModel | null>;
    findByLanguage(language: string): Promise<ISnippetModel | null>;
    findByTags(tags: string[]): Promise<ISnippetModel | null>;
    findByAuthor(author: string): Promise<ISnippetModel | null>;
    deleteSnippet(id: string): Promise<ISnippetModel | null>;
    updateSnippet(id: string, snippet: ISnippetModel): Promise<ISnippetModel | null>;
    getAllSnippets(): Promise<ISnippetModel[]>;
    getSnippetById(id: string): Promise<ISnippetModel | null>;
}