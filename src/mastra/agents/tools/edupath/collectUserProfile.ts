import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const collectUserProfileTool = createTool({
  id: "collect-user-profile",
  description: "Collect user interests, academic strengths, and family income background",
  inputSchema: z.object({ userDescription: z.string() }),
  outputSchema: z.object({
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async ({ context }) => {
    const { userDescription } = context;
    const lower = userDescription.toLowerCase();

    const hobbies = lower.includes("puzzle") || lower.includes("game")
      ? "solving puzzles, logic games"
      : "general hobbies";

    const academicStrengths = lower.includes("number") || lower.includes("math")
      ? "mathematics and logical reasoning"
      : "unknown";

    const interest = lower.includes("things work") || lower.includes("engineering")
      ? "understanding systems or technology"
      : "unknown";

    const familyIncomeLevel = lower.includes("low income") || lower.includes("middle")
      ? "middle"
      : "unknown";

    const summary = `
🧠 You are interested in **${interest}**, and your hobby is **${hobbies}**.
💰 Your family's income level is identified as **${familyIncomeLevel}**, which will help us provide realistic educational recommendations.`.trim();

    return {
      profileSummary: summary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});
