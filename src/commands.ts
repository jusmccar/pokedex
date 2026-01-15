import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
	return {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		exit: {
			name: "exit",
			description: "Exit the Pokedex",
			callback: commandExit,
		},
		map: {
			name: "map",
			description: "Get the next page of locations",
			callback: commandMapForward,
		},
		mapb: {
			name: "mapb",
			description: "Get the previous page of locations",
			callback: commandMapBack,
		},
		explore: {
			name: "explore",
			description: "Explore a location area and list Pokémon found there",
			callback: commandExplore,
		},
	};
}
