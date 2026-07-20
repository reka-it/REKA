import type { User as FirebaseUser } from "firebase/auth";

// just shadows User from firebase auth
export type Account = FirebaseUser;

// possible roles a user can have, usally just user
export type Role = "user" | "admin" | "dev" | "guest";

export interface DbUser {
	name: string,
	email: string,
	role: Role,
	hype: number,
	createdAt: Date,
};
