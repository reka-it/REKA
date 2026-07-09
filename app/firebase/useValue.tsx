import { useEffect, useState } from "react";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { db } from "~/firebase/firebase";

export function useValue(
	collectionName: string,
	docId: string
) {
	const [data, setData] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		const unsubscribe = onSnapshot(
			doc(db, collectionName, docId),
			(snapshot) => {
				setData(snapshot.exists() ? (snapshot.data() as DocumentData) : null);
				setLoading(false);
			},
			(err) => {
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [collectionName, docId]);

	return { data, loading };
}
