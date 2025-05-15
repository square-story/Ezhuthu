import "reflect-metadata";
import express from "express";
import { developmentLogger, errorLogger, connectToDatabase, appConfig } from "@/configs";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routers/auth.router";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middlware";
import snippetRouter from "./routers/snippet.router";


const app = express();

app.use(
    cors({
        origin: appConfig.corsOrigin,
        credentials: appConfig.corsCredentials,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(developmentLogger);
app.use(errorLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRouter);
app.use("/api/snippets",snippetRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    await connectToDatabase();
    app.listen(appConfig.port, () => {
        console.log(`Server is running on port ${appConfig.port}✅`);
    });
}

startServer();



