import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const recommendEducationPathTool = createTool({
  id: "recommend-education-path",
  description: "Suggest educational paths based on user's career goals and background",
  inputSchema: z.object({
    recommendedCareers: z.array(z.string()),
  }),
  outputSchema: z.object({
    educationPath: z.string(),
  }),
  execute: async ({ context }) => {
    const { recommendedCareers } = context;
    const careerChoice = recommendedCareers[0]?.toLowerCase() ?? "generalist";

    const educationMap: { [key: string]: string } = {
      "data scientist": "BSc in Computer Science, followed by a Data Science bootcamp or MSc in Analytics.",
      "cybersecurity analyst": "Start with CompTIA Security+ certification, then a BSc in Cybersecurity or Information Security.",
      "software engineer": "Pursue a BSc in Informatics or attend a full-stack coding bootcamp.",
      "ux researcher": "Study Psychology or HCI, optionally earn the Google UX Design Certificate.",
      "systems architect": "BSc in Computer Engineering, then specialize via cloud certifications (AWS, Azure).",
      "writer": "Pursue a BA in Literature or Journalism. Practice with blogging and online publishing.",
      "product manager": "Earn a degree in Business or Computer Science, then gain experience in cross-functional teams.",
      "teacher": "Start with a degree in Education, then specialize in your subject area and get teaching credentials.",
    };

    const matchedPath = educationMap[careerChoice];
    const defaultPath = `To become a ${careerChoice}, you can start with free online courses, then pursue a relevant bachelor's degree or certification depending on your resources.`;

    return {
      educationPath: matchedPath ?? defaultPath,
    };
  },
});
