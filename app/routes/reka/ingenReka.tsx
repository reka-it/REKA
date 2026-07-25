import { useParams } from "react-router";
import type { Route } from "./+types/ingenReka";
import Page from "~/components/Page/Page";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

function beforeThisYear(year: number) {
	return (year - new Date().getFullYear() <= 0);
}

export default function IngenReka() {
	const { slug } = useParams();

	//Hmmm, ikke 100% fornøyd med teksten her enda, men syns konseptet e nice
	if (beforeThisYear(Number(slug))) {
		return <Page 
					navbar={<Navbar className="style-default" />}
					footer={<Footer className="style-default" />} 
					className="style-default">
					<h3>Det har dessverre ikke blitt laget en egen side for denne REKA enda</h3>
					<h4>Hvis du har bilder eller annen informasjon om en REKA som ikke er representert, send gjerne inn til en REKA WEEB nær deg!</h4>
				</Page>	
	}
	else {
		return <Page 
					navbar={<Navbar className="style-default" />}
					footer={<Footer className="style-default" />} 
					className="style-default">
					<h2>Vi i REKA::WEB gleder oss like mye til REKA-{slug} som deg</h2>
				</Page>	
	}
}
