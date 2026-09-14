export interface Certification {
  title: string;
  issuer: string;
  url: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    url: "https://www.credly.com/badges/fb75d2d5-94f5-496d-89d8-fdca2c2af835/linked_in_profile",
    skills: ["Cloud Architecture", "AWS Core Services", "Security & IAM", "Compute & VPC"],
  },
  {
    title: "AWS Academy Graduate - Data Engineering",
    issuer: "Amazon Web Services (AWS)",
    url: "https://www.credly.com/badges/2dcf875d-a953-420f-b962-110148effbe2/linked_in_profile",
    skills: ["Data Engineering", "Big Data", "Data Pipelines & ETL", "S3 & Redshift"],
  },
  {
    title: "AWS Certified DevOps Engineer - Professional",
    issuer: "Packt / Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/LYHRRZXRQVUZ",
    skills: ["DevOps", "CI/CD Automation", "Infrastructure as Code", "CloudWatch"],
  },
  {
    title: "Machine Learning in Production",
    issuer: "DeepLearning.AI",
    url: "https://www.coursera.org/account/accomplishments/verify/9FFCUKCMPO1I",
    skills: ["MLOps", "Model Deployment", "Continuous Monitoring", "Data Validation"],
  },
];
