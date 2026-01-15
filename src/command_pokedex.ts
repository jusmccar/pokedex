import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
	const caughtPokemon = Object.keys(state.pokedex);

	if (caughtPokemon.length === 0) {
		console.log("You have not caught any Pokémon yet.");
		return;
	}

	console.log("Your Pokedex:");

	for (const name of caughtPokemon) {
		console.log(` - ${name}`);
	}
}
