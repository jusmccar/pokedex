import type { State } from "./state.js";

export async function commandExplore(
	state: State,
	areaName?: string,
): Promise<void> {
	if (!areaName) {
		throw new Error("You must specify a location area to explore");
	}

	console.log(`Exploring ${areaName}...`);

	const location = await state.pokeAPI.fetchLocation(areaName);

	console.log("Found Pokemon:");

	for (const encounter of location.pokemon_encounters) {
		console.log(` - ${encounter.pokemon.name}`);
	}
}
