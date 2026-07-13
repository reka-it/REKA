import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	type User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { createUser } from "./firestore";
import { getDocs, where } from "firebase/firestore/lite";
import { collection, query, updateDoc } from "firebase/firestore";
import type { Role } from "./user";
import { onAuthStateChanged } from "firebase/auth/cordova";

export type AuthErrorField = "email" | "password" | "root";
export type AuthResult =
	| { success: true; user: FirebaseUser }
	| { success: false; field: AuthErrorField; message: string; code: string };

// claude generated (if problems blame ai)
function mapAuthError(code: string): { field: AuthErrorField; message: string } {
	switch (code) {
		case "auth/invalid-email":
			return { field: "email", message: "Enter a valid email" };
		case "auth/email-already-in-use":
			return { field: "email", message: "That email is already registered" };
		case "auth/user-not-found":
			return { field: "email", message: "No account found with that email" };
		case "auth/wrong-password":
			return { field: "password", message: "Incorrect password" };
		case "auth/invalid-credential":
			return { field: "root", message: "Incorrect email or password" };
		case "auth/weak-password":
			return { field: "password", message: "Password is too weak" };
		case "auth/too-many-requests":
			return { field: "root", message: "Too many attempts. Try again later." };
		case "auth/network-request-failed":
			return { field: "root", message: "Network error. Check your connection." };
		default:
			return { field: "root", message: "Something went wrong. Try again." };
	}
}

export async function signUp(email: string, password: string): Promise<AuthResult> {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		await createUser(userCredential.user.uid, email);

		return { success: true, user: userCredential.user };
	} catch (error: any) {
		const { field, message } = mapAuthError(error.code);

		return { success: false, field, message, code: error.code ?? "unknown" };
	}
}

export async function logIn(email: string, password: string): Promise<AuthResult> {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);

		return { success: true, user: userCredential.user };
	} catch (error: any) {
		const { field, message } = mapAuthError(error.code);

		return { success: false, field, message, code: error.code ?? "unknown" };
	}
}

export async function logOut() {
	return signOut(auth);
}

export async function loggedIn(): Promise<boolean> {
	return new Promise(resolve => {
		const drop = onAuthStateChanged(auth, user => {
			drop();
			resolve(!!user);
		})
	})
}

export async function setAuth(email: string, role: Role) {
	if (role == null) return;
	const snapshot = await getDocs(query(collection(db, "users"), where("email", "==", email)));
	if (snapshot.empty) {
		throw new Error("No user found with that email");
	} else if (snapshot.size > 1) {
		throw new Error("Multiple users found with that email");
	}
	const userDoc = snapshot.docs[0];
	await updateDoc(userDoc.ref, { role });
}
