'use client';

import SectionWrapper from './SectionWrapper';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function Education() {
    const { t, language } = useLanguage();

    return (
        <SectionWrapper id="education" className="education">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">{t('edu.title')}</span>
                </h2>
                <p className="section-subtitle">
                    {t('edu.subtitle')}
                </p>

                <div className="education-card">
                    <div className="education-icon">🎓</div>
                    <h3 className="education-university">
                        {t('edu.university')}
                    </h3>
                    <p className="education-degree">
                        {t('edu.degree')}
                    </p>
                    <div className="education-gpax">
                        GPAX: <span className="education-gpax-value">3.18</span>
                    </div>
                    <p className="education-location">
                        <FiMapPin /> {language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand'}
                    </p>
                    <p className="education-period">
                        <FiCalendar style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                        {t('edu.present')}
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
