'use client';

import SectionWrapper from './SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';

export default function Experience() {
    const { t } = useLanguage();

    return (
        <SectionWrapper id="experience" className="experience">
            <div className="container">
                <h2 className="section-title">
                    {t('exp.title1')} <span className="gradient-text">{t('exp.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('exp.subtitle')}
                </p>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-date">2025</div>
                        <div className="timeline-card">
                            <h3 className="timeline-title">{t('exp.job1.title')}</h3>
                            <p className="timeline-company">{t('exp.job1.company')}</p>
                            <p className="timeline-description">
                                {t('exp.job1.desc')}
                            </p>
                            <div className="timeline-tech">
                                <span className="timeline-tech-tag">AI Threat Detection</span>
                                <span className="timeline-tech-tag">ML Security Analytics</span>
                                <span className="timeline-tech-tag">Penetration Testing</span>
                                <span className="timeline-tech-tag">Digital Forensics</span>
                                <span className="timeline-tech-tag">LLM for Security</span>
                                <span className="timeline-tech-tag">OSINT</span>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-date">2024</div>
                        <div className="timeline-card">
                            <h3 className="timeline-title">{t('exp.job2.title')}</h3>
                            <p className="timeline-company">{t('exp.job2.company')}</p>
                            <p className="timeline-description">
                                {t('exp.job2.desc')}
                            </p>
                            <div className="timeline-tech">
                                <span className="timeline-tech-tag">AI Trading</span>
                                <span className="timeline-tech-tag">Machine Learning</span>
                                <span className="timeline-tech-tag">Financial Markets</span>
                                <span className="timeline-tech-tag">Quantitative Analysis</span>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-date">2023</div>
                        <div className="timeline-card">
                            <h3 className="timeline-title">{t('exp.job3.title')}</h3>
                            <p className="timeline-company">{t('exp.job3.company')}</p>
                            <p className="timeline-description">
                                {t('exp.job3.desc')}
                            </p>
                            <div className="timeline-tech">
                                <span className="timeline-tech-tag">Flutter</span>
                                <span className="timeline-tech-tag">Dart</span>
                                <span className="timeline-tech-tag">iOS</span>
                                <span className="timeline-tech-tag">Android</span>
                                <span className="timeline-tech-tag">AI Integration</span>
                                <span className="timeline-tech-tag">REST API</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
