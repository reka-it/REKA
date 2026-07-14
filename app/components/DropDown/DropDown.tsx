import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

type DropDownProps = {
	open: boolean;
	setOpen: (v: boolean) => void;
	items: Array<string>;
	onSelect?: (item: string) => void;
};

export default function DropDown({ open, setOpen, items, onSelect }: DropDownProps) {
	const dropDownRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropDownRef.current &&
				!dropDownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handleClickOutside);
		dropDownRef.current?.focus();

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, setOpen]);

	const handleBlur = (event: React.FocusEvent<HTMLUListElement>) => {
		if (
			dropDownRef.current &&
			!dropDownRef.current.contains(event.relatedTarget as Node)
		) {
			setOpen(false);
		}
	};

	const handleSelect = (item: string) => {
		onSelect?.(item);
		setOpen(false);
	};

	if (!open) return null;

	return (
		<ul className={styles.dropdown}
			tabIndex={-1}
			ref={dropDownRef}
			onBlur={handleBlur}
			role="menu"
		>
			{items?.map((item) => (
				<li className={styles.item}
					key={item}
					role="menuitem"
					tabIndex={0}
					onClick={() => handleSelect(item)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") handleSelect(item);
					}}
				>
					{item}
				</li>
			))}
		</ul>
	);
}
