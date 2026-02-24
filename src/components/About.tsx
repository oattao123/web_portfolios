import SectionWrapper from './SectionWrapper';
import Image from 'next/image';
import { FiMapPin, FiMail, FiGithub } from 'react-icons/fi';

export default function About() {
    return (
        <SectionWrapper id="about" className="about">
            <div className="container">
                <h2 className="section-title">
                    About <span className="gradient-text">Me</span>
                </h2>
                <p className="section-subtitle">
                    A dedicated AI Engineer with a passion for solving real-world problems
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
                                <div className="about-stat-number">4+</div>
                                <div className="about-stat-label">Projects</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">9+</div>
                                <div className="about-stat-label">Languages</div>
                            </div>
                            <div className="about-stat">
                                <div className="about-stat-number">3</div>
                                <div className="about-stat-label">Awards</div>
                            </div>
                        </div>
                    </div>

                    <div className="about-text">
                        <p>
                            I&apos;m <strong>Dollatham Charoenthammakit</strong>, a Computer Science student
                            at King Mongkut&apos;s University of Technology Thonburi (KMUTT) with a strong
                            focus on <strong>Artificial Intelligence</strong>, <strong>Machine Learning</strong>,
                            and <strong>Full-Stack Development</strong>.
                        </p>
                        <p>
                            My journey spans from developing AI-powered eye disease detection systems using
                            YOLOv11 and Transformers, to building trading bots with Hidden Markov Models,
                            and transforming satellite imagery using GANs. I love bridging the gap between
                            cutting-edge AI research and practical applications.
                        </p>
                        <p>
                            With experience in both frontend and backend development, I bring a complete
                            perspective to every project — from data engineering and model training to
                            deploying production-ready applications.
                        </p>

                        <div className="about-info">
                            <div className="about-info-item">
                                <FiMapPin />
                                <span>Bangkok, Thailand</span>
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
