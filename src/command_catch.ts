import type { State } from "./state.js";

export async function commandCatch(
	state: State,
	pokemonName?: string,
): Promise<void> {
	if (!pokemonName) {
		throw new Error("You must specify a Pokémon to catch");
	}

	console.log(`Throwing a Pokeball at ${pokemonName}...`);

	try {
		const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

		// higher base_experience -> harder to catch
		const catchChance = 1 / (1 + (pokemon.base_experience / 100));
		const roll = Math.random();

		if (roll < catchChance) {
			state.pokedex[pokemon.name] = pokemon;
			console.log(`${pokemon.name} was caught!`);
		} else {
			console.log(`${pokemon.name} escaped!`);
		}
	} catch (e) {
		console.error(`Could not find Pokémon '${pokemonName}': ${(e as Error).message}`);
	}
}
