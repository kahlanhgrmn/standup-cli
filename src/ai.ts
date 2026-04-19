import {Commit} from "./git";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2";

function formatCommits(commits: Commit[]): string{
    return commits
        .map((c) => `${c.message} (${c.date}) by ${c.author}`)
        .join("\n");
}

export async function summariseCommits(commits: Commit[]): Promise<string>{
    const formatted = formatCommits(commits);

    const prompt = `You are a helpful assistant that will write daily standup summaries for developers.
                
                Given the following git commits, write a concise summary in plain English, 
                and also write it in first person and past tense, like the developer is the one speaking. 
                Also group the commits together so that it makes sense, and keep it to about 3-5 sentences. Write 
                it as a short paragraph and not bulleted or a list.
                
                Commits:
                ${formatted}`;


    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            model: MODEL,
            prompt,
            stream: false,
        }),
    });

    if(!response.ok){
        throw new Error(`ollama request failed with status ${response.status}`);


    }

    const data = await response.json() as {response: string};
    return data.response;
}