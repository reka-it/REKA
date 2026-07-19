import styles from "./Page.module.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import GrainOverlay from "../GrainOverlay/GrainOverlay";

type PageProps = {
	children?: React.ReactNode;
	className?: string; //Styling for the Page's main content area
	navBarClassName?: string;
	footerClassName?: string;
};

export default function Page({ children, className, navBarClassName, footerClassName }: PageProps) {
	return (
		<>
			<Navbar className={[styles.navBar, navBarClassName].filter(Boolean).join(" ")} />
			<main className={[styles.content, className].filter(Boolean).join(" ")}>
				{children}
			</main>
			<Footer className={footerClassName} />
		</>
	)
}
