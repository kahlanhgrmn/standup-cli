import {execSync} from "child_process";

export interface Commit{
    hash: string;
    message: string;
    author: string;
    date: string;
}

// run the git log and then return commits that are structured
export function getRecentCommits(hours: number = 24, repoPath: string = "."): Commit[]{
    const sinceTimestamp = Math.floor(Date.now() / 1000) - hours * 60 * 60;

    const format = "%H|%s|%an|%ai";
    const command = `git -C "${repoPath}" log --since="${sinceTimestamp}" --format="${format}"`;

    let output: string;

    try{
        output = execSync(command, {encoding: "utf-8"}).trim();
    }

    catch(error){
        throw new Error(`failed to run git log in "${repoPath}": ${error}`);

    }

    if(!output){
        return[];
    }

    return output.split("\n").map((line) => {
        const[hash, message, author, date]=line.split("|");

        return{hash, message, author, date};
    });
}