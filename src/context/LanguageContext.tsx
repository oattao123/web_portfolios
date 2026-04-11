'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// ============================================
//  Translation Dictionary
// ============================================
const translations: Record<string, Record<Language, string>> = {
    // --- Navbar ---
    'nav.about': { en: 'About', th: 'เกี่ยวกับ' },
    'nav.skills': { en: 'Skills', th: 'ทักษะ' },
    'nav.experience': { en: 'Experience', th: 'ประสบการณ์' },
    'nav.positions': { en: 'Positions', th: 'ตำแหน่ง' },
    'nav.projects': { en: 'Projects', th: 'โปรเจกต์' },
    'nav.education': { en: 'Education', th: 'การศึกษา' },
    'nav.awards': { en: 'Awards', th: 'รางวัล' },
    'nav.contact': { en: 'Contact', th: 'ติดต่อ' },

    // --- Hero ---
    'hero.badge': { en: 'Open to work', th: 'พร้อมทำงาน' },
    'hero.greeting': { en: "Hi, I'm", th: 'สวัสดี, ผม' },
    'hero.title': { en: 'AI Engineer & Full-Stack Developer', th: 'วิศวกร AI & นักพัฒนา Full-Stack' },
    'hero.description': {
        en: 'Passionate about building intelligent systems with Machine Learning, Deep Learning, and Computer Vision — from model development to production deployment.',
        th: 'มีความหลงใหลในการสร้างระบบอัจฉริยะด้วย Machine Learning, Deep Learning และ Computer Vision — ตั้งแต่การพัฒนาโมเดลจนถึงการ Deploy ระบบจริง',
    },
    'hero.viewProjects': { en: 'View Projects', th: 'ดูโปรเจกต์' },
    'hero.getInTouch': { en: 'Get in Touch', th: 'ติดต่อ' },
    'hero.scroll': { en: 'Scroll', th: 'เลื่อนลง' },

    // --- About ---
    'about.title1': { en: 'About', th: 'เกี่ยวกับ' },
    'about.title2': { en: 'Me', th: 'ตัวผม' },
    'about.subtitle': {
        en: 'A dedicated AI Engineer with a passion for solving real-world problems',
        th: 'วิศวกร AI ผู้มุ่งมั่นในการแก้ปัญหาในโลกจริง',
    },
    'about.stat.projects': { en: 'Projects', th: 'โปรเจกต์' },
    'about.stat.languages': { en: 'Languages', th: 'ภาษา' },
    'about.stat.awards': { en: 'Awards', th: 'รางวัล' },
    'about.stat.repos': { en: 'GitHub Repos', th: 'GitHub Repos' },
    'about.bio1': {
        en: "I'm <strong>Dollatham Charoenthammakit</strong>, a Computer Science student at King Mongkut's University of Technology Thonburi (KMUTT) with a strong focus on <strong>Artificial Intelligence</strong>, <strong>Machine Learning</strong>, and <strong>Full-Stack Development</strong>.",
        th: 'ผมชื่อ <strong>ดลธรรม เจริญธรรมกิจ</strong> นักศึกษาวิทยาการคอมพิวเตอร์ประยุกต์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ.) เชี่ยวชาญด้าน <strong>ปัญญาประดิษฐ์</strong>, <strong>Machine Learning</strong> และ <strong>การพัฒนา Full-Stack</strong>',
    },
    'about.bio2': {
        en: 'My journey spans from developing AI-powered eye disease detection systems using YOLOv11 and Transformers, to building trading bots with Hidden Markov Models, and transforming satellite imagery using GANs. I love bridging the gap between cutting-edge AI research and practical applications.',
        th: 'เส้นทางของผมครอบคลุมตั้งแต่การพัฒนาระบบตรวจจับโรคตาด้วย AI โดยใช้ YOLOv11 และ Transformers, สร้าง Trading Bot ด้วย Hidden Markov Models ไปจนถึงการแปลงภาพถ่ายดาวเทียมด้วย GANs ผมชอบเชื่อมโยงระหว่างงานวิจัย AI ล้ำสมัยกับการประยุกต์ใช้จริง',
    },
    'about.bio3': {
        en: 'With experience in both frontend and backend development, I bring a complete perspective to every project — from data engineering and model training to deploying production-ready applications.',
        th: 'ด้วยประสบการณ์ทั้ง Frontend และ Backend ผมมีมุมมองที่ครบถ้วนในทุกโปรเจกต์ — ตั้งแต่ Data Engineering และการเทรนโมเดล ไปจนถึงการ Deploy แอปพลิเคชันจริง',
    },

    // --- Skills ---
    'skills.title1': { en: 'Technical', th: 'ทักษะ' },
    'skills.title2': { en: 'Skills', th: 'ด้านเทคนิค' },
    'skills.subtitle': {
        en: 'Technologies and tools I work with to build intelligent, scalable solutions',
        th: 'เทคโนโลยีและเครื่องมือที่ผมใช้สร้างโซลูชันอัจฉริยะ',
    },
    'skills.cat.programming': { en: 'Programming Languages', th: 'ภาษาโปรแกรม' },
    'skills.cat.frontend': { en: 'Frontend Development', th: 'พัฒนา Frontend' },
    'skills.cat.backend': { en: 'Backend Development', th: 'พัฒนา Backend' },
    'skills.cat.mobile': { en: 'Mobile Development', th: 'พัฒนา Mobile' },
    'skills.cat.database': { en: 'Database Technologies', th: 'เทคโนโลยีฐานข้อมูล' },
    'skills.cat.ai': { en: 'AI / Machine Learning', th: 'AI / Machine Learning' },
    'skills.cat.datascience': { en: 'Data Science & Engineering', th: 'Data Science & Engineering' },
    'skills.cat.devops': { en: 'DevOps & Tools', th: 'DevOps & เครื่องมือ' },
    'skills.cat.os': { en: 'Operating Systems', th: 'ระบบปฏิบัติการ' },
    'skills.cat.cybersecurity': { en: 'Cybersecurity & Pentest', th: 'ความมั่นคงปลอดภัยไซเบอร์' },

    // --- Experience ---
    'exp.title1': { en: 'Work', th: 'ประสบการณ์' },
    'exp.title2': { en: 'Experience', th: 'การทำงาน' },
    'exp.subtitle': {
        en: 'Professional experience in development and AI research',
        th: 'ประสบการณ์การทำงานด้านการพัฒนาและวิจัย AI',
    },
    'exp.job1.title': { en: 'AI Cybersecurity Intern', th: 'นักศึกษาฝึกงาน AI Cybersecurity' },
    'exp.job1.company': { en: 'Datafarm Co., Ltd.', th: 'บริษัท Datafarm จำกัด' },
    'exp.job1.desc': {
        en: 'Gained hands-on experience applying AI and machine learning to cybersecurity operations. Developed AI-driven threat detection pipelines, automated vulnerability scanning with intelligent triage, and built models for security log anomaly detection. Participated in penetration testing, digital forensics, and leveraged LLM-based tools for accelerated OSINT and incident response.',
        th: 'ได้รับประสบการณ์จริงในการนำ AI และ Machine Learning มาประยุกต์ใช้กับงาน Cybersecurity พัฒนา Pipeline ตรวจจับภัยคุกคามด้วย AI, ระบบสแกนช่องโหว่อัตโนมัติ และสร้างโมเดลตรวจจับความผิดปกติใน Security Log มีส่วนร่วมในการทดสอบเจาะระบบ, Digital Forensics และใช้เครื่องมือ LLM เพื่อเร่งงาน OSINT',
    },
    'exp.job2.title': { en: 'AI Trading Intern', th: 'นักศึกษาฝึกงาน AI Trading' },
    'exp.job2.company': { en: 'Pi Securities Public Company Limited', th: 'บริษัทหลักทรัพย์ พาย จำกัด (มหาชน)' },
    'exp.job2.desc': {
        en: 'Incoming internship role focused on Artificial Intelligence for Trading. Will be applying machine learning, deep learning, and data science techniques to develop intelligent trading systems, analyze financial market data, and optimize trading strategies.',
        th: 'ฝึกงานด้าน AI สำหรับการเทรด ประยุกต์ใช้ Machine Learning, Deep Learning และ Data Science เพื่อพัฒนาระบบเทรดอัจฉริยะ วิเคราะห์ข้อมูลตลาดการเงิน และปรับปรุงกลยุทธ์การเทรด',
    },
    'exp.job3.title': { en: 'Part-time Developer', th: 'นักพัฒนา Part-time' },
    'exp.job3.company': { en: 'Research Center of KMUTT', th: 'ศูนย์วิจัย มจธ.' },
    'exp.job3.desc': {
        en: "Worked on a research project on vehicle accidents that utilizes AI technology to calculate and assess vehicle damage. The obtained data is sent to insurance companies for cost estimation and the claims process. I was responsible for developing the cross-platform application using Flutter for both iOS and Android, ensuring seamless integration with the AI processing system.",
        th: 'ทำงานโปรเจกต์วิจัยเกี่ยวกับอุบัติเหตุรถยนต์ที่ใช้ AI ประเมินความเสียหาย ข้อมูลจะถูกส่งไปยังบริษัทประกันเพื่อประเมินค่าใช้จ่ายและกระบวนการเคลม ผมรับผิดชอบพัฒนาแอปพลิเคชัน Cross-platform ด้วย Flutter ทั้ง iOS และ Android',
    },

    // --- Positions ---
    'pos.title1': { en: 'Interested', th: 'ตำแหน่ง' },
    'pos.title2': { en: 'Positions', th: 'ที่สนใจ' },
    'pos.subtitle': {
        en: 'Career paths I am passionate about and actively pursuing',
        th: 'เส้นทางอาชีพที่ผมหลงใหลและมุ่งมั่นพัฒนา',
    },
    'pos.ai.title': { en: 'AI Engineer', th: 'วิศวกร AI' },
    'pos.ai.desc': {
        en: 'Building and deploying production-grade AI/ML systems — from deep learning models and LLM-powered agents to end-to-end inference pipelines.',
        th: 'สร้างและ Deploy ระบบ AI/ML ระดับ Production — ตั้งแต่ Deep Learning Models, LLM Agents ไปจนถึง Inference Pipelines',
    },
    'pos.cyber.title': { en: 'AI Cybersecurity Engineer', th: 'วิศวกร AI Cybersecurity' },
    'pos.cyber.desc': {
        en: 'Applying AI and machine learning to cybersecurity — threat detection, anomaly analysis, automated vulnerability assessment, and intelligent incident response.',
        th: 'ประยุกต์ใช้ AI และ Machine Learning กับงาน Cybersecurity — ตรวจจับภัยคุกคาม, วิเคราะห์ความผิดปกติ และตอบสนองเหตุการณ์อัตโนมัติ',
    },
    'pos.ds.title': { en: 'Data Scientist', th: 'นักวิทยาศาสตร์ข้อมูล' },
    'pos.ds.desc': {
        en: 'Transforming complex datasets into actionable insights through statistical modeling, feature engineering, and data-driven decision making.',
        th: 'แปลงข้อมูลซับซ้อนเป็น Insights ที่นำไปใช้ได้จริง ผ่าน Statistical Modeling, Feature Engineering และการตัดสินใจจากข้อมูล',
    },
    'pos.de.title': { en: 'Data Engineer', th: 'วิศวกรข้อมูล' },
    'pos.de.desc': {
        en: 'Designing and building scalable data pipelines, ETL workflows, and data infrastructure to support analytics and machine learning at scale.',
        th: 'ออกแบบและสร้าง Data Pipelines, ETL Workflows และโครงสร้างพื้นฐานข้อมูลที่ปรับขนาดได้เพื่อรองรับ Analytics และ Machine Learning',
    },

    // --- Projects ---
    'proj.title1': { en: 'Academic', th: 'โปรเจกต์' },
    'proj.title2': { en: 'Projects', th: 'ในการศึกษา' },
    'proj.subtitle': {
        en: 'AI, machine learning, and full-stack projects built during my studies',
        th: 'โปรเจกต์ AI, Machine Learning และ Full-Stack ที่สร้างระหว่างเรียน',
    },
    'proj.filter.all': { en: 'All', th: 'ทั้งหมด' },
    'proj.filter.ai': { en: 'AI', th: 'AI' },
    'proj.filter.cyber': { en: 'Cybersecurity', th: 'Cybersecurity' },
    'proj.filter.other': { en: 'Other', th: 'อื่นๆ' },

    // Project descriptions (Thai)
    'proj.osint.desc': {
        en: 'A high‑throughput OSINT engine scanning public GitHub repositories at 200 repos/min to automatically detect hard‑coded secrets. Features on‑premise LLaMA‑based AI classification, async networking, Redis caching, ChromaDB vector indexing, and real‑time metrics, delivering a production‑ready Docker solution.',
        th: 'เครื่องมือ OSINT ประสิทธิภาพสูง สแกน GitHub Repositories สาธารณะ 200 repos/นาที ตรวจจับ Secrets ที่ถูกเขียนฝังในโค้ดอัตโนมัติ มีระบบจำแนกด้วย AI LLaMA, Redis Caching, ChromaDB และ Real-time Metrics',
    },
    'proj.pentest.desc': {
        en: 'Conducted comprehensive penetration testing on servers and websites. Identified vulnerabilities and system weaknesses, and generated risk assessment reports following international standards. Employed various offensive security tools to ensure robust system defense.',
        th: 'ดำเนินการทดสอบเจาะระบบเซิร์ฟเวอร์และเว็บไซต์อย่างครอบคลุม ระบุช่องโหว่และจุดอ่อนของระบบ จัดทำรายงานประเมินความเสี่ยงตามมาตรฐานสากล',
    },
    'proj.ctf.desc': {
        en: 'Solved diverse cybersecurity challenges encompassing Reverse Engineering, Cryptography, Digital Forensics, Web Exploitation, System Exploitation, and Programming for Ethical Hacking. Utilized binary analysis, system structure decoupling, and custom Python exploit scripts.',
        th: 'แก้โจทย์ Cybersecurity หลากหลายรูปแบบ ครอบคลุม Reverse Engineering, Cryptography, Digital Forensics, Web Exploitation และ System Exploitation ใช้ Binary Analysis และเขียน Python Exploit Scripts',
    },
    'proj.malware.desc': {
        en: "Detected and analyzed backdoor malware embedded within the university's IT systems. Performed rigorous binary analysis using IDA Pro, Ghidra, and HxD to extract hardcoded credentials and uncover embedded unauthorized authentication mechanisms.",
        th: 'ตรวจจับและวิเคราะห์ Backdoor Malware ที่ฝังในระบบ IT ของมหาวิทยาลัย วิเคราะห์ Binary อย่างละเอียดด้วย IDA Pro, Ghidra และ HxD เพื่อดึง Credentials ที่ฝังอยู่',
    },
    'proj.forensics.desc': {
        en: 'Conducted network forensics by intercepting and analyzing internal traffic via Wireshark to identify suspect behaviors. Tracked subjects across social platforms and Tor Network (.onion domains) analyzing emails, transaction routes, and PII.',
        th: 'ดำเนินการ Network Forensics ดักจับและวิเคราะห์ทราฟฟิกภายในด้วย Wireshark ติดตามเป้าหมายผ่าน Social Platforms และ Tor Network วิเคราะห์อีเมล, เส้นทางธุรกรรม และข้อมูลส่วนบุคคล',
    },
    'proj.trendreversal.desc': {
        en: 'End-to-end machine learning system predicting financial market trend reversals across 5 global markets (US, UK, Thai, Gold, Bitcoin). Features deep learning models (LSTM, CNN, Transformer), regime-switching strategy via HMM/GMM, multi-objective parameter optimization (NSGA-II), hybrid LLM agent with RAG, and an interactive dashboard.',
        th: 'ระบบ Machine Learning แบบ End-to-end ทำนายจุดกลับตัวของตลาดการเงิน 5 ตลาดโลก (US, UK, Thai, ทอง, Bitcoin) ใช้ Deep Learning (LSTM, CNN, Transformer), กลยุทธ์ HMM/GMM, NSGA-II, LLM Agent พร้อม RAG',
    },
    'proj.mongta.desc': {
        en: 'An application that detects cataracts, styes, conjunctivitis, and pterygium, providing convenient services for users to contact doctors. I prepared data and uploaded it to Roboflow, performed data engineering and data science tasks, developed multiple models (YOLOv11, Transformers) to evaluate and compare performance, and set up a server for data transmission to the frontend.',
        th: 'แอปพลิเคชันตรวจจับโรคต้อกระจก, กุ้งยิง, เยื่อบุตาอักเสบ และต้อเนื้อ ผมเตรียมข้อมูลอัปโหลดขึ้น Roboflow, ทำ Data Engineering, พัฒนาโมเดลหลายตัว (YOLOv11, Transformers) เปรียบเทียบประสิทธิภาพ และตั้งเซิร์ฟเวอร์ส่งข้อมูลไป Frontend',
    },
    'proj.sar.desc': {
        en: 'Utilizes the Pix2Pix model to enhance satellite image resolution and convert black-and-white images to color. Performed comprehensive data engineering: preparation, cleaning, analysis, and feature extraction. Developed and compared models like SRGAN and SwinUNet, with hyperparameter tuning to find optimal values.',
        th: 'ใช้โมเดล Pix2Pix เพิ่มความชัดของภาพถ่ายดาวเทียมและแปลงภาพขาวดำเป็นสี ทำ Data Engineering ครบวงจร: เตรียมข้อมูล, ทำความสะอาด, วิเคราะห์ และ Feature Extraction พัฒนาเปรียบเทียบ SRGAN และ SwinUNet',
    },
    'proj.trading.desc': {
        en: 'Develops trading bots using machine learning to predict Bitcoin trends and execute real-time trades, integrated with Binance via a web application. Prepared data and indicators, used Decision Tree and Hidden Markov Model, selected features using Gini Index and Entropy, and calculated state transition probabilities with the Forward-Backward Algorithm.',
        th: 'พัฒนา Trading Bot ด้วย Machine Learning ทำนายเทรนด์ Bitcoin และเทรดแบบ Real-time เชื่อมต่อกับ Binance ผ่านเว็บแอป เตรียมข้อมูลและ Indicators, ใช้ Decision Tree และ HMM, คัดเลือก Features ด้วย Gini Index',
    },
    'proj.melody.desc': {
        en: 'A music streaming website for uploading and listening to songs online, accessible from laptops and mobile devices. Worked as a Fullstack Developer using Tailwind CSS for frontend, TypeScript for backend, deployed with Vercel, and used Supabase for data storage (images, songs, content).',
        th: 'เว็บไซต์สตรีมเพลงสำหรับอัปโหลดและฟังเพลงออนไลน์ ใช้งานได้ทั้งคอมและมือถือ ทำหน้าที่เป็น Fullstack Developer ใช้ Tailwind CSS, TypeScript, Deploy ด้วย Vercel และ Supabase',
    },
    'proj.bizna.desc': {
        en: 'A web application that calculates and tracks asset portfolios in real-time, supporting cryptocurrencies, stocks, cash, and other volatile assets. Features live price feeds, portfolio valuation, and dynamic asset allocation visualization.',
        th: 'เว็บแอปคำนวณและติดตามพอร์ตสินทรัพย์แบบ Real-time รองรับคริปโต, หุ้น, เงินสด และสินทรัพย์อื่นๆ มีระบบราคาสด, ประเมินมูลค่าพอร์ต และแสดงผลสัดส่วนสินทรัพย์',
    },
    'proj.chefbot.desc': {
        en: 'A voice-interactive program that provides personalized menu suggestions and calculates menu items. Users can create custom menus based on their preferences through natural voice commands, combining speech recognition with intelligent recommendation logic.',
        th: 'โปรแกรมสั่งการด้วยเสียงที่ให้คำแนะนำเมนูอาหารส่วนตัว ผู้ใช้สร้างเมนูตามความชอบผ่านคำสั่งเสียงธรรมชาติ ผสาน Speech Recognition กับระบบแนะนำอัจฉริยะ',
    },
    'proj.oatcoin.desc': {
        en: 'Designed and deployed two custom cryptocurrency tokens (oatCoinToken and ShopCoin) using Solidity smart contracts on Remix IDE. Implemented standard ERC-20 token functionality including minting, transfers, and balance management. Features QR Code integration for easy token addition to wallets.',
        th: 'ออกแบบและ Deploy โทเคนคริปโตสองตัว (oatCoinToken และ ShopCoin) ด้วย Solidity Smart Contracts บน Remix IDE มีฟังก์ชัน ERC-20 ครบถ้วน รวมถึง QR Code สำหรับเพิ่มโทเคนเข้ากระเป๋า',
    },
    'proj.linereceipt.desc': {
        en: 'Intelligent LINE Bot for sales and inventory management with AI OCR for automatic bank slip reading. Features image classification (QR / slip / product), multi-sale conversation flow via state machine, QR code product scanning, real-time LINE push notifications, REST API, and a web dashboard with daily/monthly revenue analytics and top product insights.',
        th: 'LINE Bot อัจฉริยะสำหรับจัดการการขายและสต๊อกสินค้า มี AI OCR อ่านสลิปอัตโนมัติ จำแนกรูปภาพ (QR/สลิป/สินค้า), สแกน QR สินค้า, แจ้งเตือน LINE แบบ Real-time และ Dashboard วิเคราะห์รายได้',
    },
    'proj.nst.desc': {
        en: 'Deep learning project applying Neural Style Transfer (NST) techniques to generate artistic images by merging content and style representations. Utilizes convolutional neural networks to extract and recombine visual features, creating unique artistic renderings from photographs.',
        th: 'โปรเจกต์ Deep Learning ใช้เทคนิค Neural Style Transfer (NST) สร้างภาพศิลปะด้วยการผสมผสาน Content และ Style จากภาพต่างๆ ใช้ CNN ดึงและรวม Visual Features สร้างผลงานศิลปะจากภาพถ่าย',
    },
    'proj.portfolio.desc': {
        en: 'Mean-Variance portfolio optimization (Markowitz 1952) across 30 assets in 10 sectors with real-world constraints. Compares 3 optimizers: SLSQP, PSO Hybrid, and Differential Evolution Hybrid. Features sector weight limits, transaction costs, lot-size adjustments, short-sell analysis, and out-of-sample validation.',
        th: 'การจัดสรรพอร์ตโฟลิโอ Mean-Variance (Markowitz 1952) ข้าม 30 สินทรัพย์ 10 เซ็กเตอร์ เปรียบเทียบ 3 Optimizers: SLSQP, PSO Hybrid และ DE Hybrid มีข้อจำกัดน้ำหนักเซ็กเตอร์ ค่าธรรมเนียม lot-size และ Out-of-Sample Validation',
    },
    'proj.basketball.desc': {
        en: 'A React Native (Expo) mobile application for managing basketball game queues. Features team registration, automatic game rotation, live queue display, and a user-friendly Thai-language UI. Built with Expo SDK 54, React 19, and deployed on Vercel.',
        th: 'แอป React Native (Expo) สำหรับจัดการคิวเล่นบาสเกตบอล มีระบบเพิ่มทีม, หมุนเวียนเกมอัตโนมัติ, แสดงคิวแบบ Real-time และ UI ภาษาไทย สร้างด้วย Expo SDK 54, React 19 และ Deploy บน Vercel',
    },

    'proj.viewCode': { en: 'View Code', th: 'ดูโค้ด' },

    // --- Publications ---
    'pub.title': { en: 'Publications', th: 'ผลงานตีพิมพ์' },
    'pub.subtitle': {
        en: 'Peer-reviewed research published in international conferences',
        th: 'งานวิจัยที่ผ่านการ Peer-review ตีพิมพ์ในการประชุมระดับนานาชาติ',
    },
    'pub.viewPaper': { en: 'View Paper', th: 'ดูบทความ' },

    // --- Education ---
    'edu.title': { en: 'Education', th: 'การศึกษา' },
    'edu.subtitle': {
        en: 'Academic background and qualifications',
        th: 'ประวัติการศึกษาและคุณวุฒิ',
    },
    'edu.university': {
        en: "King Mongkut's University of Technology Thonburi",
        th: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
    },
    'edu.degree': {
        en: 'Bachelor of Science in Applied Computer Science',
        th: 'วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์ประยุกต์',
    },
    'edu.present': { en: '2022 — Present', th: '2565 — ปัจจุบัน' },

    // --- Coursework ---
    'cw.title1': { en: 'Relevant', th: 'วิชาเรียน' },
    'cw.title2': { en: 'Coursework', th: 'ที่เกี่ยวข้อง' },
    'cw.subtitle': {
        en: 'Key academic courses that built my technical foundation',
        th: 'วิชาเรียนสำคัญที่สร้างพื้นฐานเทคนิคของผม',
    },
    'cw.cat.ai': { en: 'AI & Data', th: 'AI & ข้อมูล' },
    'cw.cat.software': { en: 'Software & Web', th: 'ซอฟต์แวร์ & เว็บ' },
    'cw.cat.systems': { en: 'Systems & Networks', th: 'ระบบ & เครือข่าย' },
    'cw.cat.math': { en: 'Math & Foundations', th: 'คณิตศาสตร์ & พื้นฐาน' },

    // --- Awards ---
    'awards.title1': { en: 'Competitions &', th: 'การแข่งขัน &' },
    'awards.title2': { en: 'Prizes', th: 'รางวัล' },
    'awards.subtitle': {
        en: 'Achievements and recognitions from competitions',
        th: 'ความสำเร็จและการยอมรับจากการแข่งขัน',
    },

    // --- Contact ---
    'contact.title1': { en: 'Get in', th: 'ติดต่อ' },
    'contact.title2': { en: 'Touch', th: 'ผม' },
    'contact.subtitle': {
        en: "Have a project in mind or want to collaborate? Let's connect!",
        th: 'มีโปรเจกต์ในใจหรืออยากร่วมงานกัน? มาคุยกันเลย!',
    },
    'contact.email': { en: 'Email', th: 'อีเมล' },
    'contact.phone': { en: 'Phone', th: 'โทรศัพท์' },
    'contact.github': { en: 'GitHub', th: 'GitHub' },
    'contact.location': { en: 'Location', th: 'ที่อยู่' },
    'contact.address': {
        en: 'Phutthabucha 48, Bang Mot, Thung Khru, Bangkok 10140',
        th: 'พุทธบูชา 48 แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140',
    },

    // --- Footer ---
    'footer.copyright': {
        en: `© ${new Date().getFullYear()} Dollatham Charoenthammakit.`,
        th: `© ${new Date().getFullYear()} ดลธรรม เจริญธรรมกิจ`,
    },

    // --- Chat Widget ---
    'chat.welcome': {
        en: "Hi! 👋 I'm Dollatham's AI Assistant. Feel free to ask me about his experience, skills, projects, and more!",
        th: 'สวัสดีครับ! 👋 ผมเป็น AI Assistant ของ Dollatham ยินดีตอบคำถามเกี่ยวกับประสบการณ์ ทักษะ โปรเจกต์ และข้อมูลอื่นๆ ครับ',
    },
    'chat.placeholder': {
        en: 'Ask anything about Dollatham...',
        th: 'ถามอะไรก็ได้เกี่ยวกับ Dollatham...',
    },
    'chat.error.quota': {
        en: "Sorry, the AI system has exceeded its usage limit. Please try again in 1-2 minutes 🙏",
        th: 'ขออภัยครับ ขณะนี้ระบบ AI ถูกใช้งานเกินจำนวนครั้งที่กำหนด กรุณาลองใหม่ในอีก 1-2 นาที 🙏',
    },
    'chat.error.general': {
        en: 'Sorry, an error occurred. Please try again 🙏',
        th: 'ขอโทษครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง 🙏',
    },
    'chat.error.empty': {
        en: 'Sorry, no response was received from the AI. Please try again 🙏',
        th: 'ขออภัยครับ ไม่ได้รับการตอบกลับจาก AI กรุณาลองใหม่อีกครั้ง 🙏',
    },

    // --- Language Toggle ---
    'lang.switch': { en: 'TH', th: 'EN' },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = useCallback(() => {
        setLanguage((prev) => (prev === 'en' ? 'th' : 'en'));
    }, []);

    const t = useCallback(
        (key: string) => {
            const entry = translations[key];
            if (!entry) return key;
            return entry[language] || entry['en'] || key;
        },
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}
