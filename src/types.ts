export interface Service {
  id: string;
  title: string;
  description: string;
  category: "web" | "software" | "marketing" | "ai" | "cloud";
  iconName: string;
  bulletPoints: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "Web Design" | "SaaS" | "E-commerce" | "AI" | "Software" | "Branding";
  previewUrl: string;
  technologies: string[];
  problem: string;
  solution: string;
  businessResults: string;
  liveUrl?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  logoText: string;
  rating: number;
  successStory: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsApp: string;
  businessWebsite?: string;
  servicesInterested: string[];
  budget: string;
  timeline: string;
  message: string;
  submittedAt: string;
  status: "new" | "contacted" | "archived";
}

export interface BookingAppointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  message?: string;
  bookedAt: string;
}
