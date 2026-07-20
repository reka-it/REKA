import { useAuth } from "~/firebase/useAuth";

export default function Styling() {
	const { user, role } = useAuth("admin");
	return (
		<h1> styling </h1>
	);
}
