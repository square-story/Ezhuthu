import { hashPassword } from "@/utils";
import { model, Schema, Document } from "mongoose";
import { IUser } from "shared/types";

export interface IUserModel extends Document, Omit<IUser, "_id"> { }

const userSchema = new Schema<IUserModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,

    }
)

userSchema.pre<IUserModel>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password)
    }
    next()
})

const User = model<IUserModel>("User", userSchema);
export default User;