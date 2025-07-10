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
  execute: async ({ context }) => {
    const { personalityType, personalityExplanation } = context;

    // PERBAIKAN: Mapping yang lebih akurat tanpa duplikasi
    const careerMap: { [key: string]: string[] } = {
      INTJ: ["Data Scientist", "Software Engineer", "Systems Architect", "Research Scientist"],
      INFP: ["UX Designer", "Content Writer", "Therapist", "Teacher"],
      ENFP: ["Digital Marketer", "Product Manager", "Entrepreneur", "Sales Manager"],
      ISTP: ["Cybersecurity Analyst", "Mechanical Engineer", "Technician", "Network Administrator"],
      ENTJ: ["Product Manager", "Business Analyst", "CEO", "Project Manager"],
      INTP: ["Software Developer", "Data Analyst", "Research Scientist", "AI Engineer"],
      ISFP: ["Graphic Designer", "Artist", "Photographer", "Interior Designer"],
      ESFP: ["Marketing Specialist", "Event Planner", "Teacher", "Social Media Manager"],
      ISTJ: ["Financial Analyst", "Accountant", "Quality Assurance", "Database Administrator"],
      ESTJ: ["Operations Manager", "HR Manager", "Sales Director", "Supply Chain Manager"],
      ISFJ: ["Healthcare Professional", "Teacher", "HR Specialist", "Customer Service Manager"],
      ESFJ: ["Teacher", "Healthcare Administrator", "Marketing Coordinator", "Event Coordinator"],
      INFJ: ["UX Researcher", "Counselor", "Writer", "Nonprofit Manager"],
      ENFJ: ["Teacher", "HR Manager", "Coach", "Public Relations Manager"],
      ESTP: ["Sales Representative", "Entrepreneur", "Marketing Manager", "Project Coordinator"]
    };

    let recommendedCareers = careerMap[personalityType];

    if (!recommendedCareers) {
      // Fallback based on personality explanation
      const explanation = personalityExplanation.toLowerCase();
      
      if (explanation.includes("analytical") || explanation.includes("logical")) {
        recommendedCareers = ["Data Scientist", "Software Engineer", "Financial Analyst"];
      } else if (explanation.includes("creative") || explanation.includes("artistic")) {
        recommendedCareers = ["UX Designer", "Graphic Designer", "Content Writer"];
      } else if (explanation.includes("social") || explanation.includes("people")) {
        recommendedCareers = ["Teacher", "HR Specialist", "Marketing Manager"];
      } else if (explanation.includes("practical") || explanation.includes("hands-on")) {
        recommendedCareers = ["Technician", "Mechanical Engineer", "IT Support"];
      } else {
        // Final fallback
        recommendedCareers = ["Software Developer", "Digital Marketer", "UX Designer"];
      }
    }

    return { recommendedCareers };
  },
});