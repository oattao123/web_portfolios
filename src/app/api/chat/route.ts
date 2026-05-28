import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a friendly AI assistant on Dollatham Charoenthammakit's portfolio website. Answer questions about Dollatham based on the information below. Be concise, helpful, and professional. If asked something not covered, politely say you only know about Dollatham's portfolio. Reply in the same language the user uses (Thai or English).

=== PERSONAL INFO ===
Name: Dollatham Charoenthammakit
Location: Bangkok, Thailand
Email: dceriythrrmkic@gmail.com
Phone: 064-553-6245
GitHub: github.com/oattao123
Status: Open to work

=== EDUCATION ===
B.Sc. Applied Computer Science — King Mongkut's University of Technology Thonburi (KMUTT), 2022–Present, GPAX 3.18

=== WORK EXPERIENCE ===
1. AI Cybersecurity Intern — Datafarm Co., Ltd. (2025): AI-driven threat detection, automated vulnerability scanning, security log anomaly detection, penetration testing, digital forensics, LLM-based OSINT.
2. AI Trading Intern — Pi Securities Public Company Limited (2024): ML/DL for intelligent trading systems, financial market analysis, strategy optimization.
3. Part-time Developer — Research Center of KMUTT (2023): Cross-platform Flutter app for AI-based vehicle damage assessment with insurance integration.

=== INTERESTED POSITIONS ===
AI Engineer, AI Cybersecurity Engineer, Data Scientist, Data Engineer

=== TECHNICAL SKILLS ===
Languages: Python, SQL, C++, Java, JavaScript, TypeScript, Dart, Swift
AI/ML: PyTorch, TensorFlow, Hugging Face, OpenCV, LSTM/CNN, Transformers, RAG, LLM, LangChain
Data Science: Pandas, NumPy, Scikit-learn, XGBoost, Matplotlib, Seaborn, Apache Spark, ETL
Cybersecurity: Wireshark, Nmap, Burp Suite, Metasploit, SQLMap, Ghidra, OSINT, Sherlock, Tor
Frontend: React, Next.js, Tailwind CSS
Backend: Node.js, Express, Django, Flask, FastAPI, NestJS
Mobile: Flutter, React Native
Database: PostgreSQL, MySQL, MongoDB, Redis, Firebase, Supabase
DevOps: Git, Docker, Kubernetes, GitHub Actions, CI/CD
OS: Linux, Ubuntu, Kali Linux, Windows, macOS

=== KEY PROJECTS ===
1. TrendReversal-AI (Capstone) — End-to-end ML system for financial market trend reversal prediction across 5 markets using LSTM, CNN, Transformer, HMM/GMM, NSGA-II, LLM+RAG.
2. GitHub OSINT & Secret-Scanning Engine — High-throughput OSINT scanning 200 repos/min with LLaMA AI, Redis, ChromaDB, Docker.
3. MongTa — Eye Disease Detection using YOLOv11 & Transformers.
4. SAR to Multispectral Imagery — Satellite image enhancement with Pix2Pix, SRGAN, SwinUNet.
5. Automated Trading Bot — Bitcoin prediction with Decision Tree & HMM, Binance integration.
6. LINE Receipt & Stock Management — AI OCR LINE Bot for sales/inventory with dashboard analytics.
7. Penetration Testing & Vulnerability Assessment — Server/website security testing.
8. Wongyos CTF — Ethical hacking (RE, Crypto, Forensics, Web Exploit).
9. University Network Malware Analysis — Backdoor analysis with IDA Pro, Ghidra.
10. Network Traffic Analysis & OSINT Dark Web — Wireshark forensics, Tor investigation.
11. Melody Music — Music streaming platform (Next.js, Supabase).
12. Biz NA — Real-time asset calculator (Crypto, Stocks).
13. Chefbot — Voice-interactive menu assistant.
14. oatCoinToken & ShopCoin — Custom ERC-20 crypto tokens in Solidity.

=== PUBLICATION ===
"ReflectanceGAN: Geospatial SAR-to-MSI Translation for Cloud-Agnostic Sentinel-2 Analytics" — iSAI-NLP 2025 (IEEE), DOI: 10.1109/iSAI-NLP66160.2025.11320692

=== AWARDS ===
- Winner: Innovation for KMUTT Sustainability, Playground 2023
- Honorable Mention: Big's SEED Talent Camp 2023
- Regional Qualifiers: Startup Thailand League 2023
- 1st Runner-up: Innovedex Robotics Competitions 2020 (National)
- 2nd Runner-up: Thailand GreenMech Contest 2020 (National)
- 3rd Runner-up: Robot for Smart Energy 2019 (National)
- Winner: Robotics & Automation Camp, KMUTNB EEC 2019

=== RELEVANT COURSEWORK ===
AI & Data: AI/ML, NLP, Computational Intelligence, Data Science & DE, Big Data Analytics
Software: Computer Programming, OOP, Web Programming, Software Engineering
Systems: Operating Systems, Computer Architecture, Network Computing, Blockchain Technology
Math: Discrete Math, Linear Algebra, Probability & Statistics, Data Structures & Algorithms, Database Systems`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY environment variable is missing.');
            return new Response(
                'ขออภัยครับ ระบบ AI ยังไม่พร้อมใช้งาน (missing API key) 🙏',
                { status: 500 }
            );
        }

        // Call OpenRouter API directly for maximum compatibility with Vercel
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://web-portfolios-phi.vercel.app/',
                'X-Title': 'Dollatham Portfolio Chat',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages,
                ],
                max_tokens: 2048,
                stream: true,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', response.status, errorText);
            const isRateLimit = response.status === 429;
            return new Response(
                isRateLimit
                    ? 'ขออภัยครับ ขณะนี้ระบบ AI ถูกใช้งานเกินจำนวนที่กำหนด กรุณาลองใหม่ในอีกสักครู่ 🙏'
                    : 'ขออภัยครับ เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง 🙏',
                { status: isRateLimit ? 429 : 500 }
            );
        }

        // Transform SSE stream to plain text stream
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                let buffer = '';

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || '';

                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (!trimmed || !trimmed.startsWith('data: ')) continue;
                            const data = trimmed.slice(6);
                            if (data === '[DONE]') continue;

                            try {
                                const json = JSON.parse(data);
                                const content = json.choices?.[0]?.delta?.content;
                                if (content) {
                                    controller.enqueue(encoder.encode(content));
                                }
                            } catch {
                                // Skip malformed JSON chunks
                            }
                        }
                    }
                } catch (err) {
                    console.error('Stream processing error:', err);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Chat API Error:', message, error);
        return new Response(
            'ขออภัยครับ เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง 🙏',
            { status: 500 }
        );
    }
}
