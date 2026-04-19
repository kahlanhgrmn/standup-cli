# standup-cli

A command line tool that summarises your recent git commits into a concise daily standup using a locally running AI model. No API keys, no paid tokens, and no accounts: everything runs entirely on your own machine.

## How it works

`standup-cli` reads your recent git commit history using `git log` and sends the commits to a local AI model running through [Ollama](https://ollama.com). The model summarises the commits into a short and readable paragraph written in first person (similar to the type of update that would be given in a daily standup meeting).

Because the AI runs locally via Ollama, there are no API keys to set up, no accounts to create, and no usage costs at all, so your commit history never leaves your machine.

## Requirements

- [Node.js](https://nodejs.org) v18 or higher
- [Ollama](https://ollama.com) installed and running
- The `llama3.2` model pulled via Ollama

## Installation

**1. Install Ollama**

Go to [ollama.com](https://ollama.com) and follow the installation instructions for your operating system.

On Linux or WSL:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**2. Pull the llama3.2 model**

```bash
ollama pull llama3.2
```

This is a one time download. Ollama will automatically serve the model in the background when needed and unload it when idle, this means that it won't sit in your RAM all day taking up space.

**3. Clone and install standup-cli**

```bash
git clone https://github.com/kahlanhgrmn/standup-cli.git
cd standup-cli
npm install
```

## Usage

Run the tool from inside any git repository:

```bash
npm run dev
```

Or build and install it globally so you can use the `standup` command from anywhere on your machine:

```bash
npm run build
npm install -g .
standup
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--hours <number>` | How many hours back to look for commits | `24` |
| `--repo <path>` | Path to the git repository | `.` (current directory) |
| `--author <name>` | Filter commits by author name | none |

## Examples

Summarise your commits from the last 24 hours in the current repo:
```bash
standup
```

Summarise commits from the last 48 hours:
```bash
standup --hours 48
```

Get a weekly summary:
```bash
standup --hours 168
```

Point it at a different project on your machine:
```bash
standup --repo ~/Code/portfolio_projects/my-other-project
```

Filter by your name on a team project:
```bash
standup --repo ~/Code/my-team-project --author "Kahlan"
```

Combine options:
```bash
standup --repo ~/Code/my-team-project --author "Kahlan" --hours 48
```

## Example output from this project

```
standup summary:
─────────────────────────────────────
Today I worked on implementing the Gemini API for the AI model. I created the necessary files (`ai.ts` and `index.ts`) and set up the configuration, including adding dev scripts and a dotenv file to manage environment variables. 

I then switched to using Ollama's local version of the AI, which no longer requires paid tokens. This change also involved refining the prompt in `ai.ts` and adjusting how the AI reads the commits to ensure they are in the correct order.

I completed the merge of pull request #2 from my own feature branch, which added improvements to the Git parsing capabilities.
─────────────────────────────────────
```

## Why local AI?

Most AI-powered tools require you to sign up for an API, manage keys, and pay per request. `standup-cli` uses Ollama to run the AI model directly on your machine, which means:

- **No API key required** - nothing to sign up for or manage
- **No cost** - unlimited usage with no tokens or credits
- **Private** - your commit history never leaves your machine
- **Works offline** - no internet connection needed once Ollama and the model are installed

## Tech stack

- TypeScript / Node.js
- [Ollama](https://ollama.com) — local AI model runner
- [llama3.2](https://ollama.com/library/llama3.2) — language model for summarisation
- [Commander.js](https://github.com/tj/commander.js) — CLI argument parsing
