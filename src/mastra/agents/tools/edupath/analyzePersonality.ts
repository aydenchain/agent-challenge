import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const analyzePersonalityTool = createTool({
  id: "analyze-personality",
  description: "Analyze user's personality traits based on their profile using internal model map",
  inputSchema: z.object({
    profileSummary: z.string(),
    academicStrengths: z.string(),
    hobbies: z.string(),
    familyIncomeLevel: z.string(),
  }),
  outputSchema: z.object({
    personalityType: z.string(),
    personalityExplanation: z.string(),
  }),
  execute: async ({ context }) => {
    const { profileSummary, academicStrengths, hobbies } = context;

    const personalityMap: Record<string, string[]> = {
      INTJ: ["strategic", "analytical", "independent"],
      INFP: ["creative", "empathetic", "introspective"],
      ENFP: ["energetic", "outgoing", "innovative"],
      ISTP: ["practical", "hands-on", "logical"],
      ENTJ: ["organized", "leadership", "goal-oriented"],
    };

    let selectedType = "INTP";
    let explanation = "No exact match found, defaulting to INTP personality type.";

    for (const [type, traits] of Object.entries(personalityMap)) {
      const match = traits.some((trait) =>
        profileSummary.toLowerCase().includes(trait) ||
        academicStrengths.toLowerCase().includes(trait) ||
        hobbies.toLowerCase().includes(trait)
      );

      if (match) {
        selectedType = type;
        explanation = `You are suited as a ${selectedType}, because you tend to be ${traits.slice(0, 3).join(", ")}.`;
        break;
      }
    }

    return {
      personalityType: selectedType,
      personalityExplanation: explanation,
    };
  },
});
