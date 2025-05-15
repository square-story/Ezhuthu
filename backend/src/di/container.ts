import { Container } from "inversify";
import { DI_TYPES } from "./types";
import { IUserRepository } from "@/repositories/interface/IUserRepository";
import { UserRepository } from "@/repositories/implementation/user.repository";
import { IAuthService } from "@/services/interface/IAuthService";
import { AuthService } from "@/services/implementation/auth.service";
import { IAuthController } from "@/controllers/interface/IAuthController";
import { AuthController } from "@/controllers/implementation/auth.controller";
import { ISnippetRepository } from "@/repositories/interface/ISnippetRepository";
import { SnippetRepository } from "@/repositories/implementation/snippet.repository";
import { ISnippetService } from "@/services/interface/ISnippetService";
import { SnippetService } from "@/services/implementation/snippet.service";
import { ISnippetController } from "@/controllers/interface/ISnippetController";
import { SnippetController } from "@/controllers/implementation/snippet.controller";


const container = new Container();

container.bind<IUserRepository>(DI_TYPES.UserRepository).to(UserRepository)
container.bind<IAuthService>(DI_TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(DI_TYPES.AuthController).to(AuthController)

container.bind<ISnippetRepository>(DI_TYPES.SnippetRepository).to(SnippetRepository)
container.bind<ISnippetService>(DI_TYPES.SnippetService).to(SnippetService)
container.bind<ISnippetController>(DI_TYPES.SnippetController).to(SnippetController)

export { container };
