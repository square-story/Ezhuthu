import Snippet, { ISnippetModel } from "@/models/snippet.model";
import { BaseRepository } from "../base.repository";
import { ISnippetRepository } from "../interface/ISnippetRepository";
import { toObjectId } from "@/utils";

export class SnippetRepository extends BaseRepository<ISnippetModel> implements ISnippetRepository {
    constructor() {
        super(Snippet)
    }

    async createSnippet(snippet: ISnippetModel): Promise<ISnippetModel> {
        try {
            return await this.create(snippet);
        } catch (error) {
            console.error(error);
            throw new Error("Error creating snippet");
        }
    }

    async findByTitle(title: string): Promise<ISnippetModel | null> {
        try {
            return await this.findOne({title})
        } catch (error) {
            console.error(error);
            throw new Error("Error finding snippet by title");
        }
    }

    async findByTags(tags: string[]): Promise<ISnippetModel | null> {
        try {
            return await this.findOne({tags})
        } catch (error) {
            console.error(error);
            throw new Error("Error finding snippet by tags");
        }
    }

    async findByLanguage(language: string): Promise<ISnippetModel | null> {
        try {
            return await this.findOne({language})
        } catch (error) {
            console.error(error);
            throw new Error("Error finding snippet by language");
        }
    }

    async findByAuthor(author: string): Promise<ISnippetModel[]> {
        try {
            return await this.find({author},['author'])
        } catch (error) {
            console.error(error);
            throw new Error("Error finding snippet by author");
        }
    }
     async getAllSnippets(): Promise<ISnippetModel[]> {
        try {
            return await this.findAll(['author'])
        } catch (error) {
            console.error(error);
            throw new Error("Error finding snippets");
        }
    }
    async getSnippetById(id: string): Promise<ISnippetModel | null> {
        try {
            return await this.findById(toObjectId(id))
        } catch (error) {
            console.error(error);
            throw new Error("Error finding snippet by id");
        }
    }

    async updateSnippet(id: string, snippet: ISnippetModel): Promise<ISnippetModel | null> {
        try {
            return await this.update(toObjectId(id), snippet)
        } catch (error) {
            console.error(error);
            throw new Error("Error updating snippet");
        }
    }

    async deleteSnippet(id: string): Promise<ISnippetModel | null> {
        try {
            return await this.delete(toObjectId(id))
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting snippet");
        }
    }
}