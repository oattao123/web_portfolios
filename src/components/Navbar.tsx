'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FiGlobe } from 'react-icons/fi';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { t, toggleLanguage, language } = useLanguage();

    const navLinks = [
        { label: t('nav.about'), href: '#about' },
        { label: t('nav.skills'), href: '#skills' },
        { label: t('nav.experience'), href: '#experience' },
        { label: t('nav.positions'), href: '#positions' },
        { label: t('nav.projects'), href: '#projects' },
        { label: t('nav.education'), href: '#education' },
        { label: t('nav.awards'), href: '#awards' },
        { label: t('nav.contact'), href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    <a href="#" className="navbar-logo">
                        D.C
                    </a>
                    <ul className="navbar-links">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="lang-toggle"
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                        title={language === 'en' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}
                    >
                        <FiGlobe />
                        <span>{t('lang.switch')}</span>
                    </button>
                    <button
                        className={`hamburger ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>
            <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <button
                    className="lang-toggle mobile-lang-toggle"
                    onClick={toggleLanguage}
                    aria-label="Toggle language"
                >
                    <FiGlobe />
                    <span>{t('lang.switch')}</span>
                </button>
                {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={handleLinkClick}>
                        {link.label}
                    </a>
                ))}
            </div>
        </>
    );
}
