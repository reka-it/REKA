import { createPortal } from "react-dom"
import styles from "./Toaster.module.scss"

type ToasterProps = {
	children?: React.ReactNode,
	className?: string,
}

export default function Toaster({ children, className }: ToasterProps) {
	return createPortal(<div></div>, document.body);
}
