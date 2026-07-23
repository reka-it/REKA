import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	...prefix("reka", [
		...prefix("2026", [
			layout("routes/reka/2026/layout.tsx", [
				index("routes/reka/2026/index.tsx"),
				route("feedback", "routes/feedback.tsx", { id: "reka-2026-feedback" }),
			]),
		]),
		route(":slug", "routes/reka/ingenReka.tsx"),
	]),
	...prefix("admin", [
		layout("routes/admin/layout.tsx", [
			index("routes/admin/index.tsx"),
			route("users", "routes/admin/users.tsx"),
			route("styling", "routes/admin/styling.tsx"),
			route("rekaer", "routes/admin/rekaer.tsx"),
		]),
	]),
	layout("routes/default/layout.tsx", [
		route("auth", "routes/auth.tsx"),
		route("earlier", "routes/earlier.tsx"),
		route("feedback", "routes/feedback.tsx"),
		route("*", "routes/notFound.tsx"),
	]),
] satisfies RouteConfig;
