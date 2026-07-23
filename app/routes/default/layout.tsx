import { Outlet } from "react-router";
import Footer from "~/components/Footer/Footer";
import GrainOverlay from "~/components/GrainOverlay/GrainOverlay";
import Navbar from "~/components/Navbar/Navbar";
import Page from "~/components/Page/Page";

export default function Layout() {
	return (
		<Page
			navbar={<Navbar className="style-default" />}
			footer={<Footer className="style-default" />}
			className="style-default"
		>
			<GrainOverlay />
			<Outlet />
		</Page>
	)
}
