import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";

// Import dari path yang benar berdasarkan struktur tree
import { edupathAgent } from "./agents/edupath-agent/edupath-agent";
import { edupathWorkflow } from "./agents/edupath-agent/edupath-workflow";

// Import tools dari path yang benar
import { collectUserProfileTool } from "./agents/tools/edupath/collectUserProfile";
import { analyzePersonalityTool } from "./agents/tools/edupath/analyzePersonality";
import { matchCareerTool } from "./agents/tools/edupath/matchCareer";
import { recommendEducationPathTool } from "./agents/tools/edupath/recommendEducationPath";
import { suggestSkillRoadmapTool } from "./agents/tools/edupath/suggestSkillRoadmap";
import { simulateCareerTool } from "./agents/tools/edupath/simulateCareer";
import { build5YearPlanTool } from "./agents/tools/edupath/build5YearPlan";

export const mastra = new Mastra({
  workflows: {
    "edupathWorkflow": edupathWorkflow,
  },
  
  agents: {
    "edupathAgent": edupathAgent,
  },
  
  // Remove tools from top-level config
  // Tools should be registered with agents instead
  
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  
  server: {
    port: 8080,
    timeout: 10000,
  },
});