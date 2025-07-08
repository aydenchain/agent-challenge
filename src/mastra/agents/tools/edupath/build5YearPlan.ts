import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const build5YearPlanTool = createTool({
  id: "build-5-year-plan",
  description: "Generate a 5-year roadmap based on the career day simulation using internal skill map",
  inputSchema: z.object({
    daySimulation: z.string(),
  }),
  outputSchema: z.object({
    plan: z.string(),
  }),
  execute: async ({ context }) => {
    const { daySimulation } = context;

    const skillMap: Record<string, string[]> = {
      "data scientist": ["Python", "SQL", "Machine Learning", "Data Visualization", "Statistics"],
      "software engineer": ["JavaScript", "System Design", "Testing", "Git", "DevOps"],
      "cybersecurity analyst": ["Networking", "Linux", "SIEM", "Penetration Testing", "Incident Response"],
      "ux researcher": ["Figma", "User Testing", "Psychology", "Accessibility", "UX Writing"],
      "systems architect": ["Cloud Architecture", "Docker", "Microservices", "CI/CD", "Kubernetes"],
    };

    let matchedJob = "Generalist";
    let matchedSkills = ["Exploration", "Skill Development", "Project Work", "Mentorship", "Specialization"];

    for (const [job, skills] of Object.entries(skillMap)) {
      if (daySimulation.toLowerCase().includes(job.toLowerCase())) {
        matchedJob = job;
        matchedSkills = skills;
        break;
      }
    }

    const plan = `
📅 5-Year Plan for ${matchedJob}:
- Year 1: Learn ${matchedSkills[0]}
- Year 2: Practice ${matchedSkills[1]}
- Year 3: Apply ${matchedSkills[2]} in real projects
- Year 4: Advance in ${matchedSkills[3]} and share knowledge
- Year 5: Lead teams or specialize deeply in ${matchedSkills[4]}
    `.trim();

    return { plan };
  },
});
