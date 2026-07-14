import { useState } from "react";
import type { Route } from "./+types/admin";
import Page from "~/components/Page/Page";
import Button from "~/components/Button/Button";
import AuthModal from "~/components/AuthModal/AuthModal";
import { useAuth } from "~/firebase/useAuth";
import { logOut } from "~/firebase/auth";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA ADMIN" }];
}

export default function Admin() {
	const [open, setOpen] = useState(false);
	const { user, role } = useAuth();
	return (
		<>
			<Page>
				<Button onClick={() => setOpen(true)}> Auth Modal! </Button>
				<AuthModal open={open} setOpen={setOpen} />
				{user &&
					<div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px", width: "fit-content" }}>
						<p>
							name: {user.name}
						</p>
						<p>
							email: {user.email}
						</p>
						<p>
							role: {role}
						</p>
						<Button onClick={() => logOut()}> logout </Button>
					</div>
				}
			</Page>
		</>
	);
}
