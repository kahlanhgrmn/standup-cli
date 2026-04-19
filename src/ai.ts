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
                
                Given the following git commits, write a concise standup summary of the commits in plain English. 
                Write the summary in the first person and in past tense, as if the developer themself is speaking. 
                Group all related commits together in a way that makes sense for the commits, and keep it to about 3-5 sentences. 
                Write it in the form of a paragraph, and don't make it bulleted or a list, just as a normal paragraph. 
                Do not include any introduction line or preamble, and also do not include any quotes. Only include the summary 
                paragraph itself. Do not make it sound overly friendly or excited, keep it professional and concise.
                
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