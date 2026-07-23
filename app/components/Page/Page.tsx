import styles from "./Page.module.scss";
import type { ReactNode } from "react";

type PageProps = {
	navbar?: ReactNode;
	footer?: ReactNode;
	mouse?: ReactNode;

	children?: ReactNode;
	className?: string;
};

export default function Page({ children, navbar, footer, mouse, className }: PageProps) {
	return (
		<>
			{mouse}
			{navbar}
			<main className={`${styles.page} ${className}`}>
				{children}
			</main>
			{footer}
		</>
	)
}
