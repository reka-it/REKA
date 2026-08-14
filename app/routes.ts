import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	...prefix("reka", [
		...prefix("2026", [
			layout("routes/reka/2026/layout.tsx", [
				index("routes/reka/2026/index.tsx"),
				route("feedback", "routes/default/feedback.tsx", { id: "reka-2026-feedback" }),
			]),
		]),
		route(":slug", "routes/reka/ingenReka.tsx"),
	]),
	...prefix("admin", [
		layout("routes/admin/layout.tsx", [
			index("routes/admin/index.tsx"),
			route("users", "routes/admin/users.tsx"),
			route("styling", "routes/admin/styling.tsx"),
			...prefix("rekaer", [
				index("routes/admin/rekaer.tsx"),
				route(":year", "routes/admin/reka.tsx"),
				route(":year/program", "routes/admin/program.tsx"),
				route("create", "routes/admin/createReka.tsx"),
			]),
		]),
	]),
	layout("routes/default/layout.tsx", [
		route("auth", "routes/default/auth.tsx"),
		route("earlier", "routes/default/earlier.tsx"),
		route("feedback", "routes/default/feedback.tsx"),
		route("info", "routes/default/info.tsx"),
		route("web", "routes/default/web.tsx"),
		route("*", "routes/default/notFound.tsx"),
	]),
] satisfies RouteConfig;
