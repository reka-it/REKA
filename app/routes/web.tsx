import type { Route } from "./+types/earlier";

export function meta({ }: Route.MetaArgs) {
    return [{ title: "REKA::WEB" }];
}

export default function webPage() {
    return <>
        <h2>REKA::WEB inn i REKAstyret når?</h2>
        <h6><a href="https://github.com/reka-it/REKA/issues/31">Se issue #31</a></h6>
        <img src="/web-logo.png" style={{ width: '25rem', height: '25rem' }}></img>
    </>
}