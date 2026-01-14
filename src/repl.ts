import readline from "node:readline";
import { CLICommand, getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	const commands: Record<string, CLICommand> = getCommands();

	rl.on("line", (line) => {
		const words = cleanInput(line);
		const commandName = words[0];
		const command = commands[commandName];

		if (command) {
			try {
				command.callback(commands);
			} catch (err) {
				console.error("Error executing command:", err);
			}
		} else {
			console.log("Unknown command");
		}

		rl.prompt();
	});

	rl.on("close", () => {
		console.log();
		commands["exit"].callback(commands);
	});

	rl.prompt();
}
