import React from 'react';
import { Project, Skill, Testimonial } from './types';

export const PERSONAL_INFO = {
  name: "Nandhika S",
  role: "AI & Data Science Undergraduate",
  bio: "A passionate 2nd-year AI & Data Science student at SKCET with a focus on Machine Learning and Web Development. I enjoy building intelligent solutions that bridge the gap between complex data and user-centric design.",
  email: "nandhikas3@gmail.com",
  github: "https://github.com/Nandhika74",
  linkedin: "https://www.linkedin.com/in/nandhika-s-247845327",
  location: "Coimbatore, India",
  education: "Sri Krishna College Of Engineering And Technology",
  cgpa: "8.33",
  profileImage: "/profile.jpg"
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "GREENTRACK AI",
    description: "A predictive ML model using Python and Scikit-Learn to detect atmospheric CO2 levels and forecast future concentrations.",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop",
    tags: ["Python", "Scikit-Learn", "ML", "Sustainability"],
    link: "#",
    
  },
  {
    id: "2",
    title: "ZENMODE",
    description: "A cross-platform mobile application built using Flutter and Dart to streamline daily task management and academic focus for students.",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop",
    tags: ["Flutter", "Dart", "Mobile App"],
    link: "#",
  },
  {
    id: "3",
    title: "FEASTIFY",
    description: "A food ordering platform with a robust MongoDB schema to store and retrieve user profiles, order history, and restaurant inventory.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    tags: ["MongoDB", "Web Dev", "Database Design"],
    link: "#",
  },
  {
    id: "4",
    title: "Hotel Booking Website",
    description: "A fully responsive hotel reservation platform using HTML5, CSS3, JavaScript (ES6+), and Bootstrap.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    link: "#",
  },
];

export const SKILLS: Skill[] = [
  { name: "Python", category: "Backend", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "React.js", category: "Frontend", level: 80 },
  { name: "Node.js", category: "Backend", level: 75 },
  { name: "Django", category: "Backend", level: 70 },
  { name: "SQL", category: "Backend", level: 85 },
  { name: "MongoDB", category: "Backend", level: 80 },
  { name: "Google Cloud", category: "Tools", level: 65 },
  { name: "Power BI", category: "Tools", level: 70 },
  { name: "Git/GitHub", category: "Tools", level: 90 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Alfido Tech",
    role: "Internship Provider",
    content: "Nandhika demonstrated exceptional initiative during her Machine Learning internship, delivering accurate classification models for flower and survival prediction.",
    avatar: "https://picsum.photos/seed/corp/100/100",
  },
  {
    id: "2",
    name: "Care Hackathon",
    role: "Competition Organizers",
    content: "Finalist entry for the AI-powered Skin Medical Patch. Nandhika showed great innovative thinking in healthcare AI.",
    avatar: "https://picsum.photos/seed/hack/100/100",
  },
];