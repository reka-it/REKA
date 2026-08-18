import { getDocs, addDoc, collection, setDoc, doc, updateDoc, getDoc, increment, query, orderBy, where, limit, arrayRemove, deleteDoc } from "firebase/firestore";
import type { DocumentReference, DocumentData } from "firebase/firestore";
import { arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { Account, DbUser, Role } from "./user"
import type { Event, Reka, RekaDay } from "./reka";

export type Sorting = "asc" | "desc";

export async function update(
	ref: DocumentReference,
	update: (data: DocumentData) => DocumentData
) {
	const snapshot = await getDoc(ref);
	if (!snapshot.exists()) {
		throw new Error("Dokumentet finnes ikke");
	}
	await updateDoc(ref, update(snapshot.data()));
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

export async function createReka(year: string) {
	const ref = doc(db, 'rekaer', year);
	const snapshot = await getDoc(ref);
	if (snapshot.exists()) {
		throw new Error("Denne rekaen eksisterer allerede");
	}
	await setDoc(ref, {
		year: year,
		createdAt: new Date(),
		program: {
			friday: [],
			saturday: [],
			sunday: []
		},
	} as Reka);
	return { year };
}

export async function getReka(year: string): Promise<Reka> {
	const ref = doc(db, "rekaer", year);
	const snapshot = await getDoc(ref);
	if (!snapshot.exists()) {
		throw new Error("Reka finnes ikke");
	}
	return snapshot.data() as Reka;
}

export async function getRekaer(): Promise<Reka[]> {
	const ref = collection(db, "rekaer");
	const snapshot = await getDocs(ref);
	return snapshot.docs.map((doc) => doc.data() as Reka);
}

export async function deleteReka(year: string): Promise<void> {
	const ref = doc(db, "rekaer", year);
	const snapshot = await getDoc(ref);
	if (!snapshot.exists()) {
		throw new Error("Denne rekaen finnes ikke");
	}
	await deleteDoc(ref);
}

export async function addEventToProgram(
	year: string,
	day: RekaDay,
	event: Event
): Promise<void> {
	const ref = doc(db, "rekaer", year);
	await updateDoc(ref, { [`program.${day}`]: arrayUnion(event) });
}

export async function deleteEventFromProgram(
	year: string,
	day: RekaDay,
	event: Event
): Promise<void> {
	const ref = doc(db, "rekaer", year);
	await updateDoc(ref, { [`program.${day}`]: arrayRemove(event) });
}

function toDate(value: Date | Timestamp): Date {
	return value instanceof Timestamp ? value.toDate() : value;
}

export async function getProgram(year: string): Promise<Record<RekaDay, Event[]>> {
	const ref = doc(db, "rekaer", year);
	const snapshot = await getDoc(ref);
	if (!snapshot.exists()) {
		throw new Error("Reka finnes ikke");
	}

	const { program } = snapshot.data() as Reka;

	const convertedProgram = Object.fromEntries(
		Object.entries(program).map(([day, events]) => [
			day,
			events.map((event: Event) => ({
				...event,
				startTime: toDate(event.startTime),
				endTime: toDate(event.endTime),
			})),
		])
	) as Record<RekaDay, Event[]>;

	return convertedProgram;
}

export async function getDay(year: string, day: RekaDay): Promise<Event[]> {
	const program = await getProgram(year);
	return program[day] ?? [];
}

export async function getEvent(
	year: string,
	day: RekaDay,
	eventId: string
): Promise<Event | null> {
	const events = await getDay(year, day);
	return events.find((e) => e.id === eventId) ?? null;
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

interface Meaning {
	by: string | null;
	message: string;
}

export async function createMeaning(
	account: Account | null,
	message: string
): Promise<DocumentReference> {
	const ref = collection(db, "meaning");
	const content = {
		by: account ? account.uid : null,
		message: message,
		randomNumb: Math.random(),
	};
	return await addDoc(ref, content);
}

export async function getRandomMeanings(
	amount: number
): Promise<Array<Meaning & { id: string }>> {
	if (amount <= 0) return [];

	const ref = collection(db, "meaning");
	const pivot = Math.random();

	const firstQuery = query(
		ref,
		where("randomNumb", ">=", pivot),
		orderBy("randomNumb"),
		limit(amount)
	);
	const firstSnap = await getDocs(firstQuery);
	const results = firstSnap.docs.map(d => ({ id: d.id, ...(d.data() as Meaning) }));

	if (results.length < amount) {
		const remaining = amount - results.length;
		const secondQuery = query(
			ref,
			where("randomNumb", "<", pivot),
			orderBy("randomNumb"),
			limit(remaining)
		);
		const secondSnap = await getDocs(secondQuery);
		results.push(...secondSnap.docs.map(d => ({ id: d.id, ...(d.data() as Meaning) })));
	}
	return results;
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


