'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from './SectionWrapper';
import { FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const publications = [
    {
        title: 'ReflectanceGAN: Geospatial SAR-to-MSI Translation for Cloud-Agnostic Sentinel-2 Analytics',
        conference: '2025 20th International Joint Symposium on Artificial Intelligence and Natural Language Processing (iSAI-NLP)',
        doi: '10.1109/iSAI-NLP66160.2025.11320692',
        link: 'https://www.researchgate.net/publication/399697892',
        date: 'November 2025',
        authors: [
            { name: 'Dollatham Charoenthammakit', highlight: true },
            { name: 'Thittaporn Ganokratanaa', highlight: false },
            { name: 'Mahasak Ketcham', highlight: false },
            { name: 'Pariwate Varnakovida', highlight: false },
        ],
    },
];

const cardAnim = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Publications() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { t } = useLanguage();

    return (
        <SectionWrapper id="publications" className="publications">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">{t('pub.title')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('pub.subtitle')}
                </p>

                <div ref={ref}>
                    {publications.map((pub) => (
                        <motion.div
                            key={pub.doi}
                            className="publication-card"
                            variants={cardAnim}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <div className="publication-type-badge">📄 Conference Paper · IEEE</div>
                            <h3 className="publication-title">{pub.title}</h3>
                            <p className="publication-conference">{pub.conference}</p>
                            <p className="publication-authors">
                                {pub.authors.map((a, i) => (
                                    <span key={a.name}>
                                        {a.highlight ? (
                                            <strong className="publication-author-highlight">{a.name}</strong>
                                        ) : (
                                            a.name
                                        )}
                                        {i < pub.authors.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </p>
                            <div className="publication-meta">
                                <span className="publication-date">{pub.date}</span>
                                <span className="publication-doi">DOI: {pub.doi}</span>
                            </div>
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary publication-link"
                            >
                                {t('pub.viewPaper')} <FiExternalLink />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
