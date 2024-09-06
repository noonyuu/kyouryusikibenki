import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Home } from "./page/Home";
import { Form } from "./page/Form";

// import { Home } from "./page/Home";
import { Admin } from "./page/Admin/Admin";


const rootRoute = createRootRoute();

const indexRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Admin,
});


const formRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form",
  component: Form,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([indexRouter, adminRoute, formRouter]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
