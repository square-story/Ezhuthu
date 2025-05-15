import { model, Schema ,Document, Types} from "mongoose";
import { ISnippet } from "shared/types";

export interface ISnippetModel extends Document, Omit<ISnippet, "_id"| "author"> {
    author: Types.ObjectId;
 }

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
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
    {
        timestamps: true,
    }
)

const Snippet = model<ISnippetModel>("Snippet", snippetSchema);
export default Snippet;