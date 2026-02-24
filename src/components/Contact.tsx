'use client';

import SectionWrapper from './SectionWrapper';
import { FiMail, FiPhone, FiGithub, FiMapPin, FiSend } from 'react-icons/fi';

export default function Contact() {
    return (
        <SectionWrapper id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">
                    Get in <span className="gradient-text">Touch</span>
                </h2>
                <p className="section-subtitle">
                    Have a project in mind or want to collaborate? Let&apos;s connect!
                </p>

                <div className="contact-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '500px' }}>
                    <div className="contact-info">
                        <a href="mailto:dceriythrrmkic@gmail.com" className="contact-info-item">
                            <div className="contact-icon">
                                <FiMail />
                            </div>
                            <div>
                                <p className="contact-label">Email</p>
                                <p className="contact-value">dceriythrrmkic@gmail.com</p>
                            </div>
                        </a>

                        <a href="tel:+66645536245" className="contact-info-item">
                            <div className="contact-icon">
                                <FiPhone />
                            </div>
                            <div>
                                <p className="contact-label">Phone</p>
                                <p className="contact-value">064-553-6245</p>
                            </div>
                        </a>

                        <a href="https://github.com/oattao123" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                            <div className="contact-icon">
                                <FiGithub />
                            </div>
                            <div>
                                <p className="contact-label">GitHub</p>
                                <p className="contact-value">github.com/oattao123</p>
                            </div>
                        </a>

                        <div className="contact-info-item">
                            <div className="contact-icon">
                                <FiMapPin />
                            </div>
                            <div>
                                <p className="contact-label">Location</p>
                                <p className="contact-value">Phutthabucha 48, Bang Mot, Thung Khru, Bangkok 10140</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
