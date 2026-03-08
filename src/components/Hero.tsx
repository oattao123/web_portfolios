'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <ParticleBackground />
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <span className="hero-badge-dot" />
                    Open to work
                </motion.div>

                <motion.h1
                    className="hero-name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Hi, I&apos;m <span className="gradient-text">Dollatham</span>
                </motion.h1>

                <motion.p
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    AI Engineer & Full-Stack Developer
                </motion.p>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    Passionate about building intelligent systems with Machine Learning,
                    Deep Learning, and Computer Vision — from model development to production deployment.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <a href="#projects" className="btn-primary">
                        View Projects <FiArrowRight />
                    </a>
                    <a href="#contact" className="btn-secondary">
                        Get in Touch
                    </a>
                    <a href="/Dollatham_CV.pdf" download className="btn-secondary">
                        <FiDownload /> CV
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <span>Scroll</span>
                <div className="scroll-line" />
            </motion.div>
        </section>
    );
}
