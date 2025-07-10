import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const suggestSkillRoadmapTool = createTool({
  id: "suggest-skill-roadmap",
  description: "Suggest a roadmap of skills to learn for a given education path",
  inputSchema: z.object({
    educationPath: z.string(),
  }),
  outputSchema: z.object({
    skillRoadmap: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    const { educationPath } = context;

    const skillMap: { [key: string]: string[] } = {
      "data scientist": ["Python", "Pandas", "Machine Learning", "SQL", "Data Visualization", "Statistical Analysis", "Deep Learning", "Big Data", "Natural Language Processing", "A/B Testing", "Cloud Computing", "R", "Data Cleaning", "Time Series Analysis", "Experiment Design"],
      "software engineer": ["JavaScript", "Python", "Java", "C++", "Data Structures", "Algorithms", "Git", "React", "Node.js", "SQL", "RESTful APIs", "Docker", "AWS", "Testing", "Agile Methodology"],
      "ai engineer": ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision", "NLP", "MLOps", "Docker", "Kubernetes", "Cloud Platforms", "Data Engineering", "Model Deployment", "AI Ethics"],
      "cybersecurity analyst": ["Network Security", "Ethical Hacking", "Penetration Testing", "SIEM Tools", "Firewall Management", "Incident Response", "Vulnerability Assessment", "Cryptography", "Security Compliance", "Threat Intelligence", "Linux", "Python Scripting", "Cloud Security", "Risk Management", "Forensics"],
      "ux designer": ["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research", "Wireframing", "Design Systems", "Usability Testing", "Information Architecture", "Visual Design", "Interaction Design", "HTML/CSS", "Design Thinking", "Accessibility", "User Psychology"],
      "digital marketer": ["SEO", "Google Analytics", "Social Media Marketing", "Content Marketing", "Email Marketing", "PPC Advertising", "Conversion Rate Optimization", "Marketing Automation", "Copywriting", "Influencer Marketing", "Data Analysis", "Brand Management", "CRM Tools", "A/B Testing", "Growth Hacking"],
      "product manager": ["Product Strategy", "Market Research", "User Stories", "Agile Development", "Roadmapping", "Competitive Analysis", "Customer Development", "Metrics & KPIs", "Prioritization", "Stakeholder Management", "Prototyping", "A/B Testing", "Go-to-Market Strategy", "UX Principles", "Data-Driven Decision Making"],
      "teacher": ["Curriculum Design", "Classroom Management", "Educational Technology", "Assessment Design", "Differentiated Instruction", "Student Engagement", "Learning Psychology", "Communication Skills", "Presentation Skills", "Educational Software", "Online Teaching", "Special Education", "Multicultural Education", "Parent Communication", "Professional Development"],
      "graphic designer": ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Typography", "Color Theory", "Layout Design", "Branding", "Logo Design", "Print Design", "Web Design", "Illustration", "Photo Editing", "Design Systems", "Creative Strategy"],
      "content writer": ["SEO Writing", "Copywriting", "Blogging", "Content Strategy", "Research Skills", "Grammar & Style", "WordPress", "Google Analytics", "Social Media Content", "Email Marketing", "Technical Writing", "Creative Writing", "Brand Voice", "Content Planning", "Editing & Proofreading"],
      "mechanical engineer": ["CAD Design", "SolidWorks", "AutoCAD", "Finite Element Analysis", "Thermodynamics", "Fluid Mechanics", "Materials Science", "Manufacturing Processes", "Project Management", "Quality Control", "3D Printing", "Robotics", "HVAC Systems", "Machine Design", "Engineering Ethics"],
      "financial analyst": ["Excel", "Financial Modeling", "Valuation Techniques", "Financial Statements Analysis", "Investment Analysis", "Risk Assessment", "SQL", "Python", "R", "Tableau", "Bloomberg Terminal", "Financial Regulations", "Portfolio Management", "Derivatives", "Corporate Finance"]
    };

    const normalizedPath = educationPath.toLowerCase();
    let matchedSkills: string[] | undefined;

    // Try to match career from education path
    for (const [career, skills] of Object.entries(skillMap)) {
      if (normalizedPath.includes(career) || normalizedPath.includes(career.replace(' ', ''))) {
        matchedSkills = skills;
        break;
      }
    }

    // If no match found, try partial matching
    if (!matchedSkills) {
      if (normalizedPath.includes("computer") || normalizedPath.includes("software") || normalizedPath.includes("programming")) {
        matchedSkills = skillMap["software engineer"];
      } else if (normalizedPath.includes("data") || normalizedPath.includes("analytics")) {
        matchedSkills = skillMap["data scientist"];
      } else if (normalizedPath.includes("design") || normalizedPath.includes("ui") || normalizedPath.includes("ux")) {
        matchedSkills = skillMap["ux designer"];
      } else if (normalizedPath.includes("marketing") || normalizedPath.includes("digital")) {
        matchedSkills = skillMap["digital marketer"];
      } else if (normalizedPath.includes("security") || normalizedPath.includes("cyber")) {
        matchedSkills = skillMap["cybersecurity analyst"];
      }
    }

    const defaultSkills = [
      "Problem Solving",
      "Critical Thinking", 
      "Communication Skills",
      "Time Management",
      "Teamwork",
      "Leadership",
      "Adaptability",
      "Research Skills",
      "Technical Writing",
      "Project Management",
      "Data Analysis",
      "Computer Literacy",
      "Continuous Learning",
      "Creativity",
      "Attention to Detail"
    ];

    return {
      skillRoadmap: matchedSkills ?? defaultSkills,
    };
  },
});
