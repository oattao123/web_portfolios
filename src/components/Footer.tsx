'use client';

import { FiGithub, FiMail } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    {t('footer.copyright')}
                </p>
                <div className="footer-social">
                    <a
                        href="https://github.com/oattao123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-link"
                        aria-label="GitHub"
                    >
                        <FiGithub />
                    </a>
                    <a
                        href="mailto:dceriythrrmkic@gmail.com"
                        className="footer-social-link"
                        aria-label="Email"
                    >
                        <FiMail />
                    </a>
                </div>
            </div>
        </footer>
    );
}
