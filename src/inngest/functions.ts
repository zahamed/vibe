
import { Sandbox } from '@e2b/code-interpreter'

import { openai, anthropic, gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { success } from "zod";
import { getSandbox } from './util';


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create('vibe-nextjs-test0025');
      return sandbox.sandboxId;
    });


    // Create a new agent with a system prompt (you can add optional tools, too)
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer.You write readable, maintainable code. You write simple Next.js & React Snippets.",
      //model: openai({ model: "gpt-4o" }),
      //model: anthropic({ model: "claude-3-5-haiku-latest" }),
      //model: gemini({ model: "gemini-1.5-flash" }),
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const { output } = await codeAgent.run(`Write the following snippet: ${event.data.value}`);

    console.log("codesnippet:", output);

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxUrl };

  },
);