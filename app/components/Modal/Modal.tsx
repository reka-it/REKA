import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

export interface ModalProps {
	open: boolean;
	setOpen: (v: boolean) => void;
	children?: ReactNode;
};

export default function Modal({ open, setOpen, children }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		modalRef.current?.focus();

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [open, setOpen]);

	if (!open) return null;

	return (
		<div className={styles.overlay} onClick={() => setOpen(false)}>
			<div
				className={`${styles.modal}`}
				role="dialog"
				aria-modal="true"
				tabIndex={-1}
				ref={modalRef}
				onClick={event => event.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
