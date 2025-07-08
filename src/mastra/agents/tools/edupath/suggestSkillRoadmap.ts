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
      "graphic designer": ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Typography", "Color Theory", "UI/UX Design", "Branding & Identity", "Motion Graphics", "Print Design", "Photo Editing", "Layout Design", "Illustration", "3D Modeling", "Prototyping", "Design Thinking"],

      "data scientist": ["Python", "Pandas", "Machine Learning", "SQL", "Data Visualization", "Statistical Analysis", "Deep Learning", "Big Data", "Natural Language Processing", "A/B Testing", "Cloud Computing", "R", "Data Cleaning", "Time Series Analysis", "Experiment Design"],

      "teacher": ["Public Speaking", "Curriculum Design", "Educational Psychology", "Classroom Management", "Differentiated Instruction", "Assessment Design", "Special Education Strategies", "E-Learning Tools", "Multicultural Education", "Student Engagement Techniques", "Parent-Teacher Communication", "Lesson Planning", "STEM/STEAM Education", "Literacy Development", "Behavioral Intervention"],

      "entrepreneur": ["Business Strategy", "Digital Marketing", "Networking", "Fundraising", "Financial Modeling", "Sales & Negotiation", "Lean Startup Methodology", "Market Research", "Product Development", "Pitching & Investor Relations", "Supply Chain Management", "SEO & Content Marketing", "Social Media Growth", "Risk Management", "Leadership & Team Building"],

      "technician": ["Schematic Reading", "Troubleshooting", "Electrical Safety", "Soldering", "Equipment Calibration", "Preventive Maintenance", "Hydraulics & Pneumatics", "Welding", "CNC Machining", "HVAC Systems", "Automotive Diagnostics", "PLC Programming", "Robotics Maintenance", "Quality Control", "OSHA Compliance"],
      "software engineer": ["JavaScript", "Python", "Java", "C++", "Data Structures", "Algorithms", "Git", "React", "Node.js", "SQL", "RESTful APIs", "Docker", "AWS", "Testing", "Agile Methodology"],

      "digital marketer": ["SEO", "Google Analytics", "Social Media Marketing", "Content Marketing", "Email Marketing", "PPC Advertising", "Conversion Rate Optimization", "Marketing Automation", "Copywriting", "Influencer Marketing", "Data Analysis", "Brand Management", "CRM Tools", "A/B Testing", "Growth Hacking"],

      "cybersecurity analyst": ["Network Security", "Ethical Hacking", "Penetration Testing", "SIEM Tools", "Firewall Management", "Incident Response", "Vulnerability Assessment", "Cryptography", "Security Compliance", "Threat Intelligence", "Linux", "Python Scripting", "Cloud Security", "Risk Management", "Forensics"],

      "product manager": ["Product Strategy", "Market Research", "User Stories", "Agile Development", "Roadmapping", "Competitive Analysis", "Customer Development", "Metrics & KPIs", "Prioritization", "Stakeholder Management", "Prototyping", "A/B Testing", "Go-to-Market Strategy", "UX Principles", "Data-Driven Decision Making"],

      "financial analyst": ["Financial Modeling", "Excel", "Valuation", "Forecasting", "Data Analysis", "PowerPoint", "SQL", "Accounting Principles", "Investment Analysis", "Risk Assessment", "Portfolio Management", "Business Intelligence", "ERP Systems", "Regulatory Compliance", "Dashboard Reporting"],

      "hr specialist": ["Recruitment", "Employee Relations", "Performance Management", "Compensation & Benefits", "HR Policies", "Talent Development", "Onboarding", "Workplace Diversity", "HR Analytics", "Labor Law Compliance", "Training Programs", "Conflict Resolution", "Employer Branding", "Payroll Systems", "Organizational Development"],

      "content writer": ["SEO Writing", "Copywriting", "Blogging", "Editing", "Content Strategy", "Research", "Social Media Content", "Storytelling", "Technical Writing", "Creative Writing", "Brand Voice", "Content Management Systems", "Email Campaigns", "Plagiarism Check", "Keyword Optimization"],

      "healthcare professional": ["Patient Care", "Medical Terminology", "HIPAA Compliance", "Electronic Health Records", "Clinical Procedures", "Diagnostic Tools", "Patient Education", "Team Collaboration", "Infection Control", "Medical Coding", "Emergency Response", "Pharmaceutical Knowledge", "Healthcare Ethics", "Vital Signs Monitoring", "Regulatory Standards"],

      "architect": ["AutoCAD", "Revit", "SketchUp", "3D Modeling", "Building Codes", "Sustainable Design", "Space Planning", "Construction Documentation", "Project Management", "Material Selection", "Photorealistic Rendering", "Urban Planning", "Structural Principles", "Client Presentations", "Cost Estimation"],

      "mechanical engineer": ["CAD Design", "Finite Element Analysis", "Thermodynamics", "Fluid Mechanics", "Manufacturing Processes", "Prototyping", "Material Science", "Machine Design", "Quality Control", "Project Management", "Robotics", "HVAC Systems", "3D Printing", "Simulation Software", "DFM Principles"]
    };

    const normalizedPath = educationPath.toLowerCase();
    let matchedSkills: string[] | undefined;

    for (const [career, skills] of Object.entries(skillMap)) {
      if (normalizedPath.includes(career)) {
        matchedSkills = skills;
        break;
      }
    }

    const defaultSkills = [
      "Basic computer literacy",
      "Problem solving",
      "Coding in Python",
      "Version control (Git)",
      "Building simple projects",
    ];

    return {
      skillRoadmap: matchedSkills ?? defaultSkills,
    };
  },
});
