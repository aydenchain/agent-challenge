import { z } from "zod";
import { createWorkflow, createStep } from "@mastra/core/workflows";

import { collectUserProfileTool } from "../tools/edupath/collectUserProfile";
import { analyzePersonalityTool } from "../tools/edupath/analyzePersonality";
import { matchCareerTool } from "../tools/edupath/matchCareer";
import { recommendEducationPathTool } from "../tools/edupath/recommendEducationPath";
import { suggestSkillRoadmapTool } from "../tools/edupath/suggestSkillRoadmap";
import { simulateCareerTool } from "../tools/edupath/simulateCareer";
import { build5YearPlanTool } from "../tools/edupath/build5YearPlan";

const collectUserProfileStep = createStep({
  id: "collect-user-profile",
  description: collectUserProfileTool.description,
  inputSchema: z.object({ userDescription: z.string() }),
  outputSchema: collectUserProfileTool.outputSchema,
  execute: collectUserProfileTool.execute,
});

const analyzePersonalityStep = createStep({
  id: "analyze-personality",
  description: analyzePersonalityTool.description,
  inputSchema: z.object({
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: analyzePersonalityTool.outputSchema,
  execute: analyzePersonalityTool.execute,
});

const matchCareerStep = createStep({
  id: "match-career",
  description: matchCareerTool.description,
  inputSchema: z.object({
    personalityType: z.string(),
    personalityExplanation: z.string(),
  }),
  outputSchema: matchCareerTool.outputSchema,
  execute: matchCareerTool.execute,
});

const recommendEducationPathStep = createStep({
  id: "recommend-education-path",
  description: recommendEducationPathTool.description,
  inputSchema: z.object({
    recommendedCareers: z.array(z.string()),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: recommendEducationPathTool.outputSchema,
  execute: recommendEducationPathTool.execute,
});

const suggestSkillRoadmapStep = createStep({
  id: "suggest-skill-roadmap",
  description: suggestSkillRoadmapTool.description,
  inputSchema: z.object({
    educationPath: z.string(),
  }),
  outputSchema: suggestSkillRoadmapTool.outputSchema,
  execute: suggestSkillRoadmapTool.execute,
});

const simulateCareerStep = createStep({
  id: "simulate-career",
  description: simulateCareerTool.description,
  inputSchema: z.object({
    skillRoadmap: z.array(z.string()),
  }),
  outputSchema: simulateCareerTool.outputSchema,
  execute: simulateCareerTool.execute,
});

const build5YearPlanStep = createStep({
  id: "build-5-year-plan",
  description: build5YearPlanTool.description,
  inputSchema: z.object({
    daySimulation: z.string(),
  }),
  outputSchema: build5YearPlanTool.outputSchema,
  execute: build5YearPlanTool.execute,
});

export const edupathWorkflow = createWorkflow({
  id: "edupath-workflow",
  inputSchema: z.object({
    userDescription: z.string(),
  }),
  outputSchema: build5YearPlanTool.outputSchema,
})
  .then(collectUserProfileStep)
  .then(analyzePersonalityStep)
  .then(matchCareerStep)
  .then(recommendEducationPathStep)
  .then(suggestSkillRoadmapStep)
  .then(simulateCareerStep)
  .then(build5YearPlanStep);

edupathWorkflow.commit();
