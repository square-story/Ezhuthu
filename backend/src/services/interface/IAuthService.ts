import { IUserModel } from "@/models/user.model";
import { IUser } from "shared/types";

export interface IAuthService {
    signup(user: IUser): Promise<{ accessToken: string; refreshToken: string }>;
    signin(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
    refreshAccessToken(token: string): Promise<{ accessToken: string, refreshToken: string }>;
    getUser(userId: string): Promise<IUserModel>;
}