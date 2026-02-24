'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';

const projects = [
    {
        category: 'Cybersecurity',
        type: 'Cybersecurity / AI Project',
        title: 'GitHub OSINT & Secret‑Scanning Engine',
        period: '2024',
        description:
            'A high‑throughput OSINT engine scanning public GitHub repositories at 200 repos/min to automatically detect hard‑coded secrets. Features on‑premise LLaMA‑based AI classification, async networking, Redis caching, ChromaDB vector indexing, and real‑time metrics, delivering a production‑ready Docker solution.',
        tech: ['Python', 'LLaMA', 'Redis', 'ChromaDB', 'Docker', 'Asyncio', 'OSINT'],
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        emoji: '🕵️‍♂️',
    },
    {
        category: 'Cybersecurity',
        type: 'Cybersecurity Project',
        title: 'Penetration Testing & Vulnerability Assessment',
        period: '2024',
        description:
            'Conducted comprehensive penetration testing on servers and websites. Identified vulnerabilities and system weaknesses, and generated risk assessment reports following international standards. Employed various offensive security tools to ensure robust system defense.',
        tech: ['Nmap', 'Metasploit', 'SQLMap', 'Nikto', 'Penetration Testing'],
        gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        emoji: '🛡️',
    },
    {
        category: 'Cybersecurity',
        type: 'Cybersecurity Competition',
        title: 'Wongyos CTF — Ethical Hacking Challenges',
        period: '2024',
        description:
            'Solved diverse cybersecurity challenges encompassing Reverse Engineering, Cryptography, Digital Forensics, Web Exploitation, System Exploitation, and Programming for Ethical Hacking. Utilized binary analysis, system structure decoupling, and custom Python exploit scripts.',
        tech: ['Reverse Engineering', 'Cryptography', 'Digital Forensics', 'Binary Analysis', 'CTF'],
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        emoji: '🚩',
    },
    {
        category: 'Cybersecurity',
        type: 'Malware Analysis Project',
        title: 'University Network Malware Analysis & Forensics',
        period: '2024',
        description:
            'Detected and analyzed backdoor malware embedded within the university\'s IT systems. Performed rigorous binary analysis using IDA Pro, Ghidra, and HxD to extract hardcoded credentials and uncover embedded unauthorized authentication mechanisms.',
        tech: ['IDA Pro', 'Ghidra', 'HxD', 'Malware Analysis', 'Cybersecurity'],
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        emoji: '🦠',
    },
    {
        category: 'Cybersecurity',
        type: 'Digital Forensics Project',
        title: 'Network Traffic Analysis & OSINT Dark Web Investigation',
        period: '2024',
        description:
            'Conducted network forensics by intercepting and analyzing internal traffic via Wireshark to identify suspect behaviors. Tracked subjects across social platforms and Tor Network (.onion domains) analyzing emails, transaction routes, and PII.',
        tech: ['Wireshark', 'Sherlock', 'Tor Network', 'OSINT', 'Network Forensics'],
        gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
        emoji: '🕵️‍♂️',
    },
    {
        category: 'AI',
        type: 'Capstone Project',
        title: 'TrendReversal-AI — Market Trend Reversal System',
        period: '2026',
        description:
            'End-to-end machine learning system predicting financial market trend reversals across 5 global markets (US, UK, Thai, Gold, Bitcoin). Features deep learning models (LSTM, CNN, Transformer), regime-switching strategy via HMM/GMM, multi-objective parameter optimization (NSGA-II), hybrid LLM agent with RAG, and an interactive dashboard.',
        tech: ['Python', 'TensorFlow', 'LSTM', 'Transformers', 'HMM/GMM', 'NSGA-II', 'LLM', 'RAG'],
        gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
        emoji: '🤖',
    },
    {
        category: 'AI',
        type: 'Software Engineering Project',
        title: 'MongTa — Eye Disease Detection',
        period: 'Nov — Dec 2024',
        description:
            'An application that detects cataracts, styes, conjunctivitis, and pterygium, providing convenient services for users to contact doctors. I prepared data and uploaded it to Roboflow, performed data engineering and data science tasks, developed multiple models (YOLOv11, Transformers) to evaluate and compare performance, and set up a server for data transmission to the frontend.',
        tech: ['YOLOv11', 'Transformers', 'Roboflow', 'Python', 'Data Engineering', 'Computer Vision'],
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
        emoji: '👁️',
    },
    {
        category: 'AI',
        type: 'DS & DE Project',
        title: 'SAR to Multispectral Imagery — GANs & Vision Transformers',
        period: 'Oct 2024 — Present',
        description:
            'Utilizes the Pix2Pix model to enhance satellite image resolution and convert black-and-white images to color. Performed comprehensive data engineering: preparation, cleaning, analysis, and feature extraction. Developed and compared models like SRGAN and SwinUNet, with hyperparameter tuning to find optimal values.',
        tech: ['Pix2Pix', 'SRGAN', 'SwinUNet', 'GANs', 'Vision Transformers', 'Python'],
        gradient: 'linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)',
        emoji: '🛰️',
    },
    {
        category: 'AI',
        type: 'Capstone Project',
        title: 'Automated Trading Bot — ML for Crypto Prediction',
        period: 'March — May 2024',
        description:
            'Develops trading bots using machine learning to predict Bitcoin trends and execute real-time trades, integrated with Binance via a web application. Prepared data and indicators, used Decision Tree and Hidden Markov Model, selected features using Gini Index and Entropy, and calculated state transition probabilities with the Forward-Backward Algorithm.',
        tech: ['Decision Tree', 'HMM', 'Binance API', 'Python', 'ML', 'Feature Engineering'],
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
        emoji: '📈',
    },
    {
        category: 'Other',
        type: 'Web Programming & Database Project',
        title: 'Melody Music — Music Streaming Platform',
        period: 'April — May 2024',
        description:
            'A music streaming website for uploading and listening to songs online, accessible from laptops and mobile devices. Worked as a Fullstack Developer using Tailwind CSS for frontend, TypeScript for backend, deployed with Vercel, and used Supabase for data storage (images, songs, content).',
        tech: ['TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'Next.js', 'Full-Stack'],
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
        emoji: '🎵',
    },
    {
        category: 'Other',
        type: 'Object-Oriented Programming Project',
        title: 'Biz NA — Real-Time Asset Calculator',
        period: '',
        description:
            'A web application that calculates and tracks asset portfolios in real-time, supporting cryptocurrencies, stocks, cash, and other volatile assets. Features live price feeds, portfolio valuation, and dynamic asset allocation visualization.',
        tech: ['OOP', 'JavaScript', 'REST API', 'Real-Time Data', 'Web Development'],
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        emoji: '💰',
    },
    {
        category: 'Other',
        type: 'Computer Programming Project',
        title: 'Chefbot — Voice-Interactive Menu Assistant',
        period: '',
        description:
            'A voice-interactive program that provides personalized menu suggestions and calculates menu items. Users can create custom menus based on their preferences through natural voice commands, combining speech recognition with intelligent recommendation logic.',
        tech: ['Python', 'Speech Recognition', 'NLP', 'Voice Interface', 'Algorithm Design'],
        gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        emoji: '👨‍🍳',
    },
    {
        category: 'Other',
        type: 'Blockchain Technology Project',
        title: 'oatCoinToken & ShopCoin — Custom Crypto Tokens',
        period: '',
        description:
            'Designed and deployed two custom cryptocurrency tokens (oatCoinToken and ShopCoin) using Solidity smart contracts on Remix IDE. Implemented standard ERC-20 token functionality including minting, transfers, and balance management. Features QR Code integration for easy token addition to wallets.',
        tech: ['Solidity', 'Remix IDE', 'ERC-20', 'Blockchain', 'Smart Contracts', 'Ethereum'],
        gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        emoji: '🪙',
    },
    {
        category: 'AI',
        type: 'AI Full-Stack Project',
        title: 'LINE Receipt & Stock Management System',
        period: '',
        description:
            'Intelligent LINE Bot for sales and inventory management with AI OCR for automatic bank slip reading. Features image classification (QR / slip / product), multi-sale conversation flow via state machine, QR code product scanning, real-time LINE push notifications, REST API, and a web dashboard with daily/monthly revenue analytics and top product insights.',
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

    const categories = ['All', 'AI', 'Cybersecurity', 'Other'];

    const filteredProjects = projects.filter(
        (project) => filter === 'All' || project.category === filter
    );

    return (
        <SectionWrapper id="projects">
            <div className="container">
                <h2 className="section-title">
                    Academic <span className="gradient-text">Projects</span>
                </h2>
                <p className="section-subtitle">
                    AI, machine learning, and full-stack projects built during my studies
                </p>

                <div className="project-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
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
                                    <p className="project-card-description">{project.description}</p>
                                    <div className="project-card-tech">
                                        {project.tech.map((t) => (
                                            <span key={t} className="project-tech-tag">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
