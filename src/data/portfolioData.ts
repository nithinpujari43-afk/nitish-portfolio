import railOneImg from '../assets/images/project_railone_booking_1793213822204.jpg';
import potholeAiImg from '../assets/images/project_ai_pothole_detection_1793213824520.jpg';
import salesKpiImg from '../assets/images/project_sales_kpi_dashboard_1793213825497.jpg';
import churnAnalysisImg from '../assets/images/project_customer_churn_analysis_1793213826602.jpg';

export enum SkillCategory {
  ALL = 'all',
  PROGRAMMING = 'programming',
  FRONTEND = 'frontend',
  DATA = 'data',
  TOOLS = 'tools',
}

export enum ProjectCategory {
  ALL = 'all',
  WEB = 'web',
  AI = 'ai',
  ANALYTICS = 'analytics',
}

export enum CameraPreset {
  ISOMETRIC = 'isometric',
  CORE = 'core',
  ORBITAL = 'orbital',
}

export interface FocusDomain {
  id: string;
  label: string;
  shortLabel: string;
  headline: string;
  summary: string;
  stackLine: string;
  orbitAngle: number;
  orbitElevation: number;
}

export interface SkillItem {
  id: string;
  name: string;
  learningNote?: string;
  category: SkillCategory;
  categoryLabel: string;
  description: string;
  relatedProjects: string[];
  iconKey:
    | 'python'
    | 'javascript'
    | 'html5'
    | 'css3'
    | 'react'
    | 'sql'
    | 'analytics'
    | 'vscode'
    | 'github';
}

export interface ProjectItem {
  id: string;
  indexNumber: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  featuredWide?: boolean;
  description: string;
  architectureSummary: string;
  pipelineSteps: string[];
  highlights: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  statusNote: string;
}

export const PROFILE = {
  name: 'Nitish Kumar A',
  brand: 'NITISH.DEV',
  headline: "Hi, I'm Nitish Kumar A.",
  roles: ['Computer Science Student', 'Aspiring Data Analyst', 'AI Enthusiast'],
  description:
    'Passionate about transforming data into meaningful insights, exploring artificial intelligence, and building technology-driven solutions to real-world problems.',
  degree: 'B.Tech in Computer Science and Engineering',
  university: 'CMR University, Bengaluru',
  status: 'Third-Year Engineering Student',
  location: 'Bengaluru, Karnataka, India',
  linkedinUrl: 'https://www.linkedin.com/in/nitish-kumar-a-186043443',
  linkedinDisplay: 'linkedin.com/in/nitish-kumar-a-186043443',
};

