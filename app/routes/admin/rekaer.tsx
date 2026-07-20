import { useAuth } from "~/firebase/useAuth";

export default function Rekaer() {
	const { user, role } = useAuth("admin");
	return (
		<h1> rekaer </h1>
	);
}
