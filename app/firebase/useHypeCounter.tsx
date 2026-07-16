import { useValue } from "./useValue";

export function useHypeCounter() {
	const { data, loading } = useValue("values", "hype");

	return { data, loading };
}
