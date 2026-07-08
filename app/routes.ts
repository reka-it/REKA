import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("2026", "routes/reka2026.tsx"), // eksempel route
	route("admin", "routes/admin.tsx"),
	route("earlier", "routes/earlier.tsx"),
] satisfies RouteConfig;
