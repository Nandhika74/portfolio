
import React, { useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Projects from './components/Projects.tsx';
import Skills from './components/Skills.tsx';
import Contact from './components/Contact.tsx';
import Experience from './components/Experience.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import ThemeSwitcher from './components/ThemeSwitcher.tsx';
import { PERSONAL_INFO, TESTIMONIALS } from './constants.tsx';

const App: React.FC = () => {
  useEffect(() => {
    // Ensure the browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Using a timeout to ensure DOM is fully ready
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach(el => {
        if (el) revealObserver.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-500 selection:text-white transition-colors duration-500">
      <ThemeSwitcher />
      <Header />
      <main>
        <Hero />



        <Experience />
        <Projects />
        <Skills />

        <section id="certifications" className="py-24 bg-slate-900/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center font-heading reveal">Professional <span className="gradient-text">Certifications</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "AI Essentials", issuer: "Google" },
                { title: "Python Programming", issuer: "NPTEL" },
                { title: "MongoDB NoSQL", issuer: "Infosys" },
                { title: "AI & Machine Learning", issuer: "IBM" },
                { title: "ServiceNow Micro-Certification", issuer: "ServiceNow" }
              ].map((cert, i) => (
                <div
                  key={i}
                  className={`glass p-6 rounded-2xl border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-all cursor-default hover:border-blue-500/30 reveal delay-${(i + 1) * 100}`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{cert.title}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section id="achievements" className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-16 text-center font-heading reveal">Achievements & Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="glass p-10 rounded-[40px] text-left border border-white/5 hover:border-blue-500/30 transition-all reveal-left">
                <h4 className="font-bold text-xl mb-4 text-blue-400">Hackathon Finalist</h4>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Proposed an innovative AI-powered Skin Medical Patch for real-time health monitoring at the CARE Hackathon (Mar 2025).
                </p>
                <span className="text-xs font-bold text-slate-500 uppercase">March 2025</span>
              </div>
              <div className="glass p-10 rounded-[40px] text-left border border-white/5 hover:border-purple-500/30 transition-all reveal-right">
                <h4 className="font-bold text-xl mb-4 text-purple-400">Club Coordinator</h4>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Organized and successfully managed multiple club events, coordinating teams and ensuring smooth execution of academic activities.
                </p>
                <span className="text-xs font-bold text-slate-500 uppercase">Leadership Role</span>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold font-heading gradient-text uppercase tracking-widest">NANDHIKA.S</div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Nandhika S. AI & Data Science Student.
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href={PERSONAL_INFO.linkedin} className="hover:text-white transition-colors">LinkedIn</a>
            <a href={PERSONAL_INFO.github} className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
