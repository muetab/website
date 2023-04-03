import type { CollectionEntry } from "astro:content";
import type { APIContext } from 'astro';
import { getCollection } from "astro:content";
import getLocale from "@lib/getLocale";

type Modify<T, R> = Omit<T, keyof R> & R;
type Changelog = Modify<CollectionEntry<"changelog">, {
	slug: string;
}>

export async function getStaticPaths() {
	const versions: Changelog[] = await getCollection("changelog");
	const locales = new Set(versions.map((version) => version.slug.split("/").shift()));
	return [...locales].map((locale) => ({ params: { locale } }));
}

export async function get(ctx: APIContext) {
	let versions: Changelog[] = await getCollection("changelog");
	versions = versions
		.filter((version) => version.slug.split("/").shift() === ctx.params.locale)
		.map((version) => {
			version.slug = version.slug.split("/").slice(1).join("/");
			return version;
		});
	return {
		body: JSON.stringify(versions),
	};
}
