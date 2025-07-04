import { ProblemCategory } from '../types/telos';

export const problemCategories: ProblemCategory[] = [
  {
    id: 'poverty_economic',
    name: 'Poverty & Economic Inequality',
    description: 'Issues related to wealth distribution, economic opportunity, and financial security',
    problems: [
      'Income inequality widening between rich and poor',
      'Minimum wage insufficient for basic living costs',
      'Lack of affordable healthcare access',
      'Student debt preventing economic mobility',
      'Housing affordability crisis in urban areas',
      'Unemployment among marginalized communities',
      'Limited access to financial services in rural areas',
      'Predatory lending targeting vulnerable populations',
      'Retirement savings crisis among working families',
      'Economic barriers to higher education',
      'Lack of financial literacy education',
      'Gig economy workers without benefits',
      'Small business struggles with economic uncertainty',
      'Generational wealth gaps affecting opportunity',
      'Food insecurity in low-income neighborhoods',
      'Transportation poverty limiting job access',
      'Digital divide affecting economic participation',
      'Lack of affordable childcare limiting workforce participation'
    ]
  },
  {
    id: 'government_politics',
    name: 'Government, Politics & Justice',
    description: 'Issues related to governance, political systems, and social justice',
    problems: [
      'Political polarization dividing communities',
      'Voter suppression limiting democratic participation',
      'Corruption undermining public trust',
      'Gerrymandering distorting electoral representation',
      'Campaign finance allowing undue influence',
      'Lack of transparency in government decisions',
      'Racial bias in criminal justice system',
      'Mass incarceration affecting communities',
      'Police accountability and reform needs',
      'Immigration system lacking comprehensive reform',
      'Lobbying influence over policy decisions',
      'Judicial system access limited by cost',
      'Government surveillance overreach concerns',
      'Bureaucratic inefficiency in public services',
      'Local government engagement declining',
      'International human rights violations',
      'Democratic backsliding in global contexts',
      'Authoritarian threats to civil liberties'
    ]
  },
  {
    id: 'war_conflict',
    name: 'War, Conflict & Human Rights',
    description: 'Issues related to armed conflict, violence, and human rights violations',
    problems: [
      'Armed conflicts displacing civilian populations',
      'Refugee crisis overwhelming support systems',
      'Human trafficking exploiting vulnerable people',
      'Gender-based violence in conflict zones',
      'Child soldiers forced into military service',
      'War crimes going unpunished',
      'Nuclear weapons proliferation risks',
      'Terrorism threatening civilian safety',
      'Ethnic cleansing and genocide prevention',
      'Civilian casualties in modern warfare',
      'Post-conflict reconstruction challenges',
      'Veteran mental health and reintegration',
      'Arms trade fueling regional conflicts',
      'Peacekeeping missions lacking resources',
      'International law enforcement gaps',
      'Hate crimes targeting minority groups',
      'Religious persecution and discrimination',
      'Indigenous rights violations worldwide'
    ]
  },
  {
    id: 'social_interpersonal',
    name: 'Societal & Interpersonal',
    description: 'Issues related to social relationships, community dynamics, and cultural challenges',
    problems: [
      'Social isolation and loneliness epidemic',
      'Mental health stigma preventing treatment',
      'Domestic violence affecting families',
      'Cyberbullying harming young people',
      'Ageism limiting opportunities for older adults',
      'Cultural appropriation and sensitivity',
      'Language barriers in diverse communities',
      'Intergenerational trauma affecting families',
      'Social media addiction and mental health',
      'Dating and relationship challenges',
      'Community cohesion declining in neighborhoods',
      'Workplace harassment and discrimination',
      'Educational inequality between communities',
      'Religious and cultural tolerance issues',
      'Gender equality and representation gaps',
      'LGBTQ+ rights and acceptance challenges',
      'Substance abuse affecting communities',
      'Family breakdown and support systems'
    ]
  },
  {
    id: 'technology_ai',
    name: 'Technology, AI & The Internet',
    description: 'Issues related to technological advancement, artificial intelligence, and digital transformation',
    problems: [
      'AI bias perpetuating social inequalities',
      'Job displacement from automation',
      'Misinformation spreading through social media',
      'Algorithm transparency and accountability',
      'Digital addiction affecting mental health',
      'AI safety and alignment concerns',
      'Tech monopolies concentrating power',
      'Internet censorship and freedom of expression',
      'Deepfakes threatening truth and authenticity',
      'Autonomous weapons development ethics',
      'Platform responsibility for harmful content',
      'Digital literacy gaps across generations',
      'Tech industry diversity and inclusion',
      'Artificial general intelligence safety',
      'Social media echo chambers polarizing society',
      'Digital rights and platform governance',
      'Ethical AI development and deployment',
      'Human-AI collaboration challenges'
    ]
  },
  {
    id: 'privacy_security',
    name: 'Privacy & Cybersecurity',
    description: 'Issues related to digital privacy, data security, and online safety',
    problems: [
      'Personal data harvesting by corporations',
      'Identity theft and financial fraud',
      'Government surveillance of citizens',
      'Cybersecurity threats to infrastructure',
      'Data breaches exposing personal information',
      'Online privacy rights and protection',
      'Children safety in digital environments',
      'Ransomware attacks on critical systems',
      'Facial recognition technology misuse',
      'Biometric data collection and storage',
      'Cross-border data transfer regulations',
      'Encryption versus law enforcement access',
      'IoT devices security vulnerabilities',
      'Medical data privacy and security',
      'Financial system cybersecurity risks',
      'Social media data mining practices',
      'Digital forensics and evidence handling',
      'Quantum computing threats to encryption'
    ]
  },
  {
    id: 'jobs_business',
    name: 'Jobs, Business & Economy',
    description: 'Issues related to employment, entrepreneurship, and economic systems',
    problems: [
      'Skills gap in emerging technology sectors',
      'Gig economy workers lacking job security',
      'Workplace automation replacing human jobs',
      'Small business competition with large corporations',
      'Remote work challenges and opportunities',
      'Entrepreneurship barriers for underrepresented groups',
      'Corporate responsibility and ethical business practices',
      'Supply chain disruptions affecting business',
      'Professional development and reskilling needs',
      'Workplace mental health and wellbeing',
      'Gender pay gap in various industries',
      'Age discrimination in hiring practices',
      'Startup funding access for diverse founders',
      'Labor rights in global supply chains',
      'Economic inequality affecting consumer spending',
      'Business sustainability and environmental impact',
      'Artificial intelligence replacing knowledge workers',
      'Freelancer rights and protections'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Issues related to learning, academic systems, and educational access',
    problems: [
      'Educational inequality between communities',
      'Student debt crisis limiting opportunities',
      'Teacher shortages in critical subjects',
      'Outdated curriculum not matching job market',
      'Digital divide affecting remote learning',
      'Standardized testing limiting creativity',
      'School funding disparities',
      'Adult education and lifelong learning gaps',
      'STEM education gender gaps',
      'College admissions bias and fairness',
      'Vocational training stigma and support',
      'Educational technology integration challenges',
      'Language barriers in diverse classrooms',
      'Special needs education resource limitations',
      'Higher education affordability crisis',
      'Critical thinking and media literacy education',
      'Arts education funding and support',
      'Rural education resource limitations'
    ]
  },
  {
    id: 'health_wellbeing',
    name: 'Health & Well-being',
    description: 'Issues related to physical and mental health, healthcare systems, and wellness',
    problems: [
      'Mental health services accessibility',
      'Healthcare cost and insurance coverage',
      'Preventive care and wellness education',
      'Substance abuse treatment and support',
      'Chronic disease management and prevention',
      'Healthcare worker shortages and burnout',
      'Maternal and infant mortality rates',
      'Elderly care and aging population needs',
      'Health information and medical literacy',
      'Pharmaceutical pricing and access',
      'Rural healthcare facility closures',
      'Health disparities between communities',
      'Nutrition and food system health impacts',
      'Exercise and physical activity promotion',
      'Sleep health and modern lifestyle impacts',
      'Occupational health and safety standards',
      'Global health security and pandemic preparedness',
      'Alternative medicine integration and regulation'
    ]
  },
  {
    id: 'environment_energy',
    name: 'Environment & Energy',
    description: 'Issues related to climate change, environmental protection, and sustainable energy',
    problems: [
      'Climate change acceleration and impacts',
      'Renewable energy transition challenges',
      'Plastic pollution in oceans and ecosystems',
      'Deforestation and habitat destruction',
      'Air quality and pollution health impacts',
      'Water scarcity and quality issues',
      'Biodiversity loss and species extinction',
      'Sustainable agriculture and food systems',
      'Carbon emissions from transportation',
      'Industrial waste and toxic contamination',
      'Energy storage and grid modernization',
      'Fossil fuel dependence and transition',
      'Environmental justice and community impact',
      'Sustainable consumption and waste reduction',
      'Green technology development and adoption',
      'Climate adaptation and resilience planning',
      'Ocean acidification and marine ecosystems',
      'Extreme weather events and preparedness'
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Services',
    description: 'Issues related to public infrastructure, transportation, and essential services',
    problems: [
      'Aging infrastructure requiring modernization',
      'Public transportation accessibility and funding',
      'Broadband internet access in rural areas',
      'Housing shortage and affordability',
      'Water and sewer system upgrades needed',
      'Electric grid reliability and modernization',
      'Road and bridge maintenance backlogs',
      'Public services funding and efficiency',
      'Emergency services response capabilities',
      'Waste management and recycling systems',
      'Public space maintenance and development',
      'Telecommunications infrastructure gaps',
      'Healthcare facility access and distribution',
      'Educational facility conditions and capacity',
      'Public safety infrastructure needs',
      'Transportation equity and access',
      'Smart city technology integration',
      'Infrastructure resilience to climate change'
    ]
  },
  {
    id: 'information_media',
    name: 'Information & Media',
    description: 'Issues related to information access, media literacy, and communication',
    problems: [
      'Misinformation and disinformation spread',
      'Media bias and polarization',
      'Journalism funding and sustainability',
      'Information literacy and critical thinking',
      'Echo chambers and filter bubbles',
      'News accessibility and local reporting',
      'Social media regulation and governance',
      'Digital divide in information access',
      'Propaganda and manipulation tactics',
      'Scientific communication and public understanding',
      'Media representation and diversity',
      'Fact-checking and verification challenges',
      'Information overload and attention economy',
      'Language barriers in global information',
      'Archive preservation and digital heritage',
      'Academic research accessibility',
      'Public interest journalism support',
      'Media literacy education in schools'
    ]
  }
];

export const getProblemsForCategory = (categoryId: string): string[] => {
  const category = problemCategories.find(cat => cat.id === categoryId);
  return category?.problems || [];
};

export const searchProblems = (query: string): Array<{category: string, problem: string}> => {
  const results: Array<{category: string, problem: string}> = [];
  const queryLower = query.toLowerCase();
  
  problemCategories.forEach(category => {
    category.problems.forEach(problem => {
      if (problem.toLowerCase().includes(queryLower)) {
        results.push({ category: category.name, problem });
      }
    });
  });
  
  return results;
};