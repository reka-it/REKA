import type { RekaDay } from "../reka";

export const rekaKeys = {
	all: ['rekaer'] as const,
	detail: (year: string) => [...rekaKeys.all, year] as const,
	program: (year: string) => [...rekaKeys.detail(year), 'program'] as const,
	day: (year: string, day: RekaDay) => [...rekaKeys.program(year), day] as const,
}
