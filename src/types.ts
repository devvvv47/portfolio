export interface EducationItem {
  school: string;
  major: string;
  period: string;
  notes?: string;
}

export interface AskProcessItem {
  step: string;
  title: string;
  desc: string;
}

export interface CoreCapabilityItem {
  id?: string;
  title: string;
  desc: string;
}

export interface ProfileData {
  sectionTitle: string;
  subtitle: string;
  introduction: string;
  askSteps: AskProcessItem[];
  educations: EducationItem[];
  coreCapabilities?: CoreCapabilityItem[];
}

export interface CareerItem {
  id: string;
  company: string;
  teamRole: string;
  period: string;
  bulletPoints: string[];
}

export interface F1ProjectData {
  id?: string;
  title: string;
  subtitle: string;
  category: string;
  why: string;
  strategy: string;
  execution: string;
  role: string;
  results: string;
  stats: { label: string; value: string }[];
  tags: string[];
  imageUrl?: string;
  mockupMediaUrl?: string;
  followers?: string;
  views?: string;
  interactions?: string;
}

export interface CampaignProject {
  id: string;
  order: number;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  question: string;
  insight: string;
  answer: string;
  myRole: string;
  result: string;
  awardBadge?: string;
  awardBadges?: string[];
  imageUrl?: string;
  mediaUrl?: string; // photo or video placed above question/insight/answer
  accentColor?: string;
}

export interface MoreProjectItem {
  id: string;
  title: string;
  category: string;
  award?: string;
  awardBadges?: string[];
  question: string;
  insight: string;
  answer: string;
  myRole: string;
  result: string;
  imageUrl?: string;
  mediaUrl?: string;
}

export interface AwardItem {
  id: string;
  year: string;
  festival: string;
  tier: string;
  projectName: string;
  type: 'international' | 'domestic';
}

export interface ContactData {
  headline: string;
  subheadline: string;
  email: string;
  linkedin: string;
  instagram: string;
  resumeFileName: string;
}

export interface NavMenuItem {
  id: string;
  label: string;
  visible?: boolean;
}

export interface PortfolioData {
  navItems: NavMenuItem[];
  profile: ProfileData;
  careers: CareerItem[];
  f1Project: F1ProjectData;
  campaigns: CampaignProject[];
  moreProjects: MoreProjectItem[];
  awards: AwardItem[];
  contact: ContactData;
}
