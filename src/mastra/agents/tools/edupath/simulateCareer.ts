import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const simulateCareerTool = createTool({
  id: "simulate-career",
  description: "Simulate what a day looks like in the user's chosen career based on skill roadmap",
  inputSchema: z.object({
    skillRoadmap: z.array(z.string()).min(1, "Minimal 1 skill diperlukan"),
  }),
  outputSchema: z.object({
    daySimulation: z.string(),
  }),
  execute: async ({ context }) => {
    const { skillRoadmap } = context;

    const firstSkill = skillRoadmap[0] ?? "research";
    const secondSkill = skillRoadmap[1] ?? "communication";
    const thirdSkill = skillRoadmap[2] ?? "problem-solving";
    const lastSkill = skillRoadmap[skillRoadmap.length - 1] ?? "reflection";

    const useGit = skillRoadmap.some(skill =>
      skill.toLowerCase().includes("git") || skill.toLowerCase().includes("version control")
    );

    const workStyle = skillRoadmap.some(skill =>
      skill.toLowerCase().includes("remote") || skill.toLowerCase().includes("tools")
    )
      ? "remote setup (Slack, Notion, Zoom)"
      : "onsite collaborative team";

    const daySimulation = `
🕘 Career Day Simulation
-------------------------
• 09:00 — Start your day reviewing tasks using **${firstSkill}**
• 10:30 — Collaborate with team using ${useGit ? "**Git & code reviews**" : "**planning tools**"}
• 13:00 — Focused deep work using **${thirdSkill}**
• 15:30 — Apply **${secondSkill}** for documentation or discussions
• 17:00 — Wrap up with **${lastSkill}** and wind down in a ${workStyle}
    `.trim();

    return { daySimulation };
  },
});
