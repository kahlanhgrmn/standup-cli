import {Command} from "commander";
import { pathToFileURL } from "node:url";

export interface Config{
    hours: number;
    repo: string;
    author: string | undefined;
}

// parse cli args and then return config

export function getConfig(): Config{
    const program = new Command();

    program
        .name("standup")
        .description("summarise your recent git commits")
        .version("1.0.0")
        .option("-h, --hours <number>", "how many hours back to look", "24")
        .option("-r, --repo <path>", "path to the git repo", ".")
        .option("-a, --author <name>", "filter commits by author name")
        .parse(process.argv);

    const opts = program.opts();

    return{
        hours: parseInt(opts.hours, 10),
        repo: opts.repo,
        author: opts.author,
    };
}