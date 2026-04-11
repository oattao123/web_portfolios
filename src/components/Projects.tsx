'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
import { FiGithub } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const projects = [
    {
        category: 'Cybersecurity',
        type: 'Cybersecurity / AI Project',
        title: 'GitHub OSINT & Secret‑Scanning Engine',
        period: '2024',
        descKey: 'proj.osint.desc',
        tech: ['Python', 'LLaMA', 'Redis', 'ChromaDB', 'Docker', 'Asyncio', 'OSINT'],
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        emoji: '🕵️‍♂️',
        github: 'https://github.com/oattao123/test_osint',
    },
    {
        category: 'Cybersecurity',
        type: 'Cybersecurity Project',
        title: 'Penetration Testing & Vulnerability Assessment',
        period: '2024',
        descKey: 'proj.pentest.desc',
        tech: ['Nmap', 'Metasploit', 'SQLMap', 'Nikto', 'Penetration Testing'],
        gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        emoji: '🛡️',
    },
    {
        category: 'Cybersecurity',
        type: 'Cybersecurity Competition',
        title: 'Wongyos CTF — Ethical Hacking Challenges',
        period: '2024',
        descKey: 'proj.ctf.desc',
        tech: ['Reverse Engineering', 'Cryptography', 'Digital Forensics', 'Binary Analysis', 'CTF'],
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        emoji: '🚩',
    },
    {
        category: 'Cybersecurity',
        type: 'Malware Analysis Project',
        title: 'University Network Malware Analysis & Forensics',
        period: '2024',
        descKey: 'proj.malware.desc',
        tech: ['IDA Pro', 'Ghidra', 'HxD', 'Malware Analysis', 'Cybersecurity'],
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        emoji: '🦠',
    },
    {
        category: 'Cybersecurity',
        type: 'Digital Forensics Project',
        title: 'Network Traffic Analysis & OSINT Dark Web Investigation',
        period: '2024',
        descKey: 'proj.forensics.desc',
        tech: ['Wireshark', 'Sherlock', 'Tor Network', 'OSINT', 'Network Forensics'],
        gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
        emoji: '🕵️‍♂️',
    },
    {
        category: 'AI',
        type: 'Capstone Project',
        title: 'TrendReversal-AI — Market Trend Reversal System',
        period: '2026',
        descKey: 'proj.trendreversal.desc',
        tech: ['Python', 'TensorFlow', 'LSTM', 'Transformers', 'HMM/GMM', 'NSGA-II', 'LLM', 'RAG'],
        gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
        emoji: '🤖',
    },
    {
        category: 'AI',
        type: 'Software Engineering Project',
        title: 'MongTa — Eye Disease Detection',
        period: 'Nov — Dec 2024',
        descKey: 'proj.mongta.desc',
        tech: ['YOLOv11', 'Transformers', 'Roboflow', 'Python', 'Data Engineering', 'Computer Vision'],
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
        emoji: '👁️',
        github: 'https://github.com/oattao123/MongTa',
    },
    {
        category: 'AI',
        type: 'DS & DE Project',
        title: 'SAR to Multispectral Imagery — GANs & Vision Transformers',
        period: 'Oct 2024 — Present',
        descKey: 'proj.sar.desc',
        tech: ['Pix2Pix', 'SRGAN', 'SwinUNet', 'GANs', 'Vision Transformers', 'Python'],
        gradient: 'linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)',
        emoji: '🛰️',
    },
    {
        category: 'AI',
        type: 'Capstone Project',
        title: 'Automated Trading Bot — ML for Crypto Prediction',
        period: 'March — May 2024',
        descKey: 'proj.trading.desc',
        tech: ['Decision Tree', 'HMM', 'Binance API', 'Python', 'ML', 'Feature Engineering'],
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
        emoji: '📈',
        github: 'https://github.com/oattao123/ml_trading',
    },
    {
        category: 'AI',
        type: 'Neural Style Transfer Project',
        title: 'Neural Style Transfer — Artistic Image Generation',
        period: '2025',
        descKey: 'proj.nst.desc',
        tech: ['Python', 'Deep Learning', 'CNN', 'Transfer Learning', 'Jupyter'],
        gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        emoji: '🎨',
        github: 'https://github.com/oattao123/nst',
    },
    {
        category: 'AI',
        type: 'Quantitative Finance Project',
        title: 'Sector-Constrained Portfolio Optimization',
        period: '2026',
        descKey: 'proj.portfolio.desc',
        tech: ['Python', 'PSO', 'Differential Evolution', 'Markowitz', 'yfinance', 'scipy', 'Jupyter'],
        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
        emoji: '📊',
        github: 'https://github.com/oattao123/sector_constrained_portfolio_executed',
    },
    {
        category: 'Other',
        type: 'Web Programming & Database Project',
        title: 'Melody Music — Music Streaming Platform',
        period: 'April — May 2024',
        descKey: 'proj.melody.desc',
        tech: ['TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'Next.js', 'Full-Stack'],
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
        emoji: '🎵',
        github: 'https://github.com/oattao123/Melody_music',
    },
    {
        category: 'Other',
        type: 'Mobile Application Project',
        title: 'Basketball Queue Manager — React Native App',
        period: '2026',
        descKey: 'proj.basketball.desc',
        tech: ['React Native', 'Expo SDK 54', 'React 19', 'JavaScript', 'Vercel', 'Mobile App'],
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        emoji: '🏀',
        github: 'https://github.com/oattao123/basketball_quene',
    },
    {
        category: 'Other',
        type: 'Object-Oriented Programming Project',
        title: 'Biz NA — Real-Time Asset Calculator',
        period: '',
        descKey: 'proj.bizna.desc',
        tech: ['OOP', 'JavaScript', 'REST API', 'Real-Time Data', 'Web Development'],
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        emoji: '💰',
    },
    {
        category: 'Other',
        type: 'Computer Programming Project',
        title: 'Chefbot — Voice-Interactive Menu Assistant',
        period: '',
        descKey: 'proj.chefbot.desc',
        tech: ['Python', 'Speech Recognition', 'NLP', 'Voice Interface', 'Algorithm Design'],
        gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        emoji: '👨‍🍳',
    },
    {
        category: 'Other',
        type: 'Blockchain Technology Project',
        title: 'oatCoinToken & ShopCoin — Custom Crypto Tokens',
        period: '',
        descKey: 'proj.oatcoin.desc',
        tech: ['Solidity', 'Remix IDE', 'ERC-20', 'Blockchain', 'Smart Contracts', 'Ethereum'],
        gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        emoji: '🪙',
    },
    {
        category: 'AI',
        type: 'AI Full-Stack Project',
        title: 'LINE Receipt & Stock Management System',
        period: '',
        descKey: 'proj.linereceipt.desc',
        tech: ['Node.js', 'Express', 'LINE Bot SDK', 'AI OCR', 'SQLite', 'REST API', 'Dashboard'],
        gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        emoji: '🧾',
    },
];

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardAnim = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
    const [filter, setFilter] = useState('All');
    const { t } = useLanguage();

    const categories = [
        { key: 'All', labelKey: 'proj.filter.all' },
        { key: 'AI', labelKey: 'proj.filter.ai' },
        { key: 'Cybersecurity', labelKey: 'proj.filter.cyber' },
        { key: 'Other', labelKey: 'proj.filter.other' },
    ];

    const filteredProjects = projects.filter(
        (project) => filter === 'All' || project.category === filter
    );

    return (
        <SectionWrapper id="projects">
            <div className="container">
                <h2 className="section-title">
                    {t('proj.title1')} <span className="gradient-text">{t('proj.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('proj.subtitle')}
                </p>

                <div className="project-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            className={`filter-btn ${filter === cat.key ? 'active' : ''}`}
                            onClick={() => setFilter(cat.key)}
                        >
                            {t(cat.labelKey)}
                        </button>
                    ))}
                </div>

                <motion.div
                    ref={ref}
                    className="projects-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    layout
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.title}
                                className="project-card"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="project-card-image">
                                    <div
                                        className="project-card-gradient"
                                        style={{ background: project.gradient }}
                                    >
                                        {project.emoji}
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <p className="project-card-type">{project.type}</p>
                                    <h3 className="project-card-title">{project.title}</h3>
                                    <p className="project-card-description">{t(project.descKey)}</p>
                                    <div className="project-card-tech">
                                        {project.tech.map((techItem) => (
                                            <span key={techItem} className="project-tech-tag">
                                                {techItem}
                                            </span>
                                        ))}
                                    </div>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-github-link"
                                        >
                                            <FiGithub /> {t('proj.viewCode')}
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
