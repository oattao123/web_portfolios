'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
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

const skillCategories = [
    {
        title: 'Programming Languages',
        icon: <FiCode />,
        color: 'rgba(124, 58, 237, 0.2)',
        skills: ['Python', 'SQL', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'Swift'],
    },
    {
        title: 'Frontend Development',
        icon: <FiLayout />,
        color: 'rgba(6, 182, 212, 0.2)',
        skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    },
    {
        title: 'Backend Development',
        icon: <FiServer />,
        color: 'rgba(236, 72, 153, 0.2)',
        skills: ['Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'NestJS', 'REST API'],
    },
    {
        title: 'Mobile Development',
        icon: <FiSmartphone />,
        color: 'rgba(16, 185, 129, 0.2)',
        skills: ['Flutter', 'React Native', 'Dart', 'Swift', 'iOS', 'Android'],
    },
    {
        title: 'Database Technologies',
        icon: <FiDatabase />,
        color: 'rgba(245, 158, 11, 0.2)',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Supabase'],
    },
    {
        title: 'AI / Machine Learning',
        icon: <FiCpu />,
        color: 'rgba(124, 58, 237, 0.2)',
        skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenCV', 'LSTM/CNN', 'Transformers', 'RAG', 'LLM', 'LangChain'],
    },
    {
        title: 'Data Science & Engineering',
        icon: <FiDatabase />,
        color: 'rgba(245, 158, 11, 0.2)',
        skills: ['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn', 'Apache Spark', 'ETL'],
    },
    {
        title: 'DevOps & Tools',
        icon: <FiTool />,
        color: 'rgba(6, 182, 212, 0.2)',
        skills: ['Git', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
    },
    {
        title: 'Operating Systems',
        icon: <FiMonitor />,
        color: 'rgba(236, 72, 153, 0.2)',
        skills: ['Linux', 'Ubuntu', 'Kali Linux', 'Windows', 'macOS'],
    },
    {
        title: 'Cybersecurity & Pentest',
        icon: <FiShield />,
        color: 'rgba(16, 185, 129, 0.2)',
        skills: ['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'SQLMap', 'Nikto', 'Hashcat', 'Aircrack-ng', 'OSINT', 'Sherlock', 'Tor', 'Ghidra'],
    },
];

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

    return (
        <SectionWrapper id="skills">
            <div className="container">
                <h2 className="section-title">
                    Technical <span className="gradient-text">Skills</span>
                </h2>
                <p className="section-subtitle">
                    Technologies and tools I work with to build intelligent, scalable solutions
                </p>

                <motion.div
                    ref={ref}
                    className="skills-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {skillCategories.map((category) => (
                        <motion.div key={category.title} className="skill-card" variants={item}>
                            <div className="skill-card-header">
                                <div
                                    className="skill-card-icon"
                                    style={{ background: category.color }}
                                >
                                    {category.icon}
                                </div>
                                <h3 className="skill-card-title">{category.title}</h3>
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
