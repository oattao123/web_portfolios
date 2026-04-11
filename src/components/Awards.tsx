'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';

const awards = [
    {
        icon: '🏆',
        title: 'Winner — Innovation for KMUTT Sustainability',
        event: 'Playground 2023',
        year: '2023',
    },
    {
        icon: '🎖️',
        title: 'Honorable Mention — Research to Market',
        event: "Big's SEED Talent Camp 2023",
        year: '2023',
    },
    {
        icon: '🚀',
        title: 'Regional Qualifiers',
        event: 'Startup Thailand League 2023',
        year: '2023',
    },
    {
        icon: '🥈',
        title: '1st Runner-up — Innovedex Robotics Competitions',
        event: 'National Level · Ministry of Education & MCOT HD',
        year: '2020',
    },
    {
        icon: '🥉',
        title: '2nd Runner-up — Thailand GreenMech Contest',
        event: 'National Level · KMUTNB',
        year: '2020',
    },
    {
        icon: '🤖',
        title: '3rd Runner-up — Robot for Smart Energy',
        event: 'National Level · KMUTNB',
        year: '2019',
    },
    {
        icon: '🏅',
        title: 'Winner — Robotics & Automation Camp',
        event: 'Camp Level · KMUTNB EEC Program',
        year: '2019',
    },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function Awards() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { t } = useLanguage();

    return (
        <SectionWrapper id="awards">
            <div className="container">
                <h2 className="section-title">
                    {t('awards.title1')} <span className="gradient-text">{t('awards.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('awards.subtitle')}
                </p>

                <motion.div
                    ref={ref}
                    className="awards-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {awards.map((award) => (
                        <motion.div key={award.title} className="award-card" variants={cardAnim}>
                            <div className="award-icon">{award.icon}</div>
                            <h3 className="award-title">{award.title}</h3>
                            <p className="award-event">{award.event}</p>
                            <p className="award-year">{award.year}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
