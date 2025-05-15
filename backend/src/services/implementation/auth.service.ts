import { inject, injectable } from "inversify";
import { IAuthService } from "../interface/IAuthService";
import { DI_TYPES } from "@/di/types";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { IUser } from "shared/types";
import { comparePassword, createHttpError, generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils";
import { HttpResponse, HttpStatus } from "@/constants";
import { IUserModel } from "@/models/user.model";
import { AuthJwtPayload } from "../types/jwt-payload";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(DI_TYPES.UserRepository) private readonly _userRepository: IUserRepository
    ) {

    }

    async signup(user: IUser): Promise<{ accessToken: string; refreshToken: string }> {
        const userExist = await this._userRepository.findByEmail(user.email);
        if (userExist) {
            throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USER_EXIST);
        }
        const createUser = await this._userRepository.createUser(user as IUserModel)

        if (!createUser) throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USER_CREATION_FAILED);

        const payload = { id: createUser._id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload)
        return { accessToken, refreshToken }
    }

    async signin(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const user = await this._userRepository.findByEmail(email);
        if (!user) {
            throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
        }
        const isMatch = await comparePassword(password, user.password as string);
        if (!isMatch) {
            throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.PASSWORD_INCORRECT);
        }
        const payload = { id: user._id } as AuthJwtPayload;
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { accessToken, refreshToken };
    }

    async refreshAccessToken(token: string): Promise<{ accessToken: string; refreshToken: string; }> {
        if (!token) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN);
        }
        const decoded = verifyRefreshToken(token) as AuthJwtPayload;
        if (!decoded) {
            throw createHttpError(HttpStatus.NO_CONTENT, HttpResponse.TOKEN_EXPIRED);
        }

        const accessToken = generateAccessToken({ id: decoded.id });
        const refreshToken = generateRefreshToken({ id: decoded.id });

        return { accessToken, refreshToken };
    }

    async getUser(userId: string): Promise<IUserModel> {
        const user = await this._userRepository.findUserById(userId)

        if (!user) {
            throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND)
        }

        return user
    }
}