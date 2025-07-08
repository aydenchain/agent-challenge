# 🎓 EduPath Agent – Personalized AI Career Planner
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Nosana](https://img.shields.io/badge/runs%20on-nosana-orange)


![EduPath Agent Banner](./assets/Nosana-Challenge-Edupath.png)
![EduPath Agent flow](./assets/Flow-edupath.png)

**EduPath Agent** is an AI-powered career advisor built with the [Mastra](https://mastra.ai) framework for the [Nosana Builders Challenge](https://earn.superteam.fun/agent-challenge). It helps students explore career paths, align with their strengths, and design a personalized 5-year development roadmap — all through an intelligent, conversational agent.

---

## ✨ Key Features

- **🎯 Personalized Profiling**  
  Gathers academic background, interests, and preferences.

- **🧠 Personality Insight**  
  Analyzes personality types (e.g., INTJ, ENFP) and suggests suitable careers.

- **💼 Career Matching**  
  Recommends logical career paths based on user profile.

- **🎓 Education Roadmap**  
  Suggests degrees, certifications, or learning tracks.

- **🛠️ Skill Recommendations**  
  Maps out technical skills for the next 3–5 years.

- **📆 5-Year Plan Builder**  
  Produces a structured, achievable development roadmap.

- **📽️ Career Simulation**  
  Simulates a realistic day-in-the-life of selected career paths.

---

## 🔍 Feature Details

### 🎯 Personalized Profiling

EduPath begins by understanding the user on a personal level. It collects information about:

- Academic strengths  
- Hobbies and interests  
- Preferred work style (independent vs collaborative)  
- Socioeconomic background

This foundation ensures all advice is tailored, grounded, and personalized.

### 🧠 Personality Insight

The agent uses conversational context and common personality theory (like MBTI) to identify:

- Your personality type (e.g., INTJ, ENFP)  
- Your working style and preferences  
- Best communication and motivation approach for your type

### 💼 Career Matching

With your profile and personality mapped, EduPath recommends career options by:

- Matching interests with market-relevant careers  
- Filtering based on personality and workstyle  
- Prioritizing long-term fit and fulfillment

### 🎓 Education Roadmap

Each career suggestion comes with a clear education plan:

- Recommended university degrees  
- Certification programs (Google, AWS, Coursera, etc.)  
- Online learning or bootcamp alternatives  
- Budget-conscious paths for all income levels

### 🛠 Skill Recommendations

EduPath builds a learning path over 3–5 years including:

- Programming languages, design tools, or data skills  
- Project-based learning and real-world applications  
- Communication and collaboration skills  
- Learning sources (MOOCs, GitHub, YouTube, etc.)

### 📽 Career Simulation

To help visualize your future, EduPath simulates:

- A typical workday in your selected career  
- Example tasks, tools, and meetings  
- Work style (remote, hybrid, on-site)  
- Lifestyle implications

### 📆 5-Year Plan Builder

You'll receive a full roadmap with:

- Education goals  
- Skill progression timeline  
- Suggested internships or freelance gigs  
- Open-source contribution opportunities  
- Annual reassessment milestones

---

## 🧠 How It Works

The agent runs a modular pipeline:

1. `collectUserProfile` – Gathers personal data  
2. `analyzePersonality` – Infers MBTI/work style  
3. `matchCareer` – Finds compatible roles  
4. `recommendEducationPath` – Suggests education options  
5. `suggestSkillRoadmap` – Creates skills plan  
6. `simulateCareer` – Shows typical workday  
7. `build5YearPlan` – Generates complete roadmap

---

## 💻 Run It Locally

### 🔧 Prerequisites

- Node.js v18+
- [pnpm](https://pnpm.io/installation)
- [Ollama](https://ollama.com/) (optional for local LLM)

### 🚀 Start Development Server

```bash
pnpm install
pnpm run dev

---
Visit http://localhost:8080 in your browser.
---
## ⚙️ Environment Setup
cp .env.example .env

### For Ollama 
API_BASE_URL=http://localhost:11434/api
MODEL_NAME_AT_ENDPOINT=qwen2.5:1.5b

Make sure your Ollama is running on background

---
## 🐳 Docker Support
### Build Image
docker build -t edupath-agent .
### Run Container
docker run -p 8080:8080 edupath-agent
### Push to Docker Hub (Optional)
docker tag edupath-agent yourusername/edupath-agent:dev
docker push yourusername/edupath-agent:dev

##  Sample Use Case
### User Input:
I enjoy programming, science, and working independently. I dislike social interaction-heavy jobs.
### EduPath Output:
Personality Type: INTJ
Career Matches: 
  - Data Scientist
  - Systems Architect
  - Cybersecurity Analyst
Education Path:
  - BSc in Computer Science
  - Data Analytics Certification
Skill Roadmap:
  - Year 1: Python, Algorithms
  - Year 2: Machine Learning Basics
  - Year 3: Cloud Infrastructure
Simulated Workday:
  - 09:00: Analyze datasets
  - 11:00: Build prediction models
  - 14:00: Code optimization
  - 16:00: Report writing

## 🙌 Acknowledgements
Thanks to:

Mastra – Modular AI framework

Nosana – Decentralized hosting

Open Source Community

---

## 📦 Submission Links

- 🔗 Live Agent Nosana: ( https://dashboard.nosana.com/jobs/GqBNcRyX7oEFNpzUBBP4ntjj6oNUnA4CDaBnB4sDXbQn )
- 🐳 Docker Image: (https://hub.docker.com/r/aydenchain/agent-challenge)
- 📹 Demo Video: (link twitter)
- 💻 Source Code: (https://github.com/aydenchain/agent-challenge)





