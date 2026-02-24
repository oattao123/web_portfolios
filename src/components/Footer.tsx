'use client';

import { FiGithub, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    © {new Date().getFullYear()} Dollatham Charoenthammakit.
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
