import { addDoc, collection, setDoc, doc, updateDoc, getDoc, increment } from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Account, DbUser } from "./user"

/// updates a ref by data returned by update, if ref does not exist model is used to create a new document
export async function upsert(
	ref: DocumentReference,
	model: DocumentData,
	update: (data: DocumentData) => DocumentData
) {
	const snapshot = await getDoc(ref);
	if (snapshot.exists()) {
		await updateDoc(ref, update(snapshot.data()));
	} else {
		await setDoc(ref, model);
	}
}

export async function update(
	ref: DocumentReference,
	update: (data: DocumentData) => DocumentData
) {
	const snapshot = await getDoc(ref);
	if (snapshot.exists()) {
		await updateDoc(ref, update(snapshot.data()));
	}
}

export async function upsertHype() {
	const ref = doc(db, 'values', 'hype');
	const snapshot = await getDoc(ref);
	if (snapshot.exists()) {
		await updateDoc(ref, { hype: increment(1) });
	} else {
		await setDoc(ref, { hype: 1 });
	}
}

export async function updateUserHypeCount(account: Account | null) {
	if (!account) return;
	const ref = doc(db, "users", account.uid);
	await updateDoc(ref, { hype: increment(1) });
}

// this function does not create a authed user, but rather the database version from a uid
export async function createUser(uid: string, email: string, name: string) {
	const userRef = doc(db, "users", uid);
	const existing = await getDoc(userRef);
	if (existing.exists()) {
		return;
	}
	await setDoc(userRef, {
		name,
		email,
		hype: 0,
		role: "user",
		createdAt: new Date(),
	} as DbUser);
}
