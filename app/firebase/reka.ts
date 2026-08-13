export interface Reka {
	year: string,
	program: Program,
	createdAt: Date,
};

export type RekaDay = "friday" | "saturday" | "sunday";

export interface Event {
	id: string,
	startTime: Date,
	endTime: Date,
	activity: string,
	description: string,
}

export interface Program {
	friday: Event[],
	saturday: Event[],
	sunday: Event[],
}
