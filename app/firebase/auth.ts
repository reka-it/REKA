import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import { auth, db } from "./firebase";
import { createUser } from "./firestore";
import { getDocs, where } from "firebase/firestore/lite";
import { collection, query, updateDoc } from "firebase/firestore";

export type userRole = "dev" | "admin" | "user" | null;

export async function signUp(email: string, password: string) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		createUser(userCredential.user.uid, email);
		return userCredential.user;
	} catch (error: any) {
		console.error(error.code, error.message);
	}
}

export async function logIn(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error: any) {
		console.error(error.code, error.message);
	}
}

export async function logOut() {
	return signOut(auth);
}

export async function setAuth(email: string, role: userRole) {
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
