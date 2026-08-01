import { useParams } from "react-router";
import type { Route } from "./+types/ingenReka";
import Page from "~/components/Page/Page";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import styles from "~/styles/ingenReka.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA" }];
}

function beforeThisYear(year: number) {
	return (year - new Date().getFullYear() <= 0);
}



export default function IngenReka() {
	const navigate = useNavigate();
	const { slug } = useParams();
	const isValidSlug = slug && !isNaN(Number(slug)) && Number(slug) >= 1912;

	//Redirect til not-found hvis slug ikke er et tall eller er før 1912 (første REKA)
	useEffect(() => {
		if (!isValidSlug) {
			navigate("/not-found");
		}
	}, [isValidSlug, navigate]);

	if (!isValidSlug) return null;

	//Hmmm, ikke 100% fornøyd med teksten her enda, men syns konseptet e nice
	if (beforeThisYear(Number(slug))) {
		return <Page 
					navbar={<Navbar className="style-default" />}
					footer={<Footer className="style-default" />} 
					className="style-default">
					<h2>Det har dessverre ikke blitt laget en egen side for REKA-{slug} enda</h2>
					<h4>Hvis du har bilder eller annen informasjon om en REKA som ikke er representert, send gjerne inn til en REKA WEEB nær deg!</h4>
				</Page>	
	}
	else {
		return <Page 
					navbar={<Navbar className="style-default" />}
					footer={<Footer className="style-default" />} 
					className="style-default">
					<h2>Vi i REKA::WEB gleder oss like mye til REKA-{slug} som deg, men ingen side er tilgjengelig enda</h2>
					<h4>Gjerne engasjer deg for å bli med å lage den!</h4>
				</Page>	
	}
}
