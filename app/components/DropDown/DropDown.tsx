import { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.scss";

type DropDownProps = {
	toggler: React.RefObject<HTMLElement | null>;
	items: Array<string>;
	onSelect?: (item: string, index: number) => void;
	selected?: number;
};

export default function DropDown({ toggler, items, onSelect, selected }: DropDownProps) {
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

	const handleSelect = (item: string, index: number) => {
		onSelect?.(item, index);
		setOpen(false);
	};

	return (
		<ul className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
			tabIndex={-1}
			ref={dropDownRef}
			role="menu"
		>
			{items?.map((item, i) => (
				<li className={`${styles.item} ${i == selected && styles.selected}`}
					key={item}
					role="menuitem"
					tabIndex={0}
					onClick={() => handleSelect(item, i)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") handleSelect(item, i);
					}}
				>
					{item}
				</li>
			))}
		</ul>
	);
}
