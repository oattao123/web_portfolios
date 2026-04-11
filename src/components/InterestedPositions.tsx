'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';

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
    const { t } = useLanguage();

    const positions = [
        {
            titleKey: 'pos.ai.title',
            icon: '🤖',
            descKey: 'pos.ai.desc',
            highlights: ['LLM / RAG', 'Deep Learning', 'MLOps', 'Model Deployment'],
            gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
        },
        {
            titleKey: 'pos.cyber.title',
            icon: '🛡️',
            descKey: 'pos.cyber.desc',
            highlights: ['AI Threat Detection', 'SIEM & SOAR', 'Malware Analysis', 'Penetration Testing'],
            gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
        },
        {
            titleKey: 'pos.ds.title',
            icon: '📊',
            descKey: 'pos.ds.desc',
            highlights: ['Statistical Modeling', 'Feature Engineering', 'Data Visualization', 'Predictive Analytics'],
            gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        },
        {
            titleKey: 'pos.de.title',
            icon: '⚙️',
            descKey: 'pos.de.desc',
            highlights: ['ETL Pipelines', 'Data Warehousing', 'Apache Spark', 'Cloud Infrastructure'],
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
        },
    ];

    return (
        <SectionWrapper id="positions" className="positions">
            <div className="container">
                <h2 className="section-title">
                    {t('pos.title1')} <span className="gradient-text">{t('pos.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('pos.subtitle')}
                </p>

                <motion.div
                    ref={ref}
                    className="positions-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {positions.map((pos) => (
                        <motion.div key={pos.titleKey} className="position-card" variants={cardAnim}>
                            <div
                                className="position-card-accent"
                                style={{ background: pos.gradient }}
                            />
                            <div className="position-icon">{pos.icon}</div>
                            <h3 className="position-title">{t(pos.titleKey)}</h3>
                            <p className="position-description">{t(pos.descKey)}</p>
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
