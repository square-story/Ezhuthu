import { Container } from "inversify";
import { DI_TYPES } from "./types";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { UserRepository } from "@/repositories/implementation/user.repository";
import { IAuthService } from "@/services/interface/IAuthService";
import { AuthService } from "@/services/implementation/auth.service";
import { IAuthController } from "@/controllers/interface/IAuthController";
import { AuthController } from "@/controllers/implementation/auth.controller";


const container = new Container();

container.bind<IUserRepository>(DI_TYPES.UserRepository).to(UserRepository)
container.bind<IAuthService>(DI_TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(DI_TYPES.AuthController).to(AuthController)

export { container };
