import { useValue } from "./useValue";
import { useState, useEffect } from "react";

export function useHypeCounter(): { hype: number | null, loading: boolean } {
	const { data, loading } = useValue("values", "hype");
	const [hype, setHype] = useState(null)

	useEffect(() => {
		if (data) {
			setHype(data.hype)
		}
	}, [data])

	return { hype, loading };
}
