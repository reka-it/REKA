import { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.scss";

type DropDownProps = {
	toggler: React.RefObject<HTMLElement | null>;
	items: Array<string>;
	onSelect?: (item: string) => void;
};

export default function DropDown({ toggler, items, onSelect }: DropDownProps) {
	const [open, setOpen] = useState(false);
	const dropDownRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!toggler.current) return;

		const handleClick = () => {
			setOpen(v => !v);
		}

		toggler.current.addEventListener("click", handleClick)

		return () => {
			if (toggler.current) {
				toggler.current.removeEventListener("click", handleClick)
			}
		}
	}, [toggler])

	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropDownRef.current && toggler.current &&
				!dropDownRef.current.contains(event.target as Node) &&
				!toggler.current.contains(event.target as Node)
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

	const handleSelect = (item: string) => {
		onSelect?.(item);
		setOpen(false);
	};

	return (
		<ul className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
			tabIndex={-1}
			ref={dropDownRef}
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
