import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const matchCareerTool = createTool({
  id: "match-career",
  description: "Match user personality type with possible career paths",
  inputSchema: z.object({
    personalityType: z.string(),
    personalityExplanation: z.string(),
  }),
  outputSchema: z.object({
    recommendedCareers: z.array(z.string()),
  }),
  async execute({ context }) {
    const { personalityType, personalityExplanation } = context;

    const careerMap: { [key: string]: string[] } = {
      INTJ: ["strategic", "analytical", "independent"],
      INFP: ["creative", "empathetic", "introspective"],
      ENFP: ["energetic", "outgoing", "innovative"],
      ISTP: ["practical", "hands-on", "logical"],
      ENTJ: ["organized", "leadership", "goal-oriented"],
      realistic: ["practical", "hands-on", "mechanical", "athletic", "enjoys tools/machinery"],
      investigative: ["analytical", "curious", "intellectual", "enjoys research", "problem-solving"],
      artistic: ["imaginative", "expressive", "non-conformist", "values originality", "creative"],
      social: ["empathetic", "patient", "communicative", "enjoys mentoring", "team-oriented"],
      enterprising: ["confident", "ambitious", "persuasive", "enjoys leadership", "risk-taking"],
      conventional: ["detail-oriented", "orderly", "reliable", "enjoys structured systems", "organized"],
      traits: ["practical", "hands-on", "mechanically-inclined", "athletic", "tool-oriented"],
      skills: ["equipment operation", "troubleshooting", "manual dexterity", "physical endurance", "technical repair"],
      environments: ["construction sites", "manufacturing plants", "farms", "engineering labs", "military"],
      blind_spots: ["abstract theory", "emotional discussions", "unstructured creativity"],
    };

    let recommendedCareers = careerMap[personalityType];

    if (!recommendedCareers) {
      const fallbackMatch = Object.entries(careerMap).find(([type]) =>
        personalityExplanation.toLowerCase().includes(type.toLowerCase())
      );

      if (fallbackMatch) {
        recommendedCareers = fallbackMatch[1];
      } else {
        // Final fallback
        recommendedCareers = ["Software Developer", "Digital Marketer", "UX Designer"];
      }
    }

    return { recommendedCareers };
  },
});
