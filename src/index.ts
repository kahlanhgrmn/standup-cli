import {getConfig} from "./config";
import {getRecentCommits} from "./git";
import {summariseCommits} from "./ai";
import "dotenv/config";

async function main(){
    const config = getConfig();

    console.log(`\nfetching commits from last ${config.hours} hours\n`);

    const commits = getRecentCommits(config.hours, config.repo);

    if(commits.length === 0){
        console.log("no commits found in that time range")

        process.exit(0);
    }

    const filtered = config.author? 
        commits.filter((c)=> c.author.toLowerCase().includes(config.author!.toLowerCase())) : commits;

    if(filtered.length === 0){
        console.log(`no commits found for author "${config.author}"`)

        process.exit(0);
    }

    console.log(`found ${filtered.length} commit(s), summarising\n`);

    const summary = await summariseCommits(filtered);

    console.log("standup summary: ");
    console.log("-------------------------------");
    console.log(summary);
    console.log("-------------------------------\n");
}

main().catch((error)=>{
    console.error("error: ", error.message);
    process.exit(1);
});