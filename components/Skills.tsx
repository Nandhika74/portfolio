import React from 'react';
import { SKILLS } from '../constants.tsx';

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center reveal">Technical <span className="gradient-text">Expertise</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={cat} className={`glass p-8 rounded-3xl border border-white/5 reveal delay-${i * 100}`}>
              <h3 className="text-xl font-bold mb-8 text-blue-400 uppercase tracking-widest text-sm">{cat}</h3>
              <div className="space-y-6">
                {SKILLS.filter(s => s.category === cat).map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-medium text-slate-300">{skill.name}</span>
                      <span className="text-xs text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 glass rounded-3xl border border-dashed border-white/20 text-center max-w-4xl mx-auto reveal">
          <p className="text-slate-400 italic">
            "Constantly learning and adapting to new technologies. Currently focused on deep integration of Large Language Models into enterprise-level web architectures."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;