import { useAuth } from "~/firebase/useAuth";

export default function Admin() {
	const { user, role } = useAuth("admin");
	return (
		<div>
			{user &&
				<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					<span>
						USER
					</span>
					<span>
						name:  {user.name}
					</span>
					<span>
						email:  {user.email}
					</span>
					<span>
						role:  {user.role}
					</span>
				</div>
			}
		</div>
	);
}
