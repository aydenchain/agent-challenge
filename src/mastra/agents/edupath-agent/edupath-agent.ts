import { Agent } from "@mastra/core/agent";
import { model } from "../../config";

// Tools
import { collectUserProfileTool } from "../tools/edupath/collectUserProfile";
import { analyzePersonalityTool } from "../tools/edupath/analyzePersonality";
import { matchCareerTool } from "../tools/edupath/matchCareer";
import { recommendEducationPathTool } from "../tools/edupath/recommendEducationPath";
import { suggestSkillRoadmapTool } from "../tools/edupath/suggestSkillRoadmap";
import { simulateCareerTool } from "../tools/edupath/simulateCareer";
import { build5YearPlanTool } from "../tools/edupath/build5YearPlan";
import { edupathWorkflow } from "../edupath-agent/edupath-workflow";

const instructions = `
You are EduPath, an AI educational assistant that helps junior and senior high school students find the most suitable career path based on their personality, skills, and background.

You must:
- Ask the user for personal interests, favorite subjects, and academic strengths.
- Analyze personality traits from the user's input.
- Match their profile to suitable careers.
- Recommend the best educational path based on their interests and family background.
- Suggest a skill-building roadmap for the next 3–5 years.
- Simulate their possible future in selected careers and provide a 5-year action plan.
Always explain your reasoning clearly, and give friendly, inspiring answers.
`;

export const edupathAgent = new Agent({
  name: "EduPath Agent",
  instructions,
  model,
  tools: {
    collectUserProfileTool,
    analyzePersonalityTool,
    matchCareerTool,
    recommendEducationPathTool,
    suggestSkillRoadmapTool,
    simulateCareerTool,
    build5YearPlanTool,
  },
  workflows: {
  },
});
