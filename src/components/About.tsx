'use client';

import SectionWrapper from './SectionWrapper';
import Image from 'next/image';
import { FiMapPin, FiMail, FiGithub } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { t, language } = useLanguage();

    return (
        <SectionWrapper id="about" className="about">
            <div className="container">
                <h2 className="section-title">
                    {t('about.title1')} <span className="gradient-text">{t('about.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('about.subtitle')}
                </p>

                <div className="about-grid">
                    <div className="about-image-wrapper">
                        <div className="about-image-container">
                            <Image
                                src="/images/image.png"
                                alt="Dollatham Charoenthammakit"
                                fill
                                className="about-profile-img"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                        </div>
                        <div className="about-stats">
                            <div className="about-stat">
                                <div className="about-stat-number">15+</div>
                                <div className="about-stat-label">{t('about.stat.projects')}</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">10+</div>
                                <div className="about-stat-label">{t('about.stat.languages')}</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">7</div>
                                <div className="about-stat-label">{t('about.stat.awards')}</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">78</div>
                                <div className="about-stat-label">{t('about.stat.repos')}</div>
                            </div>
                        </div>
                    </div>

                    <div className="about-text">
                        <p dangerouslySetInnerHTML={{ __html: t('about.bio1') }} />
                        <p>{t('about.bio2')}</p>
                        <p>{t('about.bio3')}</p>

                        <div className="about-info">
                            <div className="about-info-item">
                                <FiMapPin />
                                <span>{language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand'}</span>
                            </div>
                            <div className="about-info-item">
                                <FiMail />
                                <span>dceriythrrmkic@gmail.com</span>
                            </div>
                            <div className="about-info-item">
                                <FiGithub />
                                <a href="https://github.com/oattao123" target="_blank" rel="noopener noreferrer">
                                    github.com/oattao123
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
