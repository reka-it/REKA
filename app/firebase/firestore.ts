import { getDocs, addDoc, collection, setDoc, doc, updateDoc, getDoc, increment, query, orderBy } from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Account, DbUser, Role } from "./user"

export type Sorting = "asc" | "desc";

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

export async function updateUserRole(uid: string, role: Role) {
	const ref = doc(db, "users", uid);
	await updateDoc(ref, { role });
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

interface Feedback {
	by: string | null;
	message: string;
	createdAt: Date;
}

export async function createFeedback(
	account: Account | null,
	message: string
): Promise<DocumentReference> {
	const ref = collection(db, "feedback");
	const content = {
		by: account ? account.uid : null,
		message: message,
		createdAt: new Date(),
	};
	return await addDoc(ref, content);
}

export async function getFeedback(id: string): Promise<Feedback | null> {
	const ref = doc(db, "feedback", id);
	const snapshot = await getDoc(ref);
	return snapshot.exists() ? (snapshot.data() as Feedback) : null;
}

export async function getAllFeedback(
	field: keyof Feedback = "createdAt",
	sorting: Sorting = "desc"
): Promise<Array<Feedback & { id: string }>> {
	const ref = collection(db, "feedback");
	const snapshot = await getDocs(query(ref, orderBy(field, sorting)));

	return snapshot.docs.map(doc => ({
		id: doc.id,
		...(doc.data() as Feedback),
	}));
}

export async function getDbUser(uid: string): Promise<DbUser | null> {
	const ref = doc(db, "users", uid);
	const snapshot = await getDoc(ref);
	return snapshot.exists() ? (snapshot.data() as DbUser) : null;
}

export async function getDbUsers(
	field: keyof DbUser = "createdAt",
	sorting: Sorting = "desc"
): Promise<Array<DbUser & { id: string }>> {
	const ref = collection(db, "users");
	const snapshot = await getDocs(query(ref, orderBy(field, sorting)));

	return snapshot.docs.map(doc => ({
		id: doc.id,
		...(doc.data() as DbUser),
	}));
}

