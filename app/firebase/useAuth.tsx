import { useState, useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { userRole } from "./auth";

interface AuthState {
	user: User | null;
	role: userRole,
	loading: boolean;
}

const roleLevel: Record<Exclude<userRole, null>, number> = {
	user: 1,
	admin: 2,
	dev: 3,
};

export type AuthRequirement = Exclude<userRole, null> | "guest";

export function goBack(navigate: NavigateFunction) {
	if (window.history.state?.idx > 0) {
		navigate(-1);
	} else {
		navigate("/");
	}
}

export function useAuth(requiredRole?: AuthRequirement): AuthState {
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState<userRole>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

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

	useEffect(() => {
		if (!requiredRole || loading) return;

		if (requiredRole === "guest") {
			if (user) goBack(navigate);
			return;
		}

		if (role && roleLevel[role] >= roleLevel[requiredRole]) return;
		goBack(navigate);
	}, [requiredRole, loading, role, user, navigate]);

	return { user, role, loading };
}
