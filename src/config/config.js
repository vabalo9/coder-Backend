import { Command } from "commander";

const program = new Command();

program.option('-p, --persistence <type>', 'type of persistence', 'MONGO');

program.parse(process.argv);

export let persistence = program.opts().persistence;
