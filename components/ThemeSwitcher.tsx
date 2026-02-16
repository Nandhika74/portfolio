import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'pastel'>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'pastel' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-20 z-50 p-3 rounded-full glass hover:bg-white/10 transition-all group"
            title="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.5 }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                ) : (
                    <Sun className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400" />
                )}
            </motion.div>
        </button>
    );
};

export default ThemeSwitcher;
