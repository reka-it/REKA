import { useLayoutEffect, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./DropDown.module.scss";

type Item = {
	id: string,
	display: ReactNode | string,
}

type DropDownProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	items: Item[];
	selected: number;
	onSelect: (item: string, index: number) => void;
	anchorRef: React.RefObject<HTMLElement | null>;
};

const GAP = 4;

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

	useLayoutEffect(() => {
		if (!open || !anchorRef.current || !dropdownRef.current) return;

		function updatePosition() {
			const anchor = anchorRef.current;
			const dropdown = dropdownRef.current;
			if (!anchor || !dropdown) return;

			const anchorRect = anchor.getBoundingClientRect();
			// offsetWidth/Height ignore the open/closed scale transform, so they
			// reflect the dropdown's real size even while it's still animating in.
			const dropdownWidth = dropdown.offsetWidth;
			const dropdownHeight = dropdown.offsetHeight;

			const spaceBelow = window.innerHeight - anchorRect.bottom;
			const spaceAbove = anchorRect.top;
			const flipUp = spaceBelow < dropdownHeight + GAP && spaceAbove > spaceBelow;
			const top = flipUp
				? anchorRect.top - dropdownHeight - GAP
				: anchorRect.bottom + GAP;

			const desiredLeft = anchorRect.left;
			const spaceRight = window.innerWidth - desiredLeft;
			const spaceLeft = anchorRect.right;
			const flipLeft = spaceRight < dropdownWidth && spaceLeft > spaceRight;
			const left = flipLeft
				? anchorRect.right - dropdownWidth
				: desiredLeft;

			setPosition({ top, left });
		}

		updatePosition();
		window.addEventListener("resize", updatePosition);
		return () => window.removeEventListener("resize", updatePosition);
	}, [open, anchorRef, items]);

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

	return (
		<ul className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
			ref={dropdownRef}
			style={{ top: position.top, left: position.left }}
		>
			{items.map(({ id, display }, i) => (
				<li
					key={i}
					className={`${styles.item} ${i === selected && styles.selected}`}
					onClick={(e) => {
						e.stopPropagation();
						onSelect(id, i);
						setOpen(false);
					}}
				>
					{display}
				</li>
			))}
		</ul>
	);
}
