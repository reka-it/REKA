import { useState, useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { Account, DbUser, Role } from "./user";

// account is the authentication object used when loggin in
// it contains the uid
// user is the database version which stores user related values like role, 
// role here is essentialy just user.role but easier if you don't need user
interface AuthState {
	account: Account | null;
	user: DbUser | null;
	role: Role;
	loading: boolean;
	isRole: (requiredRole: Role) => boolean;
	hasAccess: (requiredRole: Role) => boolean;
	getAccessLevel: () => number;
}

export const roleLevel: Record<Role, number> = {
	guest: 0,
	user: 1,
	admin: 2,
	dev: 3,
};

export function goBack(navigate: NavigateFunction) {
	if (window.history.state?.idx > 0) {
		navigate(-1);
	} else {
		navigate("/");
	}
}

export function useAuth(requiredRole?: Role): AuthState {
	// fields
	const [account, setAccount] = useState<Account | null>(null);
	const [user, setUser] = useState<DbUser | null>(null);
	const role = user?.role ?? "guest";
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

	const hasAccess = (requiredRole: Role): boolean => {
		return roleLevel[role] >= roleLevel[requiredRole];
	}

	const isRole = (requiredRole: Role): boolean => {
		return requiredRole === role;
	}

	const getAccessLevel = (): number => roleLevel[role];

	useEffect(() => {
		if (!requiredRole || loading) return;

		if (isRole("guest")) {
			if (account) goBack(navigate);
			return;
		}

		if (hasAccess(requiredRole)) return;

		goBack(navigate);
	}, [requiredRole, loading, role, account, navigate]);

	return { account, user, role, loading, isRole, hasAccess, getAccessLevel };
}
