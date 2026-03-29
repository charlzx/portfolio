"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Github, Mail, Send } from "lucide-react";
import XLogo from "@/components/icons/XLogo";

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => setStatus('idle'), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const FORMSPREE_ID = 'mandvdpe';
  const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="px-4 py-14 md:px-12 md:py-18 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
            Have a project in mind? Let&apos;s talk.
          </h2>
        </AnimatedSection>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <div className="flex h-full flex-col gap-6 border border-border bg-card p-5 md:p-6">
              <div>
                <p className="text-[12px] leading-6 text-muted-foreground">
                  I&apos;m available for redesigns, frontend builds, and product UI work. Send a quick brief and I&apos;ll get back within two days.
                </p>
              </div>

              <div className="space-y-2">
                <motion.a
                  href="https://github.com/charlzx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-border bg-secondary p-3 transition-colors hover:bg-background"
                  whileHover={{ x: 3 }}
                >
                  <Github className="text-foreground" size={16} />
                  <div>
                    <p className="text-[11px] font-medium text-foreground transition-colors group-hover:underline">
                      @charlzx
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Code and product work
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://x.com/charlzObuzor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-border bg-secondary p-3 transition-colors hover:bg-background"
                  whileHover={{ x: 3 }}
                >
                  <XLogo size={16} className="text-foreground" />
                  <div>
                    <p className="text-[11px] font-medium text-foreground transition-colors group-hover:underline">
                      @charlzObuzor
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Updates and thoughts
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:charlesobuzor@outlook.com"
                  className="group flex items-center gap-3 border border-border bg-secondary p-3 transition-colors hover:bg-background"
                  whileHover={{ x: 3 }}
                >
                  <Mail className="text-foreground" size={16} />
                  <div>
                    <p className="text-[11px] font-medium text-foreground transition-colors group-hover:underline">
                      charlesobuzor@outlook.com
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Email contact
                    </p>
                  </div>
                </motion.a>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  Response time: 24-48 hours
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4 border border-border bg-card p-5 md:p-6">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border bg-secondary px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    required
                    data-cursorvariant="hover"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border bg-secondary px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    required
                    data-cursorvariant="hover"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none border border-border bg-secondary px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    required
                    data-cursorvariant="hover"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  data-cursorvariant="hover"
                >
                  <Send size={13} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-[11px] text-foreground">
                    Message sent successfully.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-[11px] text-foreground">
                    There was an error sending your message. Try again.
                  </p>
                )}
              </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
