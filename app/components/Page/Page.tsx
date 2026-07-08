import styles from "./Page.module.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

type PageProps = {
    children?: React.ReactNode;
    navBarClassName?: string;
    footerClassName?: string;
};

export default function Page({children, navBarClassName, footerClassName }: PageProps) {
    return (
        <>
            <Navbar className={navBarClassName} />
            <main className={styles.page}>
                {children}
            </main>
            <Footer className={footerClassName} />
        </>
    )
}