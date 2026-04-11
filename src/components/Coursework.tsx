'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Coursework() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { t } = useLanguage();

    const courseCategories = [
        {
            categoryKey: 'cw.cat.ai',
            icon: '🤖',
            color: 'rgba(124, 58, 237, 0.15)',
            borderColor: 'rgba(124, 58, 237, 0.3)',
            courses: [
                'Artificial Intelligence and Machine Learning',
                'Natural Language Processing and Generation',
                'Computational Intelligence',
                'Data Science and Data Engineering',
                'Big Data Analytics',
            ],
        },
        {
            categoryKey: 'cw.cat.software',
            icon: '💻',
            color: 'rgba(6, 182, 212, 0.15)',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            courses: [
                'Computer Programming',
                'Object-Oriented Programming',
                'Web Programming ',
                'Software Engineering ',
            ],
        },
        {
            categoryKey: 'cw.cat.systems',
            icon: '🔧',
            color: 'rgba(236, 72, 153, 0.15)',
            borderColor: 'rgba(236, 72, 153, 0.3)',
            courses: [
                'Operating Systems',
                'Computer Architecture and Organization',
                'Network Computing',
                'Blockchain Technology',
            ],
        },
        {
            categoryKey: 'cw.cat.math',
            icon: '📐',
            color: 'rgba(16, 185, 129, 0.15)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            courses: [
                'Discrete Mathematics',
                'Linear Algebra for Computing',
                'Probability and Statistics',
                'Data Structures and Algorithms',
                'Database Systems',
            ],
        },
    ];

    return (
        <SectionWrapper id="coursework">
            <div className="container">
                <h2 className="section-title">
                    {t('cw.title1')} <span className="gradient-text">{t('cw.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('cw.subtitle')}
                </p>

                <motion.div
                    ref={ref}
                    className="coursework-grid"
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {courseCategories.map((cat) => (
                        <motion.div key={cat.categoryKey} className="coursework-card" variants={cardAnim}>
                            <div className="coursework-card-header">
                                <span className="coursework-icon">{cat.icon}</span>
                                <h3 className="coursework-category">{t(cat.categoryKey)}</h3>
                            </div>
                            <ul className="coursework-list">
                                {cat.courses.map((course) => (
                                    <li
                                        key={course}
                                        className="coursework-item"
                                        style={{
                                            background: cat.color,
                                            borderColor: cat.borderColor,
                                        }}
                                    >
                                        {course}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
