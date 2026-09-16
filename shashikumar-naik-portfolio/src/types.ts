export interface Skill {
  name: string;
  category: 'Languages' | 'Backend' | 'Core Java' | 'Databases' | 'Tools & DevOps' | 'Core CS & Practices';
  level: string; // e.g. 'Advanced', 'Proficient', 'Core'
  highlight?: string;
  appliedIn: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  period?: string;
  tags: string[];
  techStack: string[];
  overview: string;
  bulletPoints: string[];
  architectureSummary: string;
  architectureSteps: { step: string; detail: string }[];
  keyDecisions: { decision: string; why: string; alternative: string }[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
  apiEndpoints?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
    sampleResponse: string;
  }[];
  githubUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skillsUsed: string[];
  metrics?: { label: string; value: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  location: string;
  cgpa?: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  type?: string;
  year?: string;
  description: string;
}

export interface ClusterNode {
  id: string;
  name: string;
  status: 'LEADER' | 'FOLLOWER' | 'DEAD';
  heartbeatCount: number;
  lastHeartbeatTime: number;
  isProcessing: boolean;
}

export interface CacheNode {
  key: string;
  value: string;
  timestamp: number;
}
