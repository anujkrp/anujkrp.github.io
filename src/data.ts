import { Service, Project, ProcessStep, Testimonial, FAQ } from "./types";

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "Premium, responsive, high-performance web development with modern architecture, designed to load fast and rank high on search engines.",
    category: "web",
    iconName: "Globe",
    bulletPoints: [
      "Custom Corporate Websites",
      "SaaS Product Landings",
      "Headless E-commerce Stores",
      "High-Converting Landing Pages",
      "Tailored WordPress Solutions",
      "Bespoke headless CMS integration"
    ]
  },
  {
    id: "soft-dev",
    title: "Software Development",
    description: "Scalable custom software applications to streamline your business workflows, centralize operations, and drive daily efficiency.",
    category: "software",
    iconName: "Cpu",
    bulletPoints: [
      "Custom CRM & Client Portals",
      "Tailored ERP & Billing Systems",
      "Inventory & Dispatch Trackers",
      "Booking & Consultation Engines",
      "School & Clinic Managers",
      "Secure API architecture"
    ]
  },
  {
    id: "digital-mktg",
    title: "Digital Marketing",
    description: "Data-driven marketing campaigns to capture buyer intent, optimize cost-per-acquisition, and double your organic lead flow.",
    category: "marketing",
    iconName: "TrendingUp",
    bulletPoints: [
      "Enterprise & Local SEO",
      "High-ROI Google Ad Campaigns",
      "Facebook & LinkedIn Advertising",
      "Social Media Marketing",
      "Strategic Content Writing",
      "Conversion Rate Optimization (CRO)"
    ]
  },
  {
    id: "ai-sol",
    title: "AI Solutions & Automation",
    description: "Leverage intelligent AI agents and autonomous workflows to handle repetitive administrative tasks and qualify prospective leads 24/7.",
    category: "ai",
    iconName: "Sparkles",
    bulletPoints: [
      "Custom Trained AI Chatbots",
      "Autonomous Lead Qualification",
      "No-code / Low-code Automations (Make, Zapier)",
      "Intelligent Email & Workspace Agents",
      "Seamless Gemini / OpenAI integrations",
      "Data ingestion & automated tagging"
    ]
  },
  {
    id: "cloud-host",
    title: "Hosting & Cloud Infrastructure",
    description: "Deploy and scale your systems securely with enterprise-grade cloud setups, automated backups, and military-grade SSL/DDOS protection.",
    category: "cloud",
    iconName: "CloudLightning",
    bulletPoints: [
      "Domain & Premium Web Hosting",
      "Virtual Private Servers (VPS)",
      "AWS / GCP Auto-scaling Pipelines",
      "Server Audits & Speed Optimization",
      "Ongoing SSL & Security Management",
      "Automated Hourly/Daily Database Backups"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "AcuityMetrics Subscription Suite",
    category: "SaaS",
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "TypeScript", "Node.js", "TailwindCSS", "D3.js", "Express"],
    problem: "A venture-backed FinTech startup was struggling to aggregate multi-channel subscription transactions, leading to accurate MRR reporting delays and high subscriber churn.",
    solution: "Designed a secure SaaS dashboard that integrates with Stripe and Recurly APIs, providing real-time churn charts, cohort analysis, and customizable client invoice pipelines.",
    businessResults: "Reduced monthly subscriber churn by 18% in 90 days and automated invoice tracking, saving the operations team 15+ manual hours every week.",
    liveUrl: "#"
  },
  {
    id: "project-2",
    title: "PulseCRM Enterprise Logistics ERP",
    category: "Software",
    previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Laravel", "MySQL", "Docker", "AWS", "TailwindCSS"],
    problem: "A regional logistics firm was operating on fragmented Excel spreadsheets, resulting in dispatch miscommunications and duplicate sales callbacks.",
    solution: "Engineered an integrated ERP & CRM dashboard with drag-and-drop shipment boards, automated WhatsApp notifications for drivers, and hierarchical manager permissions.",
    businessResults: "Centralized 14,000+ accounts, increased dispatch throughput by 32%, and entirely eliminated booking/delivery overlaps.",
    liveUrl: "#"
  },
  {
    id: "project-3",
    title: "ScribeAI Support Agent Pipeline",
    category: "AI",
    previewUrl: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "Python", "FastAPI", "Gemini API", "PostgreSQL", "TailwindCSS"],
    problem: "A high-volume customer care agency was drowning in chat logs, spending hours analyzing complaints and drafts.",
    solution: "Built an autonomous Gemini-based voice-to-text pipeline that structures call logs, tags risk levels, and drafts professional client replies instantly.",
    businessResults: "Slashed email resolution times from 3.5 hours to 9 minutes and saved approximately $55,000 in support agent overhead.",
    liveUrl: "#"
  },
  {
    id: "project-4",
    title: "VibeWeave High-Fashion E-Store",
    category: "E-commerce",
    previewUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "TypeScript", "TailwindCSS", "Node.js", "Stripe", "PostgreSQL"],
    problem: "A designer clothing brand suffered a 7.5-second mobile load time, causing an alarming 76% cart abandonment rate.",
    solution: "Engineered a headless, mobile-first Shopify storefront, static path generation, ultra-fast Stripe client elements, and optimized image compression.",
    businessResults: "Mobile load speed decreased to 0.8 seconds (99 Lighthouse score), mobile checkout conversions skyrocketed by 110%, and checkout drop-off rate fell to 34%.",
    liveUrl: "#"
  },
  {
    id: "project-5",
    title: "Elysian Global Branding & Design",
    category: "Branding",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    technologies: ["Brand Identity", "UI/UX Architecture", "Typography Guidelines", "Figma"],
    problem: "A clean-energy firm lacked a unified brand appearance across its regional branches, weakening investor credibility during institutional funding proposals.",
    solution: "Rebuilt a comprehensive visual identity system from scratch, complete with digital brand manuals, custom vector layouts, and WCAG-accessible digital products.",
    businessResults: "Established visual consistency, reducing developers' frontend assembly times by 45%, and successfully secured $15M during Series A.",
    liveUrl: "#"
  },
  {
    id: "project-6",
    title: "Apex Wealth Management Landing",
    category: "Web Design",
    previewUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Framer Motion", "TailwindCSS", "Local SEO Strategy"],
    problem: "An asset advisory practice had a standard, static page that struggled to convert digital search traffic, resulting in zero inbound consults.",
    solution: "Designed a luxurious, high-contrast scrolling landing page featuring immersive transitions, animated wealth simulators, and localized schema markup.",
    businessResults: "Inbound organic leads surged by 220% and ranked in Google's Top 3 map pack for regional asset consulting.",
    liveUrl: "#"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Discovery Call",
    description: "We map out your business objectives, target audience, and project scope over a quick 30-minute introductory call."
  },
  {
    stepNumber: 2,
    title: "Strategic Planning",
    description: "We formulate a detailed technical blueprint, define fixed deliverables, list milestones, and lay out the system architecture."
  },
  {
    stepNumber: 3,
    title: "UI/UX Design",
    description: "I craft elegant, SaaS-inspired visual wireframes and high-fidelity layouts in Figma, customized for modern high-end appeal."
  },
  {
    stepNumber: 4,
    title: "Elite Development",
    description: "Your product is hand-coded using state-of-the-art frameworks with neat, highly optimized, and maintainable structures."
  },
  {
    stepNumber: 5,
    title: "Rigorous QA",
    description: "Comprehensive multi-device validation, speed optimizations, security checks, and cross-browser testing to guarantee Lighthouse 95+ score."
  },
  {
    stepNumber: 6,
    title: "Production Launch",
    description: "We transition your system onto production servers, complete with domain linkages, professional SSL lock, and final speed testing."
  },
  {
    stepNumber: 7,
    title: "Dedicated Support",
    description: "Ongoing 30-day post-launch support, 24/7 server monitoring, incremental automated backups, and continuous optimizations."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Marcus Vance",
    role: "Chief Executive Officer",
    company: "AcuityMetrics Inc.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    logoText: "ACUITY",
    rating: 5,
    successStory: "Working with AK Design Studio was an absolute game-changer. They didn't just write code; they understood our business model. The metrics dashboard they built reduced our client churn rate by 18% in the first quarter itself. The speed, design, and absolute perfection are unparalleled!"
  },
  {
    id: "t2",
    name: "Elena Rostova",
    role: "Director of Product",
    company: "Nexis Cloud Solutions",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    logoText: "NEXIS",
    rating: 5,
    successStory: "We needed a complex custom CRM dashboard completed in under six weeks. Anuj delivered a masterclass in software engineering. The platform is blindingly fast, responsive, and incredibly clean. Our sales agents are saving hours daily!"
  },
  {
    id: "t3",
    name: "Dr. Aris Thorne",
    role: "Founder & Chief of Operations",
    company: "Elysian Health",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    logoText: "ELYSIAN",
    rating: 5,
    successStory: "Our previous clinical appointment system was clunky. AK Design Studio re-engineered our booking workflows and automated notifications. The design feels like a modern SaaS platform. Booking drop-offs decreased by 40% immediately!"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "q1",
    question: "Do you work with clients globally?",
    answer: "Absolutely! I serve startups, businesses, and agencies across the globe. We coordinate via Slack, Discord, email, and scheduled Zoom/WhatsApp video briefings to keep you fully updated, regardless of your time zone."
  },
  {
    id: "q2",
    question: "How long does a typical project take to design & build?",
    answer: "A custom high-converting landing page or business website typically takes 1 to 2 weeks. Complex full-scale e-commerce stores, tailor-made ERP/CRM dashboards, and specialized AI automation pipelines can range from 4 to 8 weeks depending on integration requirements."
  },
  {
    id: "q3",
    question: "Do I own 100% of the project's source code and intellectual property?",
    answer: "Yes, fully. Upon project wrap-up and final milestone clearance, complete ownership, visual copyrights, and clean, unencrypted source code assets are completely signed over to you. We transfer everything cleanly via a private GitHub repository or ZIP export."
  },
  {
    id: "q4",
    question: "Do you offer post-launch support and updates?",
    answer: "Yes. Every client receives 30 days of free, comprehensive post-launch support covering bug fixes, domain troubleshooting, and minor layout tweaks. After that, we offer low-cost monthly care plans that cover security audits, hourly modifications, and server monitoring."
  },
  {
    id: "q5",
    question: "Can you integrate the website with my existing tools (Stripe, HubSpot, Mailchimp)?",
    answer: "Definitely. I specialize in custom API design and integration. Whether it is configuring frictionless payment checkouts (Stripe/PayPal), syncing prospect details with your CRM (HubSpot/Salesforce), or triggering automated emails, I make sure everything links flawlessly."
  },
  {
    id: "q6",
    question: "Why should I choose AK Design Studio instead of hiring a full-time developer or massive agency?",
    answer: "Massive agencies come with high overhead costs, slow turnaround speeds, and fragmented points-of-contact. By working directly with me, you get direct, elite-level expertise, direct communication, rapid development cycles, and custom-engineered architectures that cost up to 60% less than standard agency estimates."
  }
];
