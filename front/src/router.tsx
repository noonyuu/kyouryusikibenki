import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Animation } from "./page/Animation";
import { Form } from "./page/Form";
import { Admin } from "./page/Admin/Admin";
import { Home } from "./page/Home";

const rootRoute = createRootRoute();

const indexRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const animationRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/animation",
  component: Animation,
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

const routeTree = rootRoute.addChildren([
  indexRouter,
  animationRouter,
  adminRoute,
  formRouter,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
