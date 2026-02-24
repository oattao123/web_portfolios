'use client';

import SectionWrapper from './SectionWrapper';

export default function Experience() {
    return (
        <SectionWrapper id="experience" className="experience">
            <div className="container">
                <h2 className="section-title">
                    Work <span className="gradient-text">Experience</span>
                </h2>
                <p className="section-subtitle">
                    Professional experience in development and AI research
                </p>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-date">2025</div>
                        <div className="timeline-card">
                            <h3 className="timeline-title">AI Cybersecurity Intern</h3>
                            <p className="timeline-company">Datafarm Co., Ltd.</p>
                            <p className="timeline-description">
                                Gained hands-on experience applying AI and machine learning to cybersecurity operations. Developed AI-driven threat detection pipelines, automated vulnerability scanning with intelligent triage, and built models for security log anomaly detection. Participated in penetration testing, digital forensics, and leveraged LLM-based tools for accelerated OSINT and incident response.
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
                            <h3 className="timeline-title">AI Trading Intern</h3>
                            <p className="timeline-company">Pi Securities Public Company Limited</p>
                            <p className="timeline-description">
                                Incoming internship role focused on Artificial Intelligence for Trading. Will be
                                applying machine learning, deep learning, and data science techniques to develop
                                intelligent trading systems, analyze financial market data, and optimize trading strategies.
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
                            <h3 className="timeline-title">Part-time Developer</h3>
                            <p className="timeline-company">Research Center of KMUTT</p>
                            <p className="timeline-description">
                                Worked on a research project on vehicle accidents that utilizes AI technology
                                to calculate and assess vehicle damage. The obtained data is sent to insurance
                                companies for cost estimation and the claims process. I was responsible for
                                developing the cross-platform application using Flutter for both iOS and Android,
                                ensuring seamless integration with the AI processing system.
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