export const FOCUS_DOMAINS: FocusDomain[] = [
  {
    id: 'data-analytics',
    label: 'Data Analytics',
    shortLabel: 'Analytics',
    headline: 'Structured KPI & Retention Analysis',
    summary:
      'Querying relational datasets and performing exploratory analysis to translate raw metrics into clear visual insights.',
    stackLine: 'SQL · Python · KPI Reporting · Visual Storytelling',
    orbitAngle: 0,
    orbitElevation: 0.45,
  },
  {
    id: 'artificial-intelligence',
    label: 'Artificial Intelligence',
    shortLabel: 'AI & Vision',
    headline: 'Computer Vision & Smart Hazard Detection',
    summary:
      'Prototyping camera and image-based road inspection workflows using YOLO object detection and FastAPI backends.',
    stackLine: 'Python · YOLO · FastAPI · Computer Vision',
    orbitAngle: (Math.PI * 2) / 5,
    orbitElevation: -0.35,
  },
  {
    id: 'software-development',
    label: 'Software Development',
    shortLabel: 'Full Stack',
    headline: 'End-to-End Reservation & Web Systems',
    summary:
      'Designing structured application flows such as RailOne railway ticket booking, train search, and passenger seat management.',
    stackLine: 'JavaScript · Python · SQL · Modular Architecture',
    orbitAngle: (Math.PI * 4) / 5,
    orbitElevation: 0.55,
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    shortLabel: 'ML Patterns',
    headline: 'Behavioral Pattern & Cohort Discovery',
    summary:
      'Studying feature relationships, customer lifecycle signals, and classification fundamentals on structured data.',
    stackLine: 'Python · Exploratory Data Analysis · Feature Signals',
    orbitAngle: (Math.PI * 6) / 5,
    orbitElevation: -0.45,
  },
  {
    id: 'web-technologies',
    label: 'Modern Web Technologies',
    shortLabel: 'Web UI',
    headline: 'Responsive & Accessible Interfaces',
    summary:
      'Building clean, responsive interfaces with semantic HTML5, modern CSS3, JavaScript, and component-driven React.',
    stackLine: 'HTML5 · CSS3 · JavaScript · React',
    orbitAngle: (Math.PI * 8) / 5,
    orbitElevation: 0.25,
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: SkillCategory.PROGRAMMING,
    categoryLabel: 'Programming',
    description:
      'Scripting, exploratory data manipulation, FastAPI backend endpoints, and YOLO computer vision prototyping.',
    relatedProjects: ['AI Pothole Detection', 'Customer Churn Analysis'],
    iconKey: 'python',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: SkillCategory.PROGRAMMING,
    categoryLabel: 'Programming',
    description:
      'Modern ES6+ application logic, interactive UI state, client-side validation, and asynchronous API handling.',
    relatedProjects: ['RailOne Booking', 'Interactive Portfolio'],
    iconKey: 'javascript',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: SkillCategory.FRONTEND,
    categoryLabel: 'Frontend',
    description:
      'Semantic document structure, WCAG accessibility landmarks, structured booking forms, and SEO metadata.',
    relatedProjects: ['RailOne Booking', 'Web Interfaces'],
    iconKey: 'html5',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: SkillCategory.FRONTEND,
    categoryLabel: 'Frontend',
    description:
      'Responsive Grid and Flexbox architecture, dark-mode surface hierarchy, fluid typography, and smooth transitions.',
    relatedProjects: ['RailOne Booking', 'Responsive Layouts'],
    iconKey: 'css3',
  },
  {
    id: 'react',
    name: 'React',
    learningNote: 'Learning',
    category: SkillCategory.FRONTEND,
    categoryLabel: 'Frontend · Learning',
    description:
      'Component-based frontend architecture, declarative state hooks, interactive filtering, and modular UI composition.',
    relatedProjects: ['RailOne Booking', 'Spatial Portfolio'],
    iconKey: 'react',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: SkillCategory.DATA,
    categoryLabel: 'Data & Analytics',
    description:
      'Relational schema design, multi-table joins, aggregations, schedule queries, and business KPI extraction.',
    relatedProjects: ['RailOne Booking', 'Enterprise Sales KPI'],
    iconKey: 'sql',
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    learningNote: 'Learning',
    category: SkillCategory.DATA,
    categoryLabel: 'Data & Analytics · Learning',
    description:
      'Cleaning structured datasets, evaluating sales and retention KPIs, and communicating clear analytical findings.',
    relatedProjects: ['Enterprise Sales KPI', 'Customer Churn Analysis'],
    iconKey: 'analytics',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: SkillCategory.TOOLS,
    categoryLabel: 'Tools',
    description:
      'Primary integrated development workspace for Python, SQL, and modern frontend debugging workflows.',
    relatedProjects: ['All Engineering Projects'],
    iconKey: 'vscode',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: SkillCategory.TOOLS,
    categoryLabel: 'Tools',
    description:
      'Git version control, repository organization, iterative commit history, and collaborative project documentation.',
    relatedProjects: ['Source Control & Documentation'],
    iconKey: 'github',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'railone',
    indexNumber: '01',
    title: 'RailOne — Railway Ticket Booking',
    subtitle: 'Full Stack Reservation & Journey Planning Application',
    category: ProjectCategory.WEB,
    categoryLabel: 'Software & Web Development',
    featuredWide: true,
    description:
      'A streamlined railway ticket reservation platform designed to simplify station-to-station train discovery, coach and seat availability checks, passenger booking flows, and digital ticket summaries.',
    architectureSummary:
      'Structured around an intuitive multi-step reservation workflow—connecting origin/destination route search, date and travel-class filtering, passenger manifest validation, and relational schedule/booking state management.',
    pipelineSteps: [
      'Origin & Destination Search',
      'Schedule & Coach Class Lookup',
      'Passenger Manifest Validation',
      'Digital PNR Ticket Summary',
    ],
    highlights: [
      'Station-to-station route search & timetable lookup',
      'Travel class selection & seat availability workflow',
      'Validated passenger manifest & digital PNR summary card',
      'Responsive, mobile-friendly ticket booking interface',
    ],
    technologies: ['JavaScript', 'React', 'HTML5', 'CSS3', 'SQL'],
    image: railOneImg,
    imageAlt:
      'Isometric dark architectural visualization of a modern electric passenger train on illuminated tracks for RailOne',
    statusNote:
      'Academic & portfolio full-stack development project demonstrating structured reservation workflows and responsive UI engineering.',
  },
  {
    id: 'ai-pothole-detection',
    indexNumber: '02',
    title: 'AI Pothole Detection',
    subtitle: 'Computer Vision Road Surface & Hazard Monitoring',
    category: ProjectCategory.AI,
    categoryLabel: 'Artificial Intelligence & Vision',
    featuredWide: true,
    description:
      'An AI-powered road monitoring project designed to detect potential potholes from road images and camera input, supporting hazard reporting and safer, smarter navigation.',
    architectureSummary:
      'Combines a Python and FastAPI inference pipeline with YOLO object detection to inspect uploaded road frames or camera captures, returning bounding-box hazard detections to a navigation-oriented interface.',
    pipelineSteps: [
      'Road Image / Camera Capture',
      'FastAPI Frame Preprocessing',
      'YOLO Bounding-Box Inference',
      'Hazard Alert & Report View',
    ],
    highlights: [
      'AI-based pothole & road surface anomaly detection',
      'Camera-frame & image input detection prototype',
      'Structured road hazard reporting workflow',
      'Navigation-focused alert & inspection interface',
    ],
    technologies: ['Python', 'FastAPI', 'YOLO', 'React Native', 'Expo'],
    image: potholeAiImg,
    imageAlt:
      'Technical isometric visualization of optical computer vision scanning planes over an urban asphalt roadway',
    statusNote:
      'Academic & portfolio AI prototype exploring practical computer vision for road safety.',
  },
  {
    id: 'enterprise-sales-kpi',
    indexNumber: '03',
    title: 'Enterprise Sales KPI Dashboard',
    subtitle: 'Business Performance & Revenue Metrics Study',
    category: ProjectCategory.ANALYTICS,
    categoryLabel: 'Data Analytics & BI',
    description:
      'A data analytics portfolio project focused on exploring business performance through sales metrics, regional KPIs, order trends, and structured visual insights.',
    architectureSummary:
      'Aggregates transactional sales records using SQL queries and Python data preparation to evaluate revenue trajectories, regional segment contributions, and product category performance.',
    pipelineSteps: [
      'Raw Transactional Records',
      'SQL Joins & Aggregations',
      'KPI Metric Formulation',
      'Visual Trend Storytelling',
    ],
    highlights: [
      'Period-over-period revenue & order velocity tracking',
      'Regional & category contribution comparison',
      'Structured executive KPI summary views',
      'Decision-oriented visual data storytelling',
    ],
    technologies: ['Data Analytics', 'Business Intelligence', 'KPI Analysis', 'SQL'],
    image: salesKpiImg,
    imageAlt:
      'Minimalist dark 3D glass bar chart sculpture with a luminous cyan trendline on obsidian slate',
    statusNote:
      'Data analytics portfolio study focused on KPI formulation and visual reporting.',
  },
  {
    id: 'customer-churn-analysis',
    indexNumber: '04',
    title: 'Customer Churn Analysis',
    subtitle: 'Behavioral Retention & Cohort Pattern Exploration',
    category: ProjectCategory.ANALYTICS,
    categoryLabel: 'Data Analytics & Insights',
    description:
      'A data-focused project exploring customer lifecycle behavior and identifying key usage and contract patterns associated with customer retention.',
    architectureSummary:
      'Applies exploratory data analysis in Python to examine tenure distributions, subscription structures, and engagement signals that distinguish long-term retained users from at-risk cohorts.',
    pipelineSteps: [
      'Customer Lifecycle Dataset',
      'Python Data Cleaning & EDA',
      'Cohort & Tenure Segmentation',
      'Retention Pattern Insights',
    ],
    highlights: [
      'Exploratory data analysis of tenure & contract signals',
      'Cohort retention & attrition pattern comparison',
      'Identification of key customer retention drivers',
      'Clear analytical summary of behavioral insights',
    ],
    technologies: ['Data Analytics', 'Python', 'Customer Insights'],
    image: churnAnalysisImg,
    imageAlt:
      'Isometric crystalline data network branching across an obsidian surface representing customer cohort analysis',
    statusNote:
      'Data analytics portfolio study examining customer retention patterns with Python.',
  },
];
