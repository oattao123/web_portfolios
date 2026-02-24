'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'สวัสดีครับ! 👋 ผมเป็น AI Assistant ของ Dollatham ยินดีตอบคำถามเกี่ยวกับประสบการณ์ ทักษะ โปรเจกต์ และข้อมูลอื่นๆ ครับ',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        const allMessages = [...messages, userMessage];
        setMessages(allMessages);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || `Error ${res.status}`);
            }

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            const assistantId = (Date.now() + 1).toString();
            setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

            let fullContent = '';
            if (reader) {
                let done = false;
                while (!done) {
                    const { value, done: readerDone } = await reader.read();
                    done = readerDone;
                    if (value) {
                        const chunk = decoder.decode(value, { stream: true });
                        fullContent += chunk;
                        setMessages((prev) =>
                            prev.map((m) =>
                                m.id === assistantId ? { ...m, content: m.content + chunk } : m
                            )
                        );
                    }
                }
            }

            // If stream completed but no content was received, show error
            if (!fullContent.trim()) {
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === assistantId
                            ? { ...m, content: 'ขออภัยครับ ไม่ได้รับการตอบกลับจาก AI กรุณาลองใหม่อีกครั้ง 🙏' }
                            : m
                    )
                );
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : '';
            const isQuota = errorMsg.includes('quota') || errorMsg.includes('429');
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 2).toString(),
                    role: 'assistant',
                    content: isQuota
                        ? 'ขออภัยครับ ขณะนี้ระบบ AI ถูกใช้งานเกินจำนวนครั้งที่กำหนด กรุณาลองใหม่ในอีก 1-2 นาที 🙏'
                        : 'ขอโทษครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง 🙏',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.button
                className="chat-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Chat with AI"
            >
                {isOpen ? '✕' : (
                    <span className="chat-fab-label">AI</span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="chat-header-avatar">AI</div>
                                <div>
                                    <span className="chat-header-title">Dollatham AI</span>
                                    <span className="chat-header-subtitle">Powered by Typhoon LLM</span>
                                </div>
                            </div>
                            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`chat-msg ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-ai'}`}
                                >
                                    <div className="chat-msg-bubble">
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chat-msg chat-msg-ai">
                                    <div className="chat-msg-bubble chat-typing">
                                        <span /><span /><span />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chat-input-form" onSubmit={handleSubmit}>
                            <input
                                className="chat-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="ถามอะไรก็ได้เกี่ยวกับ Dollatham..."
                                disabled={isLoading}
                            />
                            <button className="chat-send" type="submit" disabled={isLoading || !input.trim()}>
                                ➤
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
