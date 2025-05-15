import { model, Schema } from "mongoose";
import { ISnippet } from "shared/types";

export interface ISnippetModel extends Document, Omit<ISnippet, "_id"> { }

const snippetSchema = new Schema<ISnippetModel>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
    }
},
    {
        timestamps: true,
    }
)

const Snippet = model<ISnippetModel>("Snippet", snippetSchema);