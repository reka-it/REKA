import z from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { logIn, logOut, signUp } from "~/firebase/auth";
import { useAuth } from "~/firebase/useAuth";
import Input from "../Input/Input";

type AuthProps = {
	onSucsess: () => void
};

type Mode = "login" | "signup" | "logout"

const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Enter a valid email"),
	password: z
		.string()
		.min(6, "Must be at least 6 characters"),
});

const signupSchema = z.object({
	name: z
		.string()
		.min(4, "Name is required"),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Enter a valid email"),
	password: z
		.string()
		.min(6, "Must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Auth({ onSucsess }: AuthProps) {
	const { account, loading } = useAuth();
	const [mode, setMode] = useState<Mode>("login");
	const [pending, setPending] = useState(false);

	const loginForm = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
		mode: "onChange",
	});

	const signupForm = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: { name: "", email: "", password: "" },
		mode: "onChange",
	});

	const onLogin = async (data: LoginFormValues) => {
		setPending(true);
		const result = await logIn(data.email, data.password);

		if (!result.success) {
			loginForm.setError(result.field, { message: result.message });
		} else {
			onSucsess();
		}

		setPending(false);
	};

	const onSignup = async (data: SignupFormValues) => {
		setPending(true);
		const result = await signUp(data.email, data.password, data.name);

		if (!result.success) {
			signupForm.setError(result.field, { message: result.message });
		} else {
			onSucsess();
		}

		setPending(false);
	};

	const onLogout = async () => {
		setPending(true);
		await logOut();
		setPending(false);
	};

	return (
		<div className={styles.container}>
			{!account &&
				<div className={styles.tabs}>
					<button
						type="button"
						className={mode === "login" ? styles.tabActive : styles.tab}
						onClick={() => setMode("login")}
					>
						Log in
					</button>
					<button
						type="button"
						className={mode === "signup" ? styles.tabActive : styles.tab}
						onClick={() => setMode("signup")}
					>
						Sign up
					</button>
				</div>
			}
			{signupForm.formState.errors.root &&
				<p role="alert" className={styles.error}>
					{signupForm.formState.errors.root.message}
				</p>
			}
			<form className={styles.form}>
				{!!account ? (
					<div className={styles.field}>
						<label className={styles.label}>
							Logged in as
						</label>
						<p className={styles.label}>{account.email}</p>
					</div>
				) : (
					mode === "login" ? (
						<div className={styles.inputs}>
							<Input
								label="Email"
								id="email"
								type="email"
								autoComplete="email"
								placeholder="reke@rekenett.no"
								{...loginForm.register("email")}
								error={loginForm.formState.errors.email}
							/>
							<Input
								label="Password"
								id="password"
								type="password"
								autoComplete="current-password"
								placeholder="reke123"
								{...loginForm.register("password")}
								error={loginForm.formState.errors.password}
							/>
						</div>
					) : (
						<div className={styles.inputs}>
							<Input
								label="Name"
								id="name"
								type="text"
								autoComplete="name"
								placeholder="Reke Rekesen"
								{...signupForm.register("name")}
								error={signupForm.formState.errors.name}
							/>
							<Input
								label="Email"
								id="signup-email"
								type="email"
								autoComplete="email"
								placeholder="reke@rekenett.no"
								{...signupForm.register("email")}
								error={signupForm.formState.errors.email}
							/>
							<Input
								label="Password"
								id="signup-password"
								type="password"
								autoComplete="new-password"
								placeholder="reke123"
								{...signupForm.register("password")}
								error={signupForm.formState.errors.password}
							/>
						</div>
					)
				)}
			</form>
			<div className={styles.actions}>
				{!!account ? (
					<button
						type="button"
						disabled={pending}
						className={styles.login}
						onClick={onLogout}
					>
						{pending ? "Logging out..." : "Log out"}
					</button>
				) : mode === "login" ? (
					<button
						type="button"
						disabled={pending}
						className={styles.login}
						onClick={loginForm.handleSubmit(onLogin)}
					>
						{pending ? "Logging in..." : "Log in"}
					</button>
				) : (
					<button
						type="button"
						disabled={pending}
						className={styles.signup}
						onClick={signupForm.handleSubmit(onSignup)}
					>
						{pending ? "Signing up..." : "Sign up"}
					</button>
				)}
			</div>
		</div>
	);
}
