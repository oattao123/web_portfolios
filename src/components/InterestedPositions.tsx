'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';

const positions = [
    {
        title: 'AI Engineer',
        icon: '🤖',
        description:
            'Building and deploying production-grade AI/ML systems — from deep learning models and LLM-powered agents to end-to-end inference pipelines.',
        highlights: ['LLM / RAG', 'Deep Learning', 'MLOps', 'Model Deployment'],
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    },
    {
        title: 'AI Cybersecurity Engineer',
        icon: '🛡️',
        description:
            'Applying AI and machine learning to cybersecurity — threat detection, anomaly analysis, automated vulnerability assessment, and intelligent incident response.',
        highlights: ['AI Threat Detection', 'SIEM & SOAR', 'Malware Analysis', 'Penetration Testing'],
        gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
    },
    {
        title: 'Data Scientist',
        icon: '📊',
        description:
            'Transforming complex datasets into actionable insights through statistical modeling, feature engineering, and data-driven decision making.',
        highlights: ['Statistical Modeling', 'Feature Engineering', 'Data Visualization', 'Predictive Analytics'],
        gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    },
    {
        title: 'Data Engineer',
        icon: '⚙️',
        description:
            'Designing and building scalable data pipelines, ETL workflows, and data infrastructure to support analytics and machine learning at scale.',
        highlights: ['ETL Pipelines', 'Data Warehousing', 'Apache Spark', 'Cloud Infrastructure'],
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
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

export default function InterestedPositions() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <SectionWrapper id="positions" className="positions">
            <div className="container">
                <h2 className="section-title">
                    Interested <span className="gradient-text">Positions</span>
                </h2>
                <p className="section-subtitle">
                    Career paths I am passionate about and actively pursuing
                </p>

                <motion.div
                    ref={ref}
                    className="positions-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {positions.map((pos) => (
                        <motion.div key={pos.title} className="position-card" variants={cardAnim}>
                            <div
                                className="position-card-accent"
                                style={{ background: pos.gradient }}
                            />
                            <div className="position-icon">{pos.icon}</div>
                            <h3 className="position-title">{pos.title}</h3>
                            <p className="position-description">{pos.description}</p>
                            <div className="position-highlights">
                                {pos.highlights.map((h) => (
                                    <span key={h} className="position-highlight-tag">
                                        {h}
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
