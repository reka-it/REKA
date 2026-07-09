import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { db } from "./firebase";

/// updates a ref by data returned by update, if ref does not exist model is used to create a new document
async function upsert(
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

/// hype button upsert
export async function upsertHype() {
	await upsert(doc(db, 'values', 'hype'), { hype: 1 }, data => ({ hype: parseInt(data.hype) + 1 }));
}
