'use client';

import SectionWrapper from './SectionWrapper';
import { FiMail, FiPhone, FiGithub, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();

    return (
        <SectionWrapper id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">
                    {t('contact.title1')} <span className="gradient-text">{t('contact.title2')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('contact.subtitle')}
                </p>

                <div className="contact-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '500px' }}>
                    <div className="contact-info">
                        <a href="mailto:dceriythrrmkic@gmail.com" className="contact-info-item">
                            <div className="contact-icon">
                                <FiMail />
                            </div>
                            <div>
                                <p className="contact-label">{t('contact.email')}</p>
                                <p className="contact-value">dceriythrrmkic@gmail.com</p>
                            </div>
                        </a>

                        <a href="tel:+66645536245" className="contact-info-item">
                            <div className="contact-icon">
                                <FiPhone />
                            </div>
                            <div>
                                <p className="contact-label">{t('contact.phone')}</p>
                                <p className="contact-value">064-553-6245</p>
                            </div>
                        </a>

                        <a href="https://github.com/oattao123" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                            <div className="contact-icon">
                                <FiGithub />
                            </div>
                            <div>
                                <p className="contact-label">{t('contact.github')}</p>
                                <p className="contact-value">github.com/oattao123</p>
                            </div>
                        </a>

                        <div className="contact-info-item">
                            <div className="contact-icon">
                                <FiMapPin />
                            </div>
                            <div>
                                <p className="contact-label">{t('contact.location')}</p>
                                <p className="contact-value">{t('contact.address')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
