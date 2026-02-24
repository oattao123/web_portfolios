'use client';

import SectionWrapper from './SectionWrapper';
import { FiMapPin, FiCalendar } from 'react-icons/fi';

export default function Education() {
    return (
        <SectionWrapper id="education" className="education">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">Education</span>
                </h2>
                <p className="section-subtitle">
                    Academic background and qualifications
                </p>

                <div className="education-card">
                    <div className="education-icon">🎓</div>
                    <h3 className="education-university">
                        King Mongkut&apos;s University of Technology Thonburi
                    </h3>
                    <p className="education-degree">
                        Bachelor of Science in Applied Computer Science
                    </p>
                    <div className="education-gpax">
                        GPAX: <span className="education-gpax-value">3.18</span>
                    </div>
                    <p className="education-location">
                        <FiMapPin /> Bangkok, Thailand
                    </p>
                    <p className="education-period">
                        <FiCalendar style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                        2022 — Present
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}
