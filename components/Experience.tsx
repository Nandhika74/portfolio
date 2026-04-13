import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
    {
        id: '1',
        role: "AI & Data Science Student",
        company: "SKCET",
        duration: "2024 - Present",
        description: "Focusing on Machine Learning, Deep Learning, and Web Technologies. Maintaining a CGPA of 8.33."
    },
    {
        id: '2',
        role: "Machine Learning Intern",
        company: "Alfido Tech",
        duration: "nov 2025 - dec 2025",
        description: "Built classification models for flower species and survival prediction. Demonstrated 95% accuracy in model testing."
    },
    {
        id: '3',
        role: "Hackathon Finalist",
        company: "CARE Hackathon",
        duration: "March 2025",
        description: "Proposed an AI-powered Skin Medical Patch for real-time health monitoring. Reached the final round among 50+ teams."
    },
    {
        id: '4',
        role: "Club Coordinator",
        company: "data science Club",
        duration: "2026 - Present",
        description: "Organizing technical workshops and events. Managing team coordination and event logistics."
    }
];

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center font-heading"
                >
                    My <span className="gradient-text">Journey</span>
                </motion.h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full"></div>

                    <div className="space-y-12">
                        {EXPERIENCES.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Side */}
                                <div className="md:w-1/2 pl-12 md:pl-0">
                                    <div className={`glass p-8 rounded-2xl relative border border-white/5 hover:border-blue-500/30 transition-all ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                                        <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                                        <p className="text-blue-400 font-medium mb-4">{exp.company}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                                        <div className="mt-4 inline-block px-3 py-1 rounded-full bg-white/5 text-xs text-slate-500 font-medium border border-white/5">
                                            {exp.duration}
                                        </div>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-4 border-slate-900 z-10 mt-8"></div>

                                {/* Padding Side (Empty) */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
