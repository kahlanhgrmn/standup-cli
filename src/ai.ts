import {GoogleGenerativeAI} from "@google/generative-ai";
import {Commit} from "./git";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


function formatCommits(commits: Commit[]): string{
    return commits
        .map((c) => `${c.message} (${c.date}) by ${c.author}`)
        .join("\n");
}

export async function summariseCommits(commits: Commit[]): Promise<string>{
    const formatted = formatCommits(commits);

    const model = client.getGenerativeModel({model: "gemini-1.5-flash"});

    const prompt = `You are a helpful assistant that will write daily standup summaries for developers.
                
                Given the following git commits, write a concise summary in plain English, 
                and also write it in first person and past tense, like the developer is the one speaking. 
                Also group the commits together so that it makes sense, and keep it to about 3-5 sentences. Write 
                it as a short paragraph and not bulleted or a list.
                
                Commits:
                ${formatted}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
}