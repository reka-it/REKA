import { Outlet } from "react-router";
import Footer from "~/components/Footer/Footer";
import GrainOverlay from "~/components/GrainOverlay/GrainOverlay";
import Navbar from "~/components/Navbar/Navbar";
import Page from "~/components/Page/Page";

export default function Layout() {
	return (
		<Page
			navbar={<Navbar className="style-2026" />}
			footer={<Footer className="style-2026" />}
			className="style-2026"
		>
			<GrainOverlay intensity={0.4} />
			<Outlet />
		</Page>
	)
}
