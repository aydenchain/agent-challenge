import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

// Import semua tools yang sudah diperbaiki
import { collectUserProfileTool } from "../tools/edupath/collectUserProfile";
import { analyzePersonalityTool } from "../tools/edupath/analyzePersonality";
import { matchCareerTool } from "../tools/edupath/matchCareer";
import { recommendEducationPathTool } from "../tools/edupath/recommendEducationPath";
import { suggestSkillRoadmapTool } from "../tools/edupath/suggestSkillRoadmap";
import { simulateCareerTool } from "../tools/edupath/simulateCareer";
import { build5YearPlanTool } from "../tools/edupath/build5YearPlan";

// PERBAIKAN: Create steps dengan parameter yang benar
const collectUserProfileStep = createStep({
  id: "collect-user-profile",
  description: collectUserProfileTool.description,
  inputSchema: z.object({
    userDescription: z.string()
  }),
  outputSchema: z.object({
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 1: Collect User Profile");
    
    // PERBAIKAN: Akses data dari inputData
    const { userDescription } = executionContext.inputData;
    
    // PERBAIKAN: Buat ToolExecutionContext yang benar dengan struktur context
    const toolExecutionContext = {
      context: {
        userDescription
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    return await collectUserProfileTool.execute(toolExecutionContext);
  },
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
  outputSchema: z.object({
    personalityType: z.string(),
    personalityExplanation: z.string(),
    // Pass through dari step sebelumnya
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 2: Analyze Personality");
    
    // PERBAIKAN: Akses data dari inputData
    const { profileSummary, academicStrengths, hobbies, familyIncomeLevel } = executionContext.inputData;
    
    const toolExecutionContext = {
      context: {
        profileSummary,
        academicStrengths,
        hobbies,
        familyIncomeLevel
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    const result = await analyzePersonalityTool.execute(toolExecutionContext);
    
    // Pass through data dari step sebelumnya
    return {
      ...result,
      profileSummary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});

const matchCareerStep = createStep({
  id: "match-career",
  description: matchCareerTool.description,
  inputSchema: z.object({
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: z.object({
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 3: Match Career");
    
    // PERBAIKAN: Akses data dari inputData
    const { personalityType, personalityExplanation, profileSummary, academicStrengths, hobbies, familyIncomeLevel } = executionContext.inputData;
    
    const toolExecutionContext = {
      context: {
        personalityType,
        personalityExplanation
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    const result = await matchCareerTool.execute(toolExecutionContext);
    
    return {
      ...result,
      personalityType,
      personalityExplanation,
      profileSummary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});

const recommendEducationPathStep = createStep({
  id: "recommend-education-path",
  description: recommendEducationPathTool.description,
  inputSchema: z.object({
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: z.object({
    educationPath: z.string(),
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 4: Recommend Education Path");
    
    // PERBAIKAN: Akses data dari inputData
    const { recommendedCareers, personalityType, personalityExplanation, profileSummary, academicStrengths, hobbies, familyIncomeLevel } = executionContext.inputData;
    
    const toolExecutionContext = {
      context: {
        recommendedCareers
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    const result = await recommendEducationPathTool.execute(toolExecutionContext);
    
    return {
      ...result,
      recommendedCareers,
      personalityType,
      personalityExplanation,
      profileSummary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});

const suggestSkillRoadmapStep = createStep({
  id: "suggest-skill-roadmap",
  description: suggestSkillRoadmapTool.description,
  inputSchema: z.object({
    educationPath: z.string(),
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: z.object({
    skillRoadmap: z.array(z.string()),
    educationPath: z.string(),
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 5: Suggest Skill Roadmap");
    
    // PERBAIKAN: Akses data dari inputData
    const { educationPath, recommendedCareers, personalityType, personalityExplanation, profileSummary, academicStrengths, hobbies, familyIncomeLevel } = executionContext.inputData;
    
    const toolExecutionContext = {
      context: {
        educationPath
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    const result = await suggestSkillRoadmapTool.execute(toolExecutionContext);
    
    return {
      ...result,
      educationPath,
      recommendedCareers,
      personalityType,
      personalityExplanation,
      profileSummary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});

const simulateCareerStep = createStep({
  id: "simulate-career",
  description: simulateCareerTool.description,
  inputSchema: z.object({
    skillRoadmap: z.array(z.string()),
    educationPath: z.string(),
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: z.object({
    daySimulation: z.string(),
    skillRoadmap: z.array(z.string()),
    educationPath: z.string(),
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 6: Simulate Career");
    
    // PERBAIKAN: Akses data dari inputData
    const { skillRoadmap, educationPath, recommendedCareers, personalityType, personalityExplanation, profileSummary, academicStrengths, hobbies, familyIncomeLevel } = executionContext.inputData;
    
    const toolExecutionContext = {
      context: {
        skillRoadmap
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    const result = await simulateCareerTool.execute(toolExecutionContext);
    
    return {
      ...result,
      skillRoadmap,
      educationPath,
      recommendedCareers,
      personalityType,
      personalityExplanation,
      profileSummary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});

const build5YearPlanStep = createStep({
  id: "build-5-year-plan",
  description: build5YearPlanTool.description,
  inputSchema: z.object({
    daySimulation: z.string(),
    skillRoadmap: z.array(z.string()),
    educationPath: z.string(),
    recommendedCareers: z.array(z.string()),
    personalityType: z.string(),
    personalityExplanation: z.string(),
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: z.object({
    plan: z.string(),
  }),
  execute: async (executionContext) => {
    console.log("🔄 Step 7: Build 5-Year Plan");
    
    // PERBAIKAN: Akses data dari inputData
    const { daySimulation } = executionContext.inputData;
    
    const toolExecutionContext = {
      context: {
        daySimulation
      },
      runtimeContext: executionContext.runtimeContext
    };
    
    return await build5YearPlanTool.execute(toolExecutionContext);
  },
});

// PERBAIKAN: Workflow dengan input/output yang tepat
export const edupathWorkflow = createWorkflow({
  id: "edupathWorkflow",
  inputSchema: z.object({
    userDescription: z.string().describe("Describe your interests, strengths, and background."),
  }),
  outputSchema: z.object({
    plan: z.string(),
  }),
})
  .then(collectUserProfileStep)
  .then(analyzePersonalityStep)
  .then(matchCareerStep)
  .then(recommendEducationPathStep)
  .then(suggestSkillRoadmapStep)
  .then(simulateCareerStep)
  .then(build5YearPlanStep);

// Commit workflow
edupathWorkflow.commit();