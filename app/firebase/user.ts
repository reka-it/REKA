
export type Role = "user" | "admin" | "dev" | null;

export interface DbUser {
	email: string,
	role: Role,
	hype: number,
	createdAt: Date,
}
