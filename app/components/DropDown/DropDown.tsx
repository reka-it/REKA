import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./DropDown.module.scss";

type DropDownProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	items: string[];
	selected: number;
	onSelect: (item: string, index: number) => void;
	anchorRef: React.RefObject<HTMLElement | null>;
};

export default function DropDown({
	open,
	setOpen,
	items,
	selected,
	onSelect,
	anchorRef,
}: DropDownProps) {
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const dropdownRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!open || !anchorRef.current) return;
		const rect = anchorRef.current.getBoundingClientRect();
		setPosition({
			top: rect.bottom + window.scrollY + 4,
			left: rect.left + window.scrollX,
		});
	}, [open, anchorRef]);

	useEffect(() => {
		if (!open) return;
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node) &&
				anchorRef.current &&
				!anchorRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open, anchorRef, setOpen]);

	return createPortal(
		<ul className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
			ref={dropdownRef}
			style={{ top: position.top, left: position.left }}
		>
			{items.map((item, i) => (
				<li
					key={item}
					className={`${styles.item} ${i === selected && styles.selected}`}
					onClick={(e) => {
						e.stopPropagation();
						onSelect(item, i);
						setOpen(false);
					}}
				>
					{item}
				</li>
			))}
		</ul>,
		document.body
	);
}
