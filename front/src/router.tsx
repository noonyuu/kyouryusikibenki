import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Home } from "./page/Home";
import { Form } from "./page/Form";

const rootRoute = createRootRoute();

const indexRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const formRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form",
  component: Form,
});

const routeTree = rootRoute.addChildren([indexRouter, formRouter]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
