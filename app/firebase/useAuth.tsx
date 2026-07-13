import { useState, useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { DbUser, Role } from "./user";

// account is the authentication object used when loggin in
// it contains the uid
// user is the database version which stores user related values like role, 
// role here is essentialy just user.role but easier if you don't need user
interface AuthState {
	account: FirebaseUser | null,
	user: DbUser | null,
	role: Role,
	loading: boolean;
}

const roleLevel: Record<Exclude<Role, null>, number> = {
	user: 1,
	admin: 2,
	dev: 3,
};

export type AuthRequirement = Exclude<Role, null> | "guest";

export function goBack(navigate: NavigateFunction) {
	if (window.history.state?.idx > 0) {
		navigate(-1);
	} else {
		navigate("/");
	}
}

export function useAuth(requiredRole?: AuthRequirement): AuthState {
	// fields
	const [account, setAccount] = useState<FirebaseUser | null>(null);
	const [user, setUser] = useState<DbUser | null>(null);
	const role = user?.role ?? null;
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(
			auth,
			(firebaseUser) => {
				setAccount(firebaseUser);
				if (!firebaseUser) {
					setUser(null);
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
		if (!account) return;

		const unsubscribeDoc = onSnapshot(
			doc(db, "users", account.uid),
			(snapshot) => {
				const data = snapshot.data();
				setUser(data ? (data as DbUser) : null);
				setLoading(false);
			},
			(_) => {
				setLoading(false);
			}
		);

		return () => unsubscribeDoc();
	}, [account]);

	useEffect(() => {
		if (!requiredRole || loading) return;

		if (requiredRole === "guest") {
			if (account) goBack(navigate);
			return;
		}

		if (role && roleLevel[role] >= roleLevel[requiredRole]) return;
		goBack(navigate);
	}, [requiredRole, loading, role, account, navigate]);

	return { account, user, role, loading };
}
