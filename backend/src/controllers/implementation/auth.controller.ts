import { inject, injectable } from "inversify";
import { IAuthController } from "../interface/IAuthController";
import { DI_TYPES } from "@/di/types";
import { IAuthService } from "@/services/interface/IAuthService";
import { Request, Response, NextFunction } from "express";
import { HttpResponse, HttpStatus } from "@/constants";
import { setCookie } from "@/utils";


@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject(DI_TYPES.AuthService) private _authService: IAuthService
    ) { }
    signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log(req.body, 'Here it is controller');
            const tokens = await this._authService.signup(req.body);
            setCookie(res, tokens.refreshToken);
            res.status(HttpStatus.OK).json({ token: tokens.accessToken });
        } catch (error) {
            next(error);
        }
    };

    signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tokens = await this._authService.signin(req.body.email, req.body.password);
            setCookie(res, tokens.refreshToken);
            res.status(HttpStatus.OK).json({ token: tokens.accessToken });
        } catch (error) {
            next(error);
        }
    };

    logout = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            res.status(HttpStatus.OK).json({ message: HttpResponse.LOGOUT_SUCCESS });
        } catch (error) {
            next(error);
        }
    };

    refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { refreshToken } = req.cookies;
            const {
                accessToken,
                refreshToken: newRefreshToken
            } = await this._authService.refreshAccessToken(refreshToken);

            setCookie(res, newRefreshToken);
            res.status(HttpStatus.OK).json({ token: accessToken });
        } catch (error) {
            next(error);
        }
    };

    me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = JSON.parse(req.headers["x-user-payload"] as string);
            const user = await this._authService.getUser(id);
            res.status(HttpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };
}