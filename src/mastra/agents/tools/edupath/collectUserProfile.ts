import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const collectUserProfileTool = createTool({
  id: "collect-user-profile",
  description: "Collect user interests, academic strengths, and family income background",
  inputSchema: z.object({
    userDescription: z.string().describe("A sentence about your interests, strengths, and preferences"),
  }),
  outputSchema: z.object({
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  execute: async ({ context }) => {
    console.log("✅ [collect-user-profile] Received context:", context);

    // PERBAIKAN: Pastikan context ada dan userDescription tersedia
    const { userDescription } = context || {};

    if (!userDescription || typeof userDescription !== "string") {
      console.error("❌ Invalid or missing 'userDescription':", userDescription);
      throw new Error("Missing input: 'userDescription' is required.");
    }

    let academicStrengths = "General problem solving";
    let hobbies = "exploring ideas, working independently";
    let familyIncomeLevel = "middle income";

    // Enhanced parsing logic
    const lowerDesc = userDescription.toLowerCase();
    
    if (lowerDesc.includes("math") || lowerDesc.includes("science") || lowerDesc.includes("coding")) {
      academicStrengths = "Math, Science, and Programming";
    } else if (lowerDesc.includes("art") || lowerDesc.includes("design") || lowerDesc.includes("creative")) {
      academicStrengths = "Creative Arts and Design";
    } else if (lowerDesc.includes("help") || lowerDesc.includes("people") || lowerDesc.includes("teach")) {
      academicStrengths = "Communication and People Skills";
    }

    if (lowerDesc.includes("game") || lowerDesc.includes("computer") || lowerDesc.includes("tech")) {
      hobbies = "gaming, technology, programming";
    } else if (lowerDesc.includes("sport") || lowerDesc.includes("outdoor") || lowerDesc.includes("physical")) {
      hobbies = "sports, outdoor activities";
    } else if (lowerDesc.includes("read") || lowerDesc.includes("book") || lowerDesc.includes("write")) {
      hobbies = "reading, writing, learning";
    }

    if (lowerDesc.includes("lower") || lowerDesc.includes("budget") || lowerDesc.includes("afford")) {
      familyIncomeLevel = "lower income";
    } else if (lowerDesc.includes("upper") || lowerDesc.includes("wealthy") || lowerDesc.includes("rich")) {
      familyIncomeLevel = "upper income";
    }

    const profileSummary = `
🧠 You are someone who enjoys challenges and solving problems.
🎯 Your academic strengths include: ${academicStrengths}.
🎮 Your hobbies seem to be: ${hobbies}.
💰 Your family income level is estimated as: ${familyIncomeLevel}.
    `.trim();

    return {
      profileSummary,
      academicStrengths,
      hobbies,
      familyIncomeLevel,
    };
  },
});