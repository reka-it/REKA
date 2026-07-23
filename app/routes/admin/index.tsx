import { useAuth } from "~/firebase/useAuth";

export default function Admin() {
	const { user, role } = useAuth("admin");
	return (
		<div>
			{user &&
				<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					<span>
						BRUKER
					</span>
					<span>
						Navn:  {user.name}
					</span>
					<span>
						Email:  {user.email}
					</span>
					<span>
						Rolle:  {user.role}
					</span>
				</div>
			}
		</div>
	);
}
