import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { edupathAgent } from "./agents/edupath-agent/edupath-agent";
import { edupathWorkflow } from "./agents/edupath-agent/edupath-workflow";

export const mastra = new Mastra({
  agents: {
    edupathAgent,
  },
  workflows: {
    edupathWorkflow,
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  server: {
    port: 8080,
    timeout: 10000,
  },
});