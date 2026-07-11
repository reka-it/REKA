import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { userRole } from "./auth";

interface AuthState {
	user: User | null;
	role: userRole,
	loading: boolean;
}

export function useAuth(): AuthState {
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState<userRole>(null);
	const [loading, setLoading] = useState(true);

	// !TODO! add redirect when on page for only admin / dev

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(
			auth,
			(firebaseUser) => {
				setUser(firebaseUser);
				if (!firebaseUser) {
					setRole(null);
					setLoading(false);
				}
			},
			(_) => {
				setLoading(false);
			}
		);

		return () => unsubscribeAuth();
	}, []);

	useEffect(() => {
		if (!user) return;

		const unsubscribeDoc = onSnapshot(
			doc(db, "users", user.uid),
			(snapshot) => {
				const data = snapshot.data();
				setRole((data?.role as userRole) ?? "user");
				setLoading(false);
			},
			(_) => {
				setLoading(false);
			}
		);

		return () => unsubscribeDoc();
	}, [user]);

	return { user, role, loading };
}
