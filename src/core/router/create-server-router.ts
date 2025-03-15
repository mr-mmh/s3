import type { ClientRouter, ServerRouter } from "./types";

export function createServerRouter(
    clientRouter: ClientRouter,
    serverRouter?: Partial<ServerRouter>,
): ServerRouter {
    const router: ServerRouter = { ...clientRouter };
    if (serverRouter) {
        for (const key in serverRouter) {
            router[key as keyof ServerRouter] = serverRouter[
                key as keyof ServerRouter
            ] as any;
        }
    }
    return router;
}
