'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import {
    FiCode,
    FiLayout,
    FiServer,
    FiSmartphone,
    FiDatabase,
    FiCpu,
    FiTool,
    FiMonitor,
    FiShield,
} from 'react-icons/fi';

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { t } = useLanguage();

    const skillCategories = [
        {
            titleKey: 'skills.cat.programming',
            icon: <FiCode />,
            color: 'rgba(124, 58, 237, 0.2)',
            skills: ['Python', 'SQL', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'Swift'],
        },
        {
            titleKey: 'skills.cat.frontend',
            icon: <FiLayout />,
            color: 'rgba(6, 182, 212, 0.2)',
            skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
        },
        {
            titleKey: 'skills.cat.backend',
            icon: <FiServer />,
            color: 'rgba(236, 72, 153, 0.2)',
            skills: ['Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'NestJS', 'REST API'],
        },
        {
            titleKey: 'skills.cat.mobile',
            icon: <FiSmartphone />,
            color: 'rgba(16, 185, 129, 0.2)',
            skills: ['Flutter', 'React Native', 'Dart', 'Swift', 'iOS', 'Android'],
        },
        {
            titleKey: 'skills.cat.database',
            icon: <FiDatabase />,
            color: 'rgba(245, 158, 11, 0.2)',
            skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Supabase'],
        },
        {
            titleKey: 'skills.cat.ai',
            icon: <FiCpu />,
            color: 'rgba(124, 58, 237, 0.2)',
            skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenCV', 'LSTM/CNN', 'Transformers', 'RAG', 'LLM', 'LangChain'],
        },
        {
            titleKey: 'skills.cat.datascience',
            icon: <FiDatabase />,
            color: 'rgba(245, 158, 11, 0.2)',
            skills: ['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn', 'Apache Spark', 'ETL'],
        },
        {
            titleKey: 'skills.cat.devops',
            icon: <FiTool />,
            color: 'rgba(6, 182, 212, 0.2)',
            skills: ['Git', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
        },
        {
            titleKey: 'skills.cat.os',
            icon: <FiMonitor />,
            color: 'rgba(236, 72, 153, 0.2)',
            skills: ['Linux', 'Ubuntu', 'Kali Linux', 'Windows', 'macOS'],
        },
        {
            titleKey: 'skills.cat.cybersecurity',
            icon: <FiShield />,
            color: 'rgba(16, 185, 129, 0.2)',
            skills: ['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'SQLMap', 'Nikto', 'Hashcat', 'Aircrack-ng', 'OSINT', 'Sherlock', 'Tor', 'Ghidra'],
        },
    ];

    return (
        <SectionWrapper id="skills">
            <div className="container">
                <h2 className="section-title">
                    {t('skills.title1')} <span className="gradient-text">{t('skills.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('skills.subtitle')}
                </p>

                <motion.div
                    ref={ref}
                    className="skills-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {skillCategories.map((category) => (
                        <motion.div key={category.titleKey} className="skill-card" variants={item}>
                            <div className="skill-card-header">
                                <div
                                    className="skill-card-icon"
                                    style={{ background: category.color }}
                                >
                                    {category.icon}
                                </div>
                                <h3 className="skill-card-title">{t(category.titleKey)}</h3>
                            </div>
                            <div className="skill-tags">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
