import { IUserModel } from "@/models/user.model";

export interface IUserRepository {
    createUser(user: IUserModel): Promise<IUserModel>;

    findByEmail(email: string): Promise<IUserModel | null>;

    findUserById(id: string): Promise<IUserModel | null>;
}
