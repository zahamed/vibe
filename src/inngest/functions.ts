
import { openai, anthropic, gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { success } from "zod";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {

    // Create a new agent with a system prompt (you can add optional tools, too)
    const summerizer = createAgent({
      name: "summerizer",
      system: "You are an expert summerizer.  You summerize in 2 words.",
      //model: openai({ model: "gpt-4o" }),
      //model: anthropic({ model: "claude-3-5-haiku-latest" }),
      //model: gemini({ model: "gemini-1.5-flash" }),
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    //const { output } = await summerizer.run(`Summarize the following text: ${event.data.value}`);

    //console.log("Summerizer:", output);

     // Create a new agent with a system prompt (you can add optional tools, too)
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer.  You write readable, maintainable code. You write simple Next.js & React Snippets.",
      //model: openai({ model: "gpt-4o" }),
      //model: anthropic({ model: "claude-3-5-haiku-latest" }),
      //model: gemini({ model: "gemini-1.5-flash" }),
      model: gemini({ model: "gemini-2.0-flash" }),
    });


    const { output } = await codeAgent.run(`Write the following snippet: ${event.data.value}`);

    console.log("codesnippet:", output);

    return { output };

  },
);